export enum LocalData {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  USER = "user",
}

export function setLocalData(
  key: LocalData,
  value: string,
  serialize = false
): void {
  if (serialize) value = JSON.stringify(value);
  localStorage.setItem(key, value);
}

export function getLocalData(key: LocalData): string | null {
  const value = localStorage.getItem(key);
  if (!value) return null;
  return value;
}

export function clearLocalData(): void {
  localStorage.removeItem(LocalData.ACCESS_TOKEN);
  localStorage.removeItem(LocalData.REFRESH_TOKEN);
  localStorage.removeItem(LocalData.USER);
}
