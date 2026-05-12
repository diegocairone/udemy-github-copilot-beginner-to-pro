"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createLinkAction } from "./action";

export function CreateLinkDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const openDialog = () => {
    setUrl("");
    setError(null);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setIsSaving(false);
  };

  const normalizeUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }

    try {
      return new URL(trimmed).toString();
    } catch {
      if (/^[\w-]+(\.[\w-]+)+/.test(trimmed)) {
        return new URL(`https://${trimmed}`).toString();
      }
      return null;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const normalized = normalizeUrl(url);
    if (!normalized) {
      setError("Please enter a valid URL.");
      return;
    }

    setIsSaving(true);
    const result = await createLinkAction({ url: normalized });

    if (result?.error) {
      setError(result.error);
      setIsSaving(false);
      return;
    }

    closeDialog();
    router.refresh();
  };

  return (
    <>
      <Button type="button" onClick={openDialog} className="w-full sm:w-auto">
        + New Link
      </Button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          role="dialog"
          aria-modal="true"
          onClick={closeDialog}
        >
          <div
            className="w-full max-w-xl rounded-3xl bg-background p-6 shadow-2xl ring-1 ring-white/10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Create new link</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Shorten a URL and add it to your dashboard.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-full p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-muted-foreground">
                Destination URL
                <input
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="https://example.com"
                  aria-label="Destination URL"
                  required
                  disabled={isSaving}
                />
              </label>

              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={closeDialog} disabled={isSaving}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Creating..." : "Create link"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
