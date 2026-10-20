/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { AppointmentModal } from './components/AppointmentModal.tsx';
import { ToastProvider } from './context/ToastContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { BackToTop } from './components/BackToTop.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { HistoryPage } from './pages/HistoryPage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { ServiceDetailPage } from './pages/ServiceDetailPage.tsx';
import { DoctorsPage } from './pages/DoctorsPage.tsx';
import { NewsPage } from './pages/NewsPage.tsx';
import { NewsDetailPage } from './pages/NewsDetailPage.tsx';
import { AdvicePage } from './pages/AdvicePage.tsx';
import { BranchesPage } from './pages/BranchesPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { PrivacyPage } from './pages/PrivacyPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider position="bottom-right">
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
          {/* Navigation Header */}
          <Header onOpenAppointment={() => setAppointmentModalOpen(true)} />

          {/* Page Content */}
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={<HomePage onOpenAppointment={() => setAppointmentModalOpen(true)} />}
              />
              <Route
                path="/about"
                element={<AboutPage onOpenAppointment={() => setAppointmentModalOpen(true)} />}
              />
              <Route
                path="/about/history"
                element={<HistoryPage onOpenAppointment={() => setAppointmentModalOpen(true)} />}
              />
              <Route
                path="/services"
                element={<ServicesPage onOpenAppointment={() => setAppointmentModalOpen(true)} />}
              />
              <Route
                path="/services/:slug"
                element={<ServiceDetailPage onOpenAppointment={() => setAppointmentModalOpen(true)} />}
              />
              <Route
                path="/doctors"
                element={<DoctorsPage onOpenAppointment={() => setAppointmentModalOpen(true)} />}
              />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:slug" element={<NewsDetailPage />} />
              <Route
                path="/advice"
                element={<AdvicePage onOpenAppointment={() => setAppointmentModalOpen(true)} />}
              />
              <Route
                path="/branches"
                element={<BranchesPage onOpenAppointment={() => setAppointmentModalOpen(true)} />}
              />
              <Route
                path="/contact"
                element={<ContactPage onOpenAppointment={() => setAppointmentModalOpen(true)} />}
              />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route
                path="*"
                element={<NotFoundPage onOpenAppointment={() => setAppointmentModalOpen(true)} />}
              />
            </Routes>
          </main>

          {/* Footer */}
          <Footer onOpenAppointment={() => setAppointmentModalOpen(true)} />

          {/* Global Online Appointment Modal */}
          <AppointmentModal
            isOpen={appointmentModalOpen}
            onClose={() => setAppointmentModalOpen(false)}
          />

          {/* Dedicated Back To Top Floating Action Button */}
          <BackToTop />
        </div>
      </ToastProvider>
    </ThemeProvider>
  </BrowserRouter>
  );
}
