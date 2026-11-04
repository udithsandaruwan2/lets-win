interface PublicEnv {
  apiUrl: string;
}

export function getPublicEnv(): PublicEnv {
  const apiUrl = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";
  return { apiUrl };
}
