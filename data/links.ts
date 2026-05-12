import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

const SHORT_CODE_LENGTH = 7;
const SHORT_CODE_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateShortCode() {
  const bytes = randomBytes(SHORT_CODE_LENGTH);
  return Array.from(bytes)
    .map((byte) => SHORT_CODE_CHARS[byte % SHORT_CODE_CHARS.length])
    .join("");
}

async function generateUniqueShortCode() {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const shortCode = generateShortCode();
    const existing = await db.select().from(links).where(eq(links.shortCode, shortCode));
    if (existing.length === 0) {
      return shortCode;
    }
  }

  return generateShortCode();
}

export async function getUserLinks(userId: string) {
  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(links.createdAt);

  return userLinks;
}

export async function createUserLink(userId: string, url: string) {
  const shortCode = await generateUniqueShortCode();
  const [createdLink] = await db
    .insert(links)
    .values({ url, shortCode, userId })
    .returning();

  return createdLink;
}

export async function updateUserLink(id: number, url: string) {
  const [updatedLink] = await db
    .update(links)
    .set({ url })
    .where(eq(links.id, id))
    .returning();

  return updatedLink;
}

export async function deleteUserLink(id: number) {
  return db.delete(links).where(eq(links.id, id));
}
