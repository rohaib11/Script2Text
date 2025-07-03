const HISTORY_KEY = 'ocr_history';

export const saveToHistory = async (item) => {
  const history = await getHistory();
  const newHistory = [item, ...history].slice(0, 50); // Keep only last 50 items
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  return newHistory;
};

export const getHistory = async () => {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

export const clearHistory = async () => {
  localStorage.removeItem(HISTORY_KEY);
  return [];
};