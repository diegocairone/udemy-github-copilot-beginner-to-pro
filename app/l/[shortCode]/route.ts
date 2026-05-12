import { NextResponse } from "next/server";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: { shortCode: string } }
) {
  const shortCode = params.shortCode;
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode));

  if (!link) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.redirect(link.url);
}
