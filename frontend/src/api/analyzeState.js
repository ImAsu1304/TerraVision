export async function analyzeState(state) {
  const res = await fetch("http://localhost:5000/api/state/analyze", {
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
