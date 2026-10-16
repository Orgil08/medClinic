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
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
          <Newspaper className="w-4 h-4" />
          <span>Эмнэлгийн сонин сайхан</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Мэдээ, мэдээлэл
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Солонго нүдний эмнэлгийн үйл ажиллагаа, ЭМД-ын шинэчлэл, олон улсын зөвлөх эмчийн үзлэгийн хуваарь болон эрүүл мэндийн зөвлөгөөнүүд.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
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
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full font-bold bg-teal-50 text-teal-800">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.publishedDate}</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 leading-snug hover:text-teal-700 transition-colors">
                  <Link to={`/news/${item.slug}`}>{item.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-6">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Унших: {item.readTime}</span>
                </div>
                <Link
                  to={`/news/${item.slug}`}
                  className="font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 hover:underline"
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
