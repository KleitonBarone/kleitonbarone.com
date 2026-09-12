# kleitonbarone.com

Kleiton Barone’s personal portfolio, with selected projects, a background summary, contact links, and a downloadable LinkedIn résumé PDF.

## Run locally

Requires Node.js 22.13+ and pnpm 11.23.

```sh
pnpm install
pnpm dev --port 5187
```

Open http://localhost:5187. Résumé links download `/resume.pdf`; the previous `/resume` address also redirects to that file. LinkedIn links open the profile separately.

```sh
pnpm typecheck
pnpm lint
pnpm build
```

Built with Next.js, React, TypeScript, and Tailwind CSS. No database, API keys, or external backend are needed. The first build downloads the Manrope font from Google Fonts.

## Deploy to Vercel

Import this GitHub repository into Vercel and use the Next.js framework preset. Keep the default install command, build command, and output directory. Set `ENABLE_EXPERIMENTAL_COREPACK=1` in the Vercel project so it uses the pnpm version pinned in `package.json`, as described in [Vercel's build documentation](https://vercel.com/docs/builds/configure-a-build#corepack).

The app needs no runtime environment variables or custom `vercel.json`. Connect `kleitonbarone.com` when ready to replace the existing site.

## Update the content

- `app/profile.ts`: contact details and social links.
- `app/page.tsx`: portfolio sections and project descriptions.
- `app/resume/page.tsx`: redirect from the previous résumé page to the PDF.
- `app/globals.css`: typography, colors, and responsive layouts.
- `public/kleiton-barone.jpg`: the current public GitHub profile photo.
- `public/resume.pdf`: the unmodified LinkedIn PDF export, downloaded September 12, 2026. Replace this file after updating the LinkedIn profile to keep the download current.

The delivery interaction is an illustrative example running in the browser. Project previews are conceptual visuals, not screenshots of production systems. Experience and education come from the public GitHub profile; the contact email was confirmed by Kleiton. The résumé PDF includes the full employment and education details from LinkedIn.

This implementation does not change the existing domain or migrate the TabNews clone. Social preview URLs target the intended final domain, `kleitonbarone.com`, and become valid there after deployment.
