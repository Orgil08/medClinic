import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Body parser with safe payload limit
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Anti-spam in-memory rate limiter (per IP)
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function checkRateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

// Memory store for appointments and feedback during runtime
interface StoredAppointment {
  id: string;
  bookingCode: string;
  fullName: string;
  phone: string;
  email?: string;
  branchId: string;
  serviceCategory: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
  submittedAt: string;
  status: 'pending' | 'confirmed';
}

const appointmentStore: StoredAppointment[] = [];
const feedbackStore: Array<{
  id: string;
  name: string;
  contact: string;
  message: string;
  source: string;
  submittedAt: string;
}> = [];

// Helper to configure Nodemailer transporter
function getMailTransporter() {
  const rawHost = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim().replace(/^["']|["']$/g, '');
  const pass = process.env.SMTP_PASS?.trim().replace(/^["']|["']$/g, '');

  let host = rawHost;
  // If host is placeholder like "aaaa" or not a valid domain with a dot, but user is Gmail, use smtp.gmail.com
  if (!host || host === 'aaaa' || !host.includes('.')) {
    if (user?.includes('@gmail.com')) {
      host = 'smtp.gmail.com';
    } else {
      host = undefined;
    }
  }

  const port = Number(process.env.SMTP_PORT) || (host === 'smtp.gmail.com' ? 465 : 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (host && user && pass) {
    return {
      transporter: nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
        connectionTimeout: 8000,
        greetingTimeout: 5000,
      }),
      isConfigured: true,
      host,
    };
  }

  // Graceful fallback logger for environments where SMTP is not yet configured
  return {
    transporter: nodemailer.createTransport({
      jsonTransport: true,
    }),
    isConfigured: false,
    host: 'jsonTransport',
  };
}

// -----------------------------------------------------------------------------
// 1. Health check endpoint
// -----------------------------------------------------------------------------
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'Solongo Eye Hospital API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// -----------------------------------------------------------------------------
// 2. Appointment Booking endpoint: POST /api/appointments
// -----------------------------------------------------------------------------
app.post('/api/appointments', async (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  // Rate limiting: max 15 appointment requests per 10 minutes per IP
  if (!checkRateLimit(`apt_${clientIp}`, 15, 10 * 60 * 1000)) {
    return res.status(429).json({
      error: 'Хэт олон хүсэлт илгээсэн байна. Та 10 минутын дараа дахин оролдоно уу.',
    });
  }

  const {
    fullName,
    phone,
    email,
    branchId,
    serviceCategory,
    preferredDate,
    preferredTimeSlot,
    notes,
  } = req.body;

  // Validation
  const cleanName = (fullName || '').toString().trim();
  if (!cleanName || cleanName.length < 2 || cleanName.length > 80) {
    return res.status(400).json({
      error: 'Өвчтөний нэрийг зөв оруулна уу (2-80 тэмдэгт).',
    });
  }

  const cleanPhone = (phone || '').toString().trim().replace(/[\s\-]/g, '');
  const digitsOnly = cleanPhone.replace(/[^\d]/g, '');
  const isValidPhone =
    (digitsOnly.length === 8 && /^[789]\d{7}$/.test(digitsOnly)) ||
    (digitsOnly.length === 11 && digitsOnly.startsWith('976') && /^[789]\d{7}$/.test(digitsOnly.slice(3))) ||
    (digitsOnly.length >= 6 && digitsOnly.length <= 15);

  if (!isValidPhone) {
    return res.status(400).json({
      error: 'Утасны дугаараа зөв оруулна уу (Жишээ нь: 77056699, 88112233).',
    });
  }

  const cleanEmail = (email || '').toString().trim();
  if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({
      error: 'Имэйл хаягийн формат буруу байна (жишээ: name@domain.com).',
    });
  }

  let cleanBranch = 'Төв эмнэлэг (Дүнжингарав, Санрайс хотхон)';
  if (branchId === 'ubh') {
    cleanBranch = 'UBH Center салбар (4 давхар, 415 тоот)';
  } else if (branchId === 'lasik') {
    cleanBranch = 'Солонго хараа заслын төв (MPM цогцолбор, 2-р давхар)';
  }

  const cleanCategory = (serviceCategory || 'Нүдний ерөнхий үзлэг, оношилгоо').toString().trim();

  // Validate date format and prevent past dates
  const cleanDate = (preferredDate || '').toString().trim();
  if (!cleanDate) {
    return res.status(400).json({
      error: 'Үзлэгт ирэх өдрөө сонгоно уу.',
    });
  }
  const dateObj = new Date(cleanDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (isNaN(dateObj.getTime())) {
    return res.status(400).json({
      error: 'Үзлэгт ирэх өдрийн формат буруу байна (YYYY-MM-DD).',
    });
  }
  if (dateObj < today) {
    return res.status(400).json({
      error: 'Өнгөрсөн өдөр сонгох боломжгүй.',
    });
  }

  const cleanTime = (preferredTimeSlot || '09:00 - 12:00').toString().trim();
  const cleanNotes = (notes || '').toString().trim().slice(0, 1000);

  // Generate confirmation code
  const bookingCode = `SLG-${Math.floor(1000 + Math.random() * 9000)}`;
  const submittedAt = new Date().toISOString();

  const record: StoredAppointment = {
    id: `apt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    bookingCode,
    fullName: cleanName,
    phone: digitsOnly,
    email: cleanEmail || undefined,
    branchId: branchId || 'central',
    serviceCategory: cleanCategory,
    preferredDate: cleanDate,
    preferredTimeSlot: cleanTime,
    notes: cleanNotes || undefined,
    submittedAt,
    status: 'pending',
  };

  appointmentStore.unshift(record);

  // Recipient email addresses configured via APPOINTMENT_RECIPIENT_EMAIL
  const rawRecipient = (
    process.env.APPOINTMENT_RECIPIENT_EMAIL ||
    'orgio1298@gmail.com, contact@solongohospital.mn'
  ).trim();

  const recipientList = rawRecipient
    .split(/[,;]+/)
    .map((e) => e.trim().replace(/^["']|["']$/g, ''))
    .filter((e) => Boolean(e) && e.includes('@'));

  const recipientEmail = recipientList.length > 0 ? recipientList.join(', ') : 'orgio1298@gmail.com';

  const { transporter, isConfigured } = getMailTransporter();

  // HTML Email Template for Hospital Staff
  const hospitalEmailHtml = `
    <!DOCTYPE html>
    <html lang="mn">
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 24px; margin: 0; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: #1769AA; padding: 28px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
        .header p { margin: 0; font-size: 13px; opacity: 0.9; }
        .badge { display: inline-block; background: #123B63; color: #ffffff; padding: 6px 14px; border-radius: 9999px; font-size: 13px; font-weight: 700; margin-top: 10px; font-family: monospace; letter-spacing: 1px; }
        .content { padding: 24px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px; }
        .table td { padding: 12px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
        .label { font-weight: 600; color: #64748B; width: 38%; }
        .val { font-weight: 500; color: #0f172a; }
        .notes-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; margin-top: 6px; font-size: 13px; color: #334155; }
        .footer { background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Шинэ цаг захиалгын хүсэлт</h1>
          <p>Солонго нүдний эмнэлэг — Онлайн цаг захиалгын систем</p>
          <div class="badge">БАТАЛГААЖУУЛАХ КОД: ${bookingCode}</div>
        </div>
        <div class="content">
          <table class="table">
            <tr>
              <td class="label">Үйлчлүүлэгчийн нэр:</td>
              <td class="val"><strong>${cleanName}</strong></td>
            </tr>
            <tr>
              <td class="label">Утасны дугаар:</td>
              <td class="val"><a href="tel:${digitsOnly}" style="color: #1769AA; font-weight: 700; text-decoration: none;">${digitsOnly}</a></td>
            </tr>
            <tr>
              <td class="label">Имэйл хаяг:</td>
              <td class="val">${cleanEmail ? `<a href="mailto:${cleanEmail}" style="color: #1769AA;">${cleanEmail}</a>` : 'Оруулаагүй'}</td>
            </tr>
            <tr>
              <td class="label">Салбар:</td>
              <td class="val">${cleanBranch}</td>
            </tr>
            <tr>
              <td class="label">Үзлэгийн төрөл:</td>
              <td class="val">${cleanCategory}</td>
            </tr>
            <tr>
              <td class="label">Сонгосон өдөр:</td>
              <td class="val"><strong>${cleanDate}</strong></td>
            </tr>
            <tr>
              <td class="label">Боломжит цаг:</td>
              <td class="val"><strong>${cleanTime}</strong></td>
            </tr>
            <tr>
              <td class="label">Нэмэлт тайлбар:</td>
              <td class="val">
                ${cleanNotes ? `<div class="notes-box">${cleanNotes}</div>` : '<em style="color:#94a3b8;">Хоосон</em>'}
              </td>
            </tr>
            <tr>
              <td class="label">Илгээсэн хугацаа:</td>
              <td class="val">${new Date().toLocaleString('mn-MN', { timeZone: 'Asia/Ulaanbaatar' })}</td>
            </tr>
          </table>
        </div>
        <div class="footer">
          Энэхүү имэйлийг Солонго нүдний эмнэлгийн вебсайтын захиалгын системээс автоматаар илгээв.<br/>
          Лавлах утас: 7705-6699, 7706-6699 | Вэб: <a href="https://solongohospital.mn" style="color: #1769AA;">solongohospital.mn</a>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Send email to hospital reception / admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Солонго нүдний эмнэлэг" <noreply@solongohospital.mn>',
      to: recipientEmail,
      subject: `[Солонго нүдний эмнэлэг] Шинэ цаг захиалга: ${cleanName} (${bookingCode})`,
      html: hospitalEmailHtml,
      text: `Шинэ цаг захиалга: ${cleanName}, Утас: ${digitsOnly}, Салбар: ${cleanBranch}, Төрөл: ${cleanCategory}, Огноо: ${cleanDate} (${cleanTime}), Код: ${bookingCode}`,
    });

    // If client provided an email address, send confirmation receipt
    if (cleanEmail) {
      const patientConfirmationHtml = `
        <!DOCTYPE html>
        <html lang="mn">
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 24px; margin: 0; }
            .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
            .header { background: #1769AA; padding: 26px 20px; text-align: center; color: #ffffff; }
            .content { padding: 24px; line-height: 1.6; font-size: 14px; }
            .badge { display: inline-block; background: #EAF4FC; color: #1769AA; padding: 8px 16px; border-radius: 12px; font-size: 18px; font-weight: 800; font-family: monospace; }
            .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748B; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h2 style="margin: 0; font-size: 20px;">Цаг захиалгын хүсэлт хүлээн авлаа</h2>
              <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Солонго нүдний эмнэлэг</p>
            </div>
            <div class="content">
              <p>Сайн байна уу, эрхэм <strong>${cleanName}</strong>?</p>
              <p>Таны цаг захиалах хүсэлт амжилттай бүртгэгдлээ. Манай сувилагч таны <strong>${digitsOnly}</strong> утсаар 15 минутын дотор холбогдон захиалгыг эцэслэх болно.</p>
              
              <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 12px; color: #64748B; margin-bottom: 4px;">ТАНЫ БАТАЛГААЖУУЛАХ КОД</div>
                <div class="badge">${bookingCode}</div>
              </div>

              <div style="background: #f1f5f9; padding: 14px; border-radius: 10px; font-size: 13px;">
                <div><strong>Салбар:</strong> ${cleanBranch}</div>
                <div><strong>Үзлэгийн төрөл:</strong> ${cleanCategory}</div>
                <div><strong>Товлосон огноо:</strong> ${cleanDate} (${cleanTime})</div>
              </div>

              <p style="margin-top: 20px; font-size: 13px; color: #64748B;">
                Хэрэв та цагаа өөрчлөх эсвэл яаралтай лавлахыг хүсвэл <strong>7705-6699</strong> утсаар холбогдоно уу.
              </p>
            </div>
            <div class="footer">
              Солонго нүдний эмнэлэг — Монгол хүний эрүүл нүдний төлөө
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_FROM || '"Солонго нүдний эмнэлэг" <noreply@solongohospital.mn>',
        to: cleanEmail,
        subject: `[Солонго нүдний эмнэлэг] Таны цаг захиалгын хүсэлт хүлээн авагдлаа (${bookingCode})`,
        html: patientConfirmationHtml,
        text: `Сайн байна уу ${cleanName}, таны цаг захиалгын хүсэлт хүлээн авагдлаа. Баталгаажуулах код: ${bookingCode}. Салбар: ${cleanBranch}. Бид таны ${digitsOnly} утсаар холбогдох болно.`,
      }).catch((e) => {
        console.warn('Patient confirmation email warning:', e);
      });
    }

    return res.status(200).json({
      success: true,
      bookingCode,
      message: 'Таны цаг захиалах хүсэлтийг амжилттай хүлээн авч, эмнэлгийн ажилтанд илгээлээ. Бид тантай утсаар холбогдоно.',
      deliveredEmail: recipientEmail,
      timestamp: submittedAt,
      isConfigured,
    });
  } catch (error: any) {
    console.warn('[Appointment Email Delivery Notice]:', error?.message);
    if (error?.message?.includes('535') || error?.message?.includes('BadCredentials')) {
      console.warn('[SMTP Notice] Gmail requires a 16-character App Password at https://myaccount.google.com/apppasswords');
    }

    return res.status(200).json({
      success: true,
      bookingCode,
      message: 'Таны цаг захиалах хүсэлтийг амжилттай хүлээн авч бүртгэлээ. Бид тантай утсаар холбогдоно.',
      deliveredEmail: recipientEmail,
      timestamp: submittedAt,
      isConfigured,
      emailSent: false,
      deliveryNotice: error?.message,
    });
  }
});

// -----------------------------------------------------------------------------
// 3. Feedback endpoint: POST /api/feedback
// -----------------------------------------------------------------------------
app.post('/api/feedback', async (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  // Rate limiting: max 10 feedback requests per 10 minutes per IP
  if (!checkRateLimit(`fb_${clientIp}`, 10, 10 * 60 * 1000)) {
    return res.status(429).json({
      error: 'Хэт олон санал хүсэлт илгээсэн байна. Та түр хүлээгээд дахин оролдоно уу.',
    });
  }

  const { name, contact, message, source } = req.body;

  const cleanName = (name || '').toString().trim();
  const cleanContact = (contact || '').toString().trim();
  const cleanMessage = (message || '').toString().trim();
  const cleanSource = source === 'contact' ? 'Холбоо барих хуудас' : 'Нүүр хуудас';

  if (!cleanName || cleanName.length < 2 || cleanName.length > 80) {
    return res.status(400).json({
      error: 'Нэрээ зөв оруулна уу (хамгийн багадаа 2, ихдээ 80 тэмдэгт).',
    });
  }

  if (!cleanContact || cleanContact.length < 5 || cleanContact.length > 100) {
    return res.status(400).json({
      error: 'Холбоо барих утас эсвэл и-мэйл хаягаа зөв оруулна уу.',
    });
  }

  if (!cleanMessage || cleanMessage.length < 5 || cleanMessage.length > 2000) {
    return res.status(400).json({
      error: 'Санал хүсэлтийн агуулгаа 5-2000 тэмдэгтэд багтаан оруулна уу.',
    });
  }

  const submittedAt = new Date().toISOString();
  feedbackStore.unshift({
    id: `fb_${Date.now()}`,
    name: cleanName,
    contact: cleanContact,
    message: cleanMessage,
    source: cleanSource,
    submittedAt,
  });

  const recipientEmail =
    process.env.FEEDBACK_RECIPIENT_EMAIL ||
    'contact@solongohospital.mn, orgio1298@gmail.com';

  const { transporter, isConfigured } = getMailTransporter();

  const feedbackEmailHtml = `
    <!DOCTYPE html>
    <html lang="mn">
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 24px; margin: 0; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: #1769AA; padding: 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
        .content { padding: 24px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px; }
        .table td { padding: 12px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
        .label { font-weight: 600; color: #64748B; width: 35%; }
        .val { font-weight: 500; color: #0f172a; }
        .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-top: 6px; font-size: 14px; color: #1e293b; white-space: pre-wrap; line-height: 1.6; }
        .footer { background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>[Solongo Eye Hospital] Шинэ санал хүсэлт</h1>
          <p style="margin:0; font-size:13px; opacity:0.9;">Илгээсэн эх үүсвэр: ${cleanSource}</p>
        </div>
        <div class="content">
          <table class="table">
            <tr>
              <td class="label">Илгээгчийн нэр:</td>
              <td class="val"><strong>${cleanName}</strong></td>
            </tr>
            <tr>
              <td class="label">Холбоо барих:</td>
              <td class="val"><strong>${cleanContact}</strong></td>
            </tr>
            <tr>
              <td class="label">Эх үүсвэр:</td>
              <td class="val">${cleanSource}</td>
            </tr>
            <tr>
              <td class="label">Хүсэлтийн агуулга:</td>
              <td class="val">
                <div class="message-box">${cleanMessage}</div>
              </td>
            </tr>
            <tr>
              <td class="label">Огноо, цаг:</td>
              <td class="val">${new Date().toLocaleString('mn-MN', { timeZone: 'Asia/Ulaanbaatar' })}</td>
            </tr>
          </table>
        </div>
        <div class="footer">
          Солонго нүдний эмнэлэг — Санал хүсэлтийн удирдлагын систем
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Солонго нүдний эмнэлэг" <noreply@solongohospital.mn>',
      to: recipientEmail,
      subject: `[Solongo Eye Hospital] Шинэ санал хүсэлт (${cleanSource}): ${cleanName}`,
      html: feedbackEmailHtml,
      text: `Шинэ санал хүсэлт: ${cleanName}, Холбоо барих: ${cleanContact}, Эх үүсвэр: ${cleanSource}, Агуулга: ${cleanMessage}`,
    });

    return res.status(200).json({
      success: true,
      message: 'Таны санал хүсэлтийг амжилттай хүлээн авч, удирдлагын багт илгээлээ. Баярлалаа!',
      deliveredEmail: recipientEmail,
      timestamp: submittedAt,
      isConfigured,
    });
  } catch (error: any) {
    console.warn('[Feedback Email Delivery Notice]:', error?.message);
    return res.status(200).json({
      success: true,
      message: 'Таны санал хүсэлтийг амжилттай хүлээн авлаа. Баярлалаа!',
      deliveredEmail: recipientEmail,
      timestamp: submittedAt,
      isConfigured,
      deliveryNotice: error?.message,
    });
  }
});

// -----------------------------------------------------------------------------
// 4. Vite Dev Middleware / Static File Serving
// -----------------------------------------------------------------------------
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Solongo Hospital] Server running on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
