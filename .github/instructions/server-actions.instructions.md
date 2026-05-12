---
description: Read this before implementing or modifying server actions in the project
---

# Server Actions Instructions

All data mutations in this app must be performed via server actions. Server actions must be called from client components.

## File Naming and Location
- Server action files **MUST** be named `action.ts`.
- Place `action.ts` files in the same directory as the component that calls the server action.

## Data Handling
- All data passed to server actions must use appropriate TypeScript types (do **NOT** use the `FormData` TypeScript type).
- Validate all data in server actions using Zod.

## Authentication
- All server actions **MUST** check for a logged-in user before proceeding with database operations.

## Error Handling
- Server actions should not throw any errors.
- Instead, return an object with an `error` or `success` property.

## Database Operations
- Perform database operations via helper functions that wrap Drizzle queries.
- Helper functions are located in the `/data` directory.
- Server actions **MUST NOT** directly use Drizzle queries.