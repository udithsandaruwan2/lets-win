import { useEffect, useState } from "react";

import { LoginForm } from "./features/auth/LoginForm";
import { apiFetch } from "./lib/api";
import "./App.css";

export function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [ping, setPing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await apiFetch("/api/v1/auth/me/");
        if (cancelled) return;
        if (me.ok) {
          const data = (await me.json()) as { username: string };
          setUsername(data.username);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function refreshPing() {
    const response = await apiFetch("/api/v1/operator/ping/");
    if (!response.ok) {
      setPing("unauthorized");
      return;
    }
    const data = (await response.json()) as { username: string };
    setPing(`ok · ${data.username}`);
  }

  async function logout() {
    await apiFetch("/api/v1/auth/logout/", { method: "POST" });
    setUsername(null);
    setPing(null);
  }

  return (
    <main className="shell">
      <p className="brand">lets-win</p>
      <h1>Operator shell</h1>
      {loading ? <p className="lede">Checking session…</p> : null}
      {!loading && !username ? (
        <>
          <p className="lede">Sign in to reach authenticated API routes.</p>
          <LoginForm onLoggedIn={setUsername} />
        </>
      ) : null}
      {!loading && username ? (
        <section className="session">
          <p className="lede">
            Signed in as <strong>{username}</strong>
          </p>
          <div className="actions">
            <button type="button" onClick={refreshPing}>
              Ping API
            </button>
            <button type="button" className="ghost" onClick={logout}>
              Sign out
            </button>
          </div>
          {ping ? <p className="lede">Ping: {ping}</p> : null}
        </section>
      ) : null}
    </main>
  );
}

export default App;
