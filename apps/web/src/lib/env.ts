interface PublicEnv {
  /** Empty string means same-origin / Vite proxy. */
  apiUrl: string;
}

export function getPublicEnv(): PublicEnv {
  const raw = import.meta.env.VITE_API_URL;
  if (raw === undefined || raw === "") {
    return { apiUrl: "" };
  }
  return { apiUrl: String(raw) };
}
