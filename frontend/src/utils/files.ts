export const getFileSize = (size: number): string => {
  let c = 0,
    s = size;
  const sizes = ["Б", "Кб", "Мб", "Гб"];
  while (s > 1024) {
    s /= 1024;
    c++;
  }
  return Math.round(s * 100) / 100 + " " + sizes[c];
};

export default {
  getFileSize,
};
