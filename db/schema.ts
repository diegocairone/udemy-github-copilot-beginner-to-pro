import { pgTable, integer, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  url: text().notNull(),
  shortCode: varchar({ length: 10 }).unique().notNull(),
  userId: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull(),
});