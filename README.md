# Ahmed Messaad — Next.js portfolio + Git-backed admin

This is the portfolio converted from the supplied HTML design into Next.js App Router.

## What changed

- The public site is `/`.
- All editable portfolio content lives in `data.ts` at the repository root.
- `/admin` provides a password-protected editor.
- Saving from `/admin` uses the GitHub Contents API to commit the new `data.ts` to `ahmedmessaad/me`.
- A Vercel deployment connected to the repository will rebuild after the GitHub commit.
- The existing visual identity, animations, project content, publication section, and certificate link are preserved.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set these environment variables in `.env.local` and in Vercel:

```env
ADMIN_PASSWORD=use-a-long-random-password
ADMIN_SESSION_SECRET=use-a-different-long-random-secret
GITHUB_TOKEN=github_pat_...
GITHUB_OWNER=ahmedmessaad
GITHUB_REPO=me
GITHUB_BRANCH=main
GITHUB_DATA_PATH=data.ts
```

### GitHub token permissions

Create a fine-grained GitHub token with access to the `ahmedmessaad/me` repository and **Contents: Read and write** permission. Keep it server-side; never put it in `NEXT_PUBLIC_*` variables.

## Important architecture detail

The deployed `/admin` does not edit the Vercel filesystem. Vercel's runtime filesystem is not the source of truth. Instead, `/admin` commits `data.ts` directly to GitHub. Vercel then detects that commit and redeploys the site.

If you manually edit `data.ts`, those changes work normally too.

## Assets

`public/Ahmed_ISER_certificate.pdf` is included and the publication points to `/Ahmed_ISER_certificate.pdf`.

If you have a CV, put it at `public/resume.pdf` or change `hero.cvHref` in `data.ts`.
