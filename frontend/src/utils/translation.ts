/**
 * Pluralization rules for Russian language.
 * @param n Quantity
 * @param x Array of strings with Russian translations
 * @param showNum Whether to show the quantity
 * @returns Russian translation
 */
export const plural = (n: number, x: string[], showNum = false): string => {
  let p = 2;
  if (n % 10 === 1 && n % 100 === 1) p = 0;
  else if (2 <= n % 10 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) p = 1;
  return (showNum ? String(n) + " " : "") + x[p];
};

export default {
  plural,
};
