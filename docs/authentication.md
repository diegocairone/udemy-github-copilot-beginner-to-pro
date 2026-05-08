# Authentication Guidelines

All authentication in this app is handled by Clerk. Do not add or use any other auth methods.

## Protected routes

- `/dashboard` must be protected.
- If a user is not logged in, they must not be able to access `/dashboard`.
- Protect the page using Clerk server-side auth helpers or server components in the App Router.

## Homepage redirect

- If a user is already authenticated and tries to access `/`, redirect them to `/dashboard`.
- The homepage should not be used as the landing page for logged-in users.

## Sign in / Sign up behavior

- Sign in and sign up flows must always open as Clerk modals.
- Use Clerk-provided modal components or buttons configured for modal display.

## Implementation notes

- Prefer Clerk hooks/components like `currentUser()` and modal-launch helpers.
- Avoid building custom login forms or using any non-Clerk auth provider.
- Keep auth logic centralized and consistent across pages.
