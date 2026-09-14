export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "https://osijek-info-kiosk.onrender.com";

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
