CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"shortCode" varchar(10) NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "links_shortCode_unique" UNIQUE("shortCode")
);
