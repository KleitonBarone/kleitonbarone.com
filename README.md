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

Built with React, TypeScript, Tailwind CSS, and the Sites scaffold’s Vinext/Vite runtime. No database, API keys, or external backend are needed. The first build downloads the Manrope font from Google Fonts.

## Update the content

- `app/profile.ts`: contact details and social links.
- `app/page.tsx`: portfolio sections and project descriptions.
- `app/resume/page.tsx`: redirect from the previous résumé page to the PDF.
- `app/globals.css`: typography, colors, and responsive layouts.
- `public/kleiton-barone.jpg`: the current public GitHub profile photo.
- `public/resume.pdf`: the unmodified LinkedIn PDF export, downloaded September 12, 2026. Replace this file after updating the LinkedIn profile to keep the download current.

The delivery interaction is an illustrative example running in the browser. Project previews are conceptual visuals, not screenshots of production systems. Experience and education come from the public GitHub profile; the contact email was confirmed by Kleiton. The résumé PDF includes the full employment and education details from LinkedIn.

This implementation does not change the existing domain or migrate the TabNews clone. Social preview URLs target the intended final domain, `kleitonbarone.com`, and become valid there after deployment.
