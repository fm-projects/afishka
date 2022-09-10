export const toShortDate = (date: Date): string => {
  if (date.getFullYear() === new Date().getFullYear()) {
    return date.toLocaleDateString("ru", {
      day: "numeric",
      month: "long",
    });
  }

  return date.toLocaleDateString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const toShortDateTime = (date: Date): string => {
  return date.toLocaleDateString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export const getDayName = (day: number) => {
  if (day === 7) day = 0;
  let now = new Date();
  let distance = day - now.getDay();
  now.setDate(now.getDate() + distance);
  let r = now.toLocaleString("ru", { weekday: "long" });
  r = r[0].toUpperCase() + r.slice(1);
  return r;
};

export const renderTime = (s: string) => {
  return s.slice(s[0] === "0" ? 1 : 0, 5);
};
