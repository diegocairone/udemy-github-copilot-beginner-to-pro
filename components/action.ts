"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createUserLink, updateUserLink, deleteUserLink } from "@/data/links";

const urlSchema = z.string().min(1).transform((value) => value.trim()).refine((value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}, {
  message: "Invalid URL",
});

const createLinkSchema = z.object({
  url: urlSchema,
});

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: urlSchema,
});

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

export async function createLinkAction(data: { url: string }) {
  const validation = createLinkSchema.safeParse(data);

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message ?? "Invalid URL" };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    await createUserLink(userId, validation.data.url);
    return { success: true };
  } catch {
    return { error: "Unable to create link. Please try again." };
  }
}

export async function updateLinkAction(data: { id: number; url: string }) {
  const validation = updateLinkSchema.safeParse(data);

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message ?? "Invalid URL" };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    await updateUserLink(validation.data.id, validation.data.url);
    return { success: true };
  } catch {
    return { error: "Unable to update link. Please try again." };
  }
}

export async function deleteLinkAction(data: { id: number }) {
  const validation = deleteLinkSchema.safeParse(data);

  if (!validation.success) {
    return { error: "Invalid link ID" };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    await deleteUserLink(validation.data.id);
    return { success: true };
  } catch {
    return { error: "Unable to delete link. Please try again." };
  }
}
