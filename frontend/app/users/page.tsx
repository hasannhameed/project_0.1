"use client";
import { useEffect, useState } from "react";
import { usersApi } from "@/lib/apiClient";
import UserForm, { UserFormValues } from "@/components/UserForm";
import UserCard, { User } from "@/components/UserCard";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<User | null>(null);
  const [query, setQuery] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const data = await usersApi.list();
      setUsers(data);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (values: UserFormValues) => {
    const created = await usersApi.create(values);
    setUsers((prev) => [...prev, created]);
  };

  const handleUpdate = async (values: UserFormValues) => {
    if (!editing) return;
    const updated = await usersApi.update(editing.id, values);
    setUsers((prev) => prev.map((u) => (u.id === editing.id ? updated : u)));
    setEditing(null);
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`Delete ${user.name}?`)) return;
    await usersApi.remove(user.id);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  const filtered = users.filter((u) => {
    const q = query.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-12">
        <header className="mb-10 flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-indigo-300">
            Dashboard
          </span>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Users
          </h1>
          <p className="text-sm text-slate-400">
            Create, edit, and remove users from your backend.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="order-2 lg:order-1">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">All users</h2>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full max-w-[220px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
              />
            </div>

            {loading ? (
              <div className="flex flex-col gap-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-[68px] animate-pulse rounded-xl border border-white/10 bg-white/5"
                  />
                ))}
              </div>
            ) : loadError ? (
              <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-300">
                {loadError}
                <button
                  onClick={loadUsers}
                  className="ml-3 underline underline-offset-2 hover:text-rose-200"
                >
                  Retry
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center">
                <p className="text-sm text-slate-400">
                  {users.length === 0
                    ? "No users yet — add your first one →"
                    : "No users match your search."}
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {filtered.map((user) => (
                  <li key={user.id}>
                    <UserCard
                      user={user}
                      onEdit={setEditing}
                      onDelete={handleDelete}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <aside className="order-1 lg:order-2">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20 backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {editing ? "Edit user" : "Add user"}
                </h2>
                {editing && (
                  <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
                    #{editing.id}
                  </span>
                )}
              </div>
              <UserForm
                key={editing?.id ?? "new"}
                initial={editing ? { name: editing.name, email: editing.email } : undefined}
                submitLabel={editing ? "Save changes" : "Create user"}
                onSubmit={editing ? handleUpdate : handleCreate}
                onCancel={editing ? () => setEditing(null) : undefined}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
