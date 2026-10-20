import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NEWS_ITEMS } from '../utils/hospitalData.ts';
import { Newspaper, Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Бүх мэдээ' },
    { id: 'Зарлал', label: 'Зарлал' },
    { id: 'Мэдээ', label: 'Мэдээ' },
    { id: 'Аян', label: 'Аян' },
    { id: 'Эрүүл мэнд', label: 'Эрүүл мэнд' },
  ];

  const filteredNews = NEWS_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 sm:py-14 site-container space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 border border-blue-200/60 text-xs font-semibold">
          <Newspaper className="w-4 h-4 text-[#1769AA] dark:text-sky-400" />
          <span>Эмнэлгийн сонин сайхан</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Мэдээ, мэдээлэл
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Солонго нүдний эмнэлгийн үйл ажиллагаа, ЭМД-ын шинэчлэл, олон улсын зөвлөх эмчийн үзлэгийн хуваарь болон эрүүл мэндийн зөвлөгөөнүүд.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-[#1769AA] text-white shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Мэдээ хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 focus:border-[#1769AA]"
          />
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:border-[#1769AA]/40 transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full font-bold bg-blue-50 dark:bg-blue-950/60 text-[#1769AA] dark:text-sky-300 border border-blue-200/60 dark:border-blue-800/60">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.publishedDate}</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug hover:text-[#1769AA] dark:hover:text-sky-400 transition-colors">
                  <Link to={`/news/${item.slug}`}>{item.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-6">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Унших: {item.readTime}</span>
                </div>
                <Link
                  to={`/news/${item.slug}`}
                  className="font-bold text-[#1769AA] dark:text-sky-400 hover:text-[#123B63] dark:hover:text-sky-300 flex items-center gap-1 hover:underline"
                >
                  <span>Дэлгэрэнгүй</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-slate-500 text-base">Мэдээ олдсонгүй.</p>
        </div>
      )}
    </div>
  );
};
