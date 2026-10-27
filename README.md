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
- `app/page.tsx`: the page sections and personal introduction.
- `app/projects.ts`: hosted demo URLs, source-code links, distinct engineering knowledge, and the illustrated scenarios.
- `app/project-showcase.tsx`: the three hosted apps and their screenshots.
- `app/engineering-stories.tsx`: the always-visible system gallery and motion controls.
- `app/system-scenes.tsx` and `app/system-scenes.css`: the four distinct animated illustrations.
- `app/resume/page.tsx`: redirect from the previous résumé page to the PDF.
- `app/globals.css` and `app/projects.css`: shared typography, colors, and the hosted-app layouts.
- `public/projects/`: screenshots copied from each project's own evidence. Replace them when those interfaces change.
- `public/kleiton-barone.jpg`: the current public GitHub profile photo.
- `public/resume.pdf`: the unmodified LinkedIn PDF export, downloaded September 12, 2026. Replace this file after updating the LinkedIn profile to keep the download current.

The three featured links open independently hosted browser demos with fictional data. Their source-code links include the full backend implementations. Screenshots come from the projects' local verification records. Each project lists distinct engineering knowledge rather than repeating its technology stack.

All four system illustrations remain visible in a responsive gallery and loop while in view. Visitors can send and retry an event, stop and recover a worker, create and approve an inventory repair, or adjust a rollout with a slider. Each interaction holds its result until another action or “Watch loop.” The slider keeps the same users selected as the rollout grows.

One pause control freezes motion and timed interactions; offscreen scenes and hidden tabs pause too. Reduced-motion visitors get immediate interaction results. Browsers without JavaScript see complete still illustrations and source links. The controls use native buttons and a keyboard-accessible range input. Everything runs locally in the browser, with no animation library or external service.

Motion references include [Inngest's visual durability primer](https://www.inngest.com/blog/durable-functions-a-visual-javascript-primer), [Svix's delivery illustrations](https://www.svix.com/), and [LaunchDarkly's feature-flag examples](https://launchdarkly.com/features/feature-flags/). The scene artwork is original HTML, CSS, and SVG.

Experience and education come from the public GitHub profile; the contact email was confirmed by Kleiton. The résumé PDF includes the full employment and education details from LinkedIn. Social preview metadata uses `https://kleitonbarone.com`.
