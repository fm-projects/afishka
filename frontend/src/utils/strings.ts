import slugify from "slugify";

export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getSlug = (s: string): string => {
  return slugify(s, {
    replacement: "-",
    strict: true,
    lower: true,
  });
};

const stringUtils = {
  capitalize,
  getSlug,
};

export default stringUtils;
