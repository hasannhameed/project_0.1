"use client";

import { useRef, useState } from "react";
import { updateProfile, type AuthUser } from "@/lib/authClient";
import { useAuth } from "./AuthProvider";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2 MB raw file size

function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error);
        reader.onload = () => resolve(String(reader.result));
        reader.readAsDataURL(file);
    });
}

export default function ProfileEditor({ user }: { user: AuthUser }) {
    const { refresh } = useAuth();
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio ?? "");
    const [avatar, setAvatar] = useState<string | null>(user.avatar);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [savedAt, setSavedAt] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const initial = (name || user.email).slice(0, 1).toUpperCase();

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setError("Please choose an image file.");
            return;
        }
        if (file.size > MAX_AVATAR_BYTES) {
            setError(`Avatar must be 2 MB or smaller. You picked ${(file.size / 1024 / 1024).toFixed(2)} MB.`);
            return;
        }
        try {
            const dataUrl = await readFileAsDataUrl(file);
            setAvatar(dataUrl);
        } catch {
            setError("Could not read the file. Try another.");
        }
    };

    const removeAvatar = () => {
        setAvatar(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Name cannot be empty.");
            return;
        }
        setSaving(true);
        setError(null);
        try {
            await updateProfile({
                name: name.trim(),
                bio: bio.trim() === "" ? null : bio.trim(),
                avatar,
            });
            await refresh();
            setSavedAt(Date.now());
            setTimeout(() => setSavedAt(null), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Couldn't save. Try again.");
        } finally {
            setSaving(false);
        }
    };

    const inputCls =
        "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-sakura/60 focus:bg-black/50 focus:shadow-[0_0_0_4px_rgba(255,177,209,0.12)]";

    return (
        <form onSubmit={handleSave} className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br from-sakura via-twilight to-sky opacity-25 blur-3xl" />

            <div className="relative flex flex-col gap-5">
                <div>
                    <h2 className="font-display text-2xl text-white">Edit profile</h2>
                    <p className="mt-1 text-xs text-white/50">
                        Update how you appear across Hanabi. Avatar limit is 2 MB.
                    </p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                    {avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={avatar}
                            alt="Your avatar"
                            className="h-20 w-20 rounded-2xl border border-white/10 object-cover"
                        />
                    ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sakura via-twilight to-sky text-2xl font-black text-white shadow-lg shadow-sakura/40">
                            {initial}
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                            className="hidden"
                            id="avatar-file"
                        />
                        <label
                            htmlFor="avatar-file"
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:border-sakura/40 hover:bg-white/10"
                        >
                            {avatar ? "Change image" : "Upload image"}
                        </label>
                        {avatar && (
                            <button
                                type="button"
                                onClick={removeAvatar}
                                className="text-left text-[10px] font-bold uppercase tracking-wider text-white/40 transition hover:text-red-300"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-sakura-soft">
                        Display name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={60}
                        className={inputCls}
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-sky">
                        Bio
                    </label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        maxLength={280}
                        placeholder="Tell other fans about your taste, favorites, anything…"
                        className={`${inputCls} resize-none`}
                    />
                    <p className="mt-1 text-right text-[10px] uppercase tracking-wider text-white/40">
                        {bio.length}/280
                    </p>
                </div>

                <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-twilight">
                        Email
                    </label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className={`${inputCls} cursor-not-allowed opacity-60`}
                    />
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                        Email can&apos;t be changed yet.
                    </p>
                </div>

                {error && (
                    <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-200">
                        {error}
                    </div>
                )}
                {savedAt && (
                    <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-200">
                        ✓ Saved.
                    </div>
                )}

                <button
                    type="submit"
                    disabled={saving}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-sakura via-twilight to-sky px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sakura/30 transition hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {saving ? (
                            <>
                                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Saving…
                            </>
                        ) : (
                            "Save changes"
                        )}
                    </span>
                    {!saving && <span className="shimmer-overlay" />}
                </button>
            </div>
        </form>
    );
}
