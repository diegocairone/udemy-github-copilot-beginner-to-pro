"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createUserLink } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().min(1).transform((value) => value.trim()).refine((value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }, {
    message: "Invalid URL",
  }),
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
