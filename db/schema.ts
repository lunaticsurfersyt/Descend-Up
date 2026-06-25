import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),

  email: text().notNull().unique(),
  name: text(),
  image: text(),
  googleId: text().unique(),

  plan: text().notNull().default("free"),
  stripeCustomerId: text().unique(),

  youtubeChannelId: text(),
  youtubeChannelTitle: text(),
  youtubeChannelThumbnail: text(),

  googleAccessToken: text(),
  googleRefreshToken: text(),
  googleTokenExpiresAt: timestamp(),

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
