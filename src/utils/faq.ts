import type { FAQItem } from '../types/index.ts';

/**
 * Filter FAQ items by category and search keyword
 */
export function filterFaqItems(
  items: FAQItem[],
  selectedCategory: string,
  searchQuery: string
): FAQItem[] {
  const query = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    const matchesSearch =
      !query ||
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query) ||
      (item.highlightTag && item.highlightTag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });
}
