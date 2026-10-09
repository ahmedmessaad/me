# messaad.cc.cd

Next.js portfolio. All content lives in `data/site.ts`.

## Admin
`/admin` is password protected. Saving commits `data/site.ts` to GitHub through the Contents API, and Vercel redeploys on the new commit.

Set these in Vercel (Project Settings > Environment Variables):

| Name | Value |
| --- | --- |
| ADMIN_PASSWORD | a long passphrase |
| SESSION_SECRET (or ADMIN_SESSION_SECRET) | `openssl rand -hex 32` |
| GITHUB_TOKEN | fine-grained token, this repo only, Contents: read and write |
| GITHUB_REPO | `ahmedmessaad/me`, or just `me` with GITHUB_OWNER set |
| GITHUB_BRANCH | `main` |

## Search Console
Put the token from the HTML-tag method into `meta.googleVerification` in `data/site.ts` (or through the admin), then submit `/sitemap.xml`.

## Local
`npm install && npm run dev`, with the variables above in `.env.local`.
