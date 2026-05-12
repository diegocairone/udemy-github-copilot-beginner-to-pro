"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { updateLinkAction, deleteLinkAction } from "./action";

interface UserLink {
  id: number;
  url: string;
  shortCode: string;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface UserLinksListProps {
  links: UserLink[];
}

export function UserLinksList({ links }: UserLinksListProps) {
  const router = useRouter();
  const [editingLink, setEditingLink] = useState<UserLink | null>(null);
  const [deleteLinkId, setDeleteLinkId] = useState<number | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openEditDialog = (link: UserLink) => {
    setEditingLink(link);
    setEditUrl(link.url);
    setFormError(null);
  };

  const closeEditDialog = () => {
    setEditingLink(null);
    setEditUrl("");
    setFormError(null);
    setIsSaving(false);
  };

  const openDeleteDialog = (id: number) => {
    setDeleteLinkId(id);
    setFormError(null);
  };

  const closeDeleteDialog = () => {
    setDeleteLinkId(null);
    setFormError(null);
    setIsDeleting(false);
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

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!editingLink) {
      return;
    }

    const normalized = normalizeUrl(editUrl);
    if (!normalized) {
      setFormError("Please enter a valid URL.");
      return;
    }

    setIsSaving(true);
    const result = await updateLinkAction({ id: editingLink.id, url: normalized });

    if (result?.error) {
      setFormError(result.error);
      setIsSaving(false);
      return;
    }

    closeEditDialog();
    router.refresh();
  };

  const handleDelete = async () => {
    if (deleteLinkId === null) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteLinkAction({ id: deleteLinkId });

    if (result?.error) {
      setFormError(result.error);
      setIsDeleting(false);
      return;
    }

    closeDeleteDialog();
    router.refresh();
  };

  if (links.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Links Yet</CardTitle>
          <CardDescription>Create your first link to get started</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Links</h2>
        <div className="grid gap-4">
          {links.map((link) => (
            <Card key={link.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">/{link.shortCode}</code>
                </CardTitle>
                <CardDescription className="break-all">{link.url}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-muted-foreground">
                    Created {new Date(link.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/${link.shortCode}`}>
                      <Button variant="outline" size="sm">
                        Visit
                      </Button>
                    </Link>
                    <Button type="button" variant="outline" size="sm" onClick={() => openEditDialog(link)}>
                      Edit
                    </Button>
                    <Button type="button" variant="destructive" size="sm" onClick={() => openDeleteDialog(link.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {editingLink ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          role="dialog"
          aria-modal="true"
          onClick={closeEditDialog}
        >
          <div className="w-full max-w-xl rounded-3xl bg-background p-6 shadow-2xl ring-1 ring-white/10" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Edit link</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Update the destination URL for this short link.
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditDialog}
                className="rounded-full p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleUpdate}>
              <label className="block text-sm font-medium text-muted-foreground">
                Destination URL
                <input
                  value={editUrl}
                  onChange={(event) => setEditUrl(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="https://example.com"
                  aria-label="Destination URL"
                  required
                  disabled={isSaving}
                />
              </label>

              {formError ? <p className="text-sm text-destructive">{formError}</p> : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={closeEditDialog} disabled={isSaving}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {deleteLinkId !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          role="dialog"
          aria-modal="true"
          onClick={closeDeleteDialog}
        >
          <div className="w-full max-w-md rounded-3xl bg-background p-6 shadow-2xl ring-1 ring-white/10" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Delete link?</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  This action cannot be undone. Are you sure you want to delete this link?
                </p>
              </div>
              <button
                type="button"
                onClick={closeDeleteDialog}
                className="rounded-full p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            {formError ? <p className="mt-4 text-sm text-destructive">{formError}</p> : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={closeDeleteDialog} disabled={isDeleting}>
                Cancel
              </Button>
              <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete link"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
