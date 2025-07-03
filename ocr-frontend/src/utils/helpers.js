export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

export const truncateText = (text, length = 100) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};