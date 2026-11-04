import { getPublicEnv } from "./env";

function apiBase(): string {
  // Empty base = same-origin (Vite proxy /api → backend).
  return getPublicEnv().apiUrl.replace(/\/$/, "");
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export async function ensureCsrf(): Promise<string> {
  const response = await fetch(`${apiBase()}/api/v1/auth/csrf/`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch CSRF token");
  }
  const data = (await response.json()) as { csrfToken?: string };
  return data.csrfToken ?? getCookie("csrftoken") ?? "";
}

export async function apiFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(init.headers);
  if (init.method && init.method !== "GET" && init.method !== "HEAD") {
    const token = getCookie("csrftoken") ?? (await ensureCsrf());
    headers.set("X-CSRFToken", token);
  }
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(`${apiBase()}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });
}
