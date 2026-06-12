export const truncate = (text, max = 100) => {
  if (!text || text.length <= max) return text || '';
  return text.slice(0, max) + '...';
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-KE', { year: 'numeric', month: 'short' });
};