"use client";

export type User = { id: number; name: string; email: string };

type Props = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function UserCard({ user, onEdit, onDelete }: Props) {
  return (
    <div className="group relative flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-indigo-400/40 hover:bg-white/[0.07]">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20">
          {initials(user.name) || "?"}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-100">{user.name}</p>
          <p className="truncate text-xs text-slate-400">{user.email}</p>
        </div>
      </div>

      <div className="flex shrink-0 gap-2 opacity-80 transition group-hover:opacity-100">
        <button
          onClick={() => onEdit(user)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user)}
          className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/20"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
