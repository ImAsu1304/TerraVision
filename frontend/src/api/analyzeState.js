const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function analyzeState(state) {
  const res = await fetch(`${API_BASE_URL}/api/state/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }

  return res.json();
}