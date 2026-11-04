import { useState, type FormEvent } from "react";

import { apiFetch, ensureCsrf } from "../../lib/api";

interface LoginFormProps {
  onLoggedIn: (username: string) => void;
}

export function LoginForm({ onLoggedIn }: LoginFormProps) {
  const [username, setUsername] = useState("operator");
  const [password, setPassword] = useState("operator");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await ensureCsrf();
      const response = await apiFetch("/api/v1/auth/login/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        setError("Login failed. Check username/password.");
        return;
      }
      const data = (await response.json()) as { username: string };
      onLoggedIn(data.username);
    } catch {
      setError("Could not reach API. Is Docker / runserver up?");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="login" onSubmit={onSubmit}>
      <label>
        Username
        <input
          name="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
