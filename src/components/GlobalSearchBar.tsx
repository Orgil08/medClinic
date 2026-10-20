import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, User, Eye, Newspaper, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { searchHospital, type SearchResultItem, type SearchCategory } from '../utils/search.ts';

interface GlobalSearchBarProps {
  onSelectResult?: () => void;
  className?: string;
  isMobileFullWidth?: boolean;
}

const POPULAR_SEARCHES = [
  'Катаракт (Болор цайх)',
  'Хараа тэглэх лазер',
  'Dr. R.P. Singh',
  'ЭМД 75% хөнгөлөлт',
  'Глауком',
  'Хүүхдийн нүд',
];

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  onSelectResult,
  className = '',
  isMobileFullWidth = false,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const searchResults = searchHospital(query);

  // Filter items based on selected tab
  const displayedItems: SearchResultItem[] = (() => {
    if (selectedFilter === 'doctor') return searchResults.doctors;
    if (selectedFilter === 'service') return searchResults.services;
    if (selectedFilter === 'news') return searchResults.news;
    return searchResults.all;
  })();

  // Global keyboard shortcut: Ctrl+K or Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: SearchResultItem) => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(-1);
    if (onSelectResult) {
      onSelectResult();
    }
    navigate(item.path);
  };

  const handleKeyDownInInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < displayedItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayedItems.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && displayedItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(displayedItems[selectedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const getCategoryIcon = (type: SearchCategory) => {
    switch (type) {
      case 'doctor':
        return <User className="w-4 h-4 text-sky-600" />;
      case 'service':
        return <Eye className="w-4 h-4 text-[#1769AA]" />;
      case 'news':
        return <Newspaper className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="absolute left-3 pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDownInInput}
          placeholder="Эмч, үйлчилгээ, мэдээ хайх..."
          className={`w-full pl-9 pr-16 py-2 text-xs sm:text-sm bg-slate-100 hover:bg-slate-100/90 focus:bg-white dark:bg-slate-800 dark:hover:bg-slate-800/90 dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl border border-slate-200/90 dark:border-slate-700 focus:border-[#1769AA] dark:focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 transition-all ${
            isMobileFullWidth ? 'w-full' : 'w-44 sm:w-56 lg:w-64 xl:w-72'
          }`}
          aria-label="Эмнэлгийн мэдээлэл хайх"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors"
              aria-label="Хайлт арилгах"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded shadow-2xs">
              <span className="text-[9px]">⌘</span>K
            </kbd>
          )}
        </div>
      </div>

      {/* Dropdown Results Overlay */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-150 ${
            isMobileFullWidth
              ? 'left-0 right-0 max-h-[75vh]'
              : 'right-0 w-[90vw] sm:w-[440px] md:w-[480px] max-h-[500px]'
          } flex flex-col`}
        >
          {/* Active Query: Filter Tabs */}
          {query.trim().length > 0 && (
            <div className="flex items-center gap-1.5 p-2.5 bg-slate-50 border-b border-slate-100 overflow-x-auto text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedFilter('all');
                  setSelectedIndex(-1);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-[#1769AA] text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                Бүгд ({searchResults.totalCount})
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedFilter('doctor');
                  setSelectedIndex(-1);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'doctor'
                    ? 'bg-[#1769AA] text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                Эмч нар ({searchResults.doctors.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedFilter('service');
                  setSelectedIndex(-1);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'service'
                    ? 'bg-[#1769AA] text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                Үйлчилгээ ({searchResults.services.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedFilter('news');
                  setSelectedIndex(-1);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'news'
                    ? 'bg-[#1769AA] text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                Мэдээ ({searchResults.news.length})
              </button>
            </div>
          )}

          {/* Results List */}
          <div className="overflow-y-auto divide-y divide-slate-100 p-1 flex-1">
            {/* If query has results */}
            {query.trim().length > 0 && displayedItems.length > 0 && (
              displayedItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={`${item.type}-${item.id}`}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected ? 'bg-blue-50/80 ring-1 ring-blue-200' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                      {getCategoryIcon(item.type)}
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 text-sm truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-semibold text-[#1769AA] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-1 font-normal">
                        {item.subtitle}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 self-center opacity-60" />
                  </button>
                );
              })
            )}

            {/* If query has NO results */}
            {query.trim().length > 0 && displayedItems.length === 0 && (
              <div className="py-8 px-4 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    "{query}" хайлтад үр дүн олдсонгүй
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Түлхүүр үгээ шалгах эсвэл дараах нийтлэг үгсээс сонгоно уу.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                  {POPULAR_SEARCHES.slice(0, 4).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setQuery(tag);
                        inputRef.current?.focus();
                      }}
                      className="text-[11px] font-medium text-[#1769AA] bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Empty Query State: Show Popular Searches */}
            {query.trim().length === 0 && (
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-[#1769AA]" />
                  <span>Түгээмэл хайлтууд</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setQuery(tag);
                        inputRef.current?.focus();
                      }}
                      className="text-xs font-medium text-slate-700 hover:text-[#1769AA] bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer border border-slate-200/60"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Эмч, үзлэг, оношилгоо, мэс засал, мэдээ</span>
                  <span className="hidden sm:inline-flex items-center gap-1">
                    <CornerDownLeft className="w-3 h-3" /> сонгох
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
