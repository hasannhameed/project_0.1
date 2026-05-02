export const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json();

}

export const usersApi = {
  list: () => request("/users"),
  create: (data) =>
    request("/users", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    request(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => request(`/users/${id}`, { method: "DELETE" }),
};
