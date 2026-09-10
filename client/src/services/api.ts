export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:5000";

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
