<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Instructions for Link Shortener POC

These instructions guide AI assistants in maintaining consistency and quality when working on this Link Shortener Proof of Concept project.

## Quick Reference

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4 with shadcn/ui
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Clerk authentication
- **Deployment**: Vercel (recommended)

## Key Principles

1. **Type Safety**: Leverage TypeScript for all code
2. **Modern React**: Use React 19 features and hooks
3. **Accessibility**: Implement WCAG guidelines
4. **Performance**: Follow Next.js best practices
5. **Security**: Validate inputs and use secure patterns

## Documentation Structure

Detailed guidelines are organized in the `/docs` directory.
- `docs/authentication.md` — Clerk auth rules, protected `/dashboard`, homepage redirect, and modal sign-in/up.
- `docs/ui-components.md` — UI component usage rules, mandatory use of Shadcn UI.

**It is INCREDBLY IMPORTANT to ALWAYS read the relevant individual instructions files within the `/docs` directory BEFORE generating ANY code.**

## Development Workflow

1. **Read relevant docs** before making changes
2. **Follow established patterns** from existing code
3. **Run linting** with `npm run lint`
4. **Test builds** with `npm run build`
5. **Validate database** with Drizzle migrations

## Common Tasks

- **Adding components**: Use shadcn/ui patterns
- **Database changes**: Update schema.ts and run migrations
- **API routes**: Use Next.js App Router API conventions
- **Styling**: Follow Tailwind utility classes
- **Authentication**: Integrate with Clerk hooks/components

## Quality Checks

- ✅ TypeScript compilation passes
- ✅ ESLint rules satisfied
- ✅ Database schema valid
- ✅ Components accessible
- ✅ Responsive design implemented
- ✅ Authentication flows secure

Remember: This is a learning POC, so prioritize clean, maintainable code over complex optimizations.
