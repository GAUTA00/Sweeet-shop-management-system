export const generateNumericId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return Number(String(timestamp).slice(-5) + String(random).padStart(3, '0'));
};
