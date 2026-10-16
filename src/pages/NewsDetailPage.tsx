import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { NEWS_ITEMS } from '../utils/hospitalData.ts';
import { ArrowLeft, Calendar, Clock, User, Share2, Tag, ChevronRight } from 'lucide-react';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const news = NEWS_ITEMS.find((n) => n.slug === slug);

  if (!news) {
    return (
      <div className="py-20 max-w-xl mx-auto text-center px-4 space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Мэдээ олдсонгүй</h1>
        <p className="text-slate-600 text-sm">Таны хайсан мэдээллийн хуудас олдсонгүй.</p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Бүх мэдээ рүү буцах</span>
        </Link>
      </div>
    );
  }

  const relatedNews = NEWS_ITEMS.filter((n) => n.id !== news.id).slice(0, 2);

  return (
    <article className="py-10 sm:py-14 max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
      {/* Back button */}
      <div>
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Бүх мэдээ рүү буцах</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-full font-bold bg-teal-50 text-teal-800">
            {news.category}
          </span>
          <div className="flex items-center gap-1.5 text-slate-500 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>{news.publishedDate}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Унших хугацаа: {news.readTime}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {news.title}
        </h1>

        <div className="flex items-center gap-2 text-xs text-slate-600 pt-2 border-b border-slate-100 pb-4">
          <User className="w-4 h-4 text-slate-400" />
          <span>Нийтэлсэн: <strong>{news.author}</strong></span>
        </div>
      </div>

      {/* Lead summary */}
      <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-teal-500 text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
        {news.summary}
      </div>

      {/* Main Body */}
      <div className="space-y-6 text-slate-700 text-base leading-relaxed">
        {news.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
        <Tag className="w-4 h-4 text-slate-400 mr-1" />
        {news.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Бусад мэдээ, зарлал</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedNews.map((rn) => (
              <Link
                key={rn.id}
                to={`/news/${rn.slug}`}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-teal-500 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div>
                  <span className="text-[10px] font-bold text-teal-700 uppercase">{rn.category}</span>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors line-clamp-2">
                    {rn.title}
                  </h4>
                </div>
                <div className="text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>{rn.publishedDate}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
