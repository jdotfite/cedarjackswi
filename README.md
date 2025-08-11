# Cedar Jacks WI Website

Next.js + Storyblok powered bar website.

## Tech Stack
- Next.js 15 (App Router)
- Storyblok (headless CMS)
- Tailwind CSS
- Web3Forms (form handling)

## Environment Variables
Copy `.env.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=...
STORYBLOK_API_REGION=eu
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATION_SECRET= (optional for future)
```
All NEXT_PUBLIC_ prefixed vars are exposed to the browser.

## Local Development
```
npm install
npm run dev
# or HTTPS preview (if needed for Storyblok bridge)
npm run dev:https
```
Visit http://localhost:3000 or https://localhost:3010

## Storyblok Preview
Set preview URL in Storyblok space settings to your dev or Vercel domain (e.g. https://cedarjackswi.vercel.app/). Draft vs published handled by `version` param in fetch.

## Forms (Web3Forms)
Reservation form posts directly to Web3Forms API. Ensure `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is set. No server code required.

## Deployment (Vercel Recommended)
1. Push repo to GitHub
2. Import project in Vercel
3. Add environment variables (Production + Preview)
4. Deploy
5. Add custom domain in Vercel and point DNS (A / CNAME records) from DreamHost
6. (Optional) Create a Deploy Hook in Vercel and add it as a webhook in Storyblok for auto rebuilds

## Alternative: Static Export (Not recommended for frequent content changes)
If you set `output: 'export'` you lose real-time CMS updates until rebuild. Current setup uses dynamic fetching.

## Security Notes
- Do not commit real access keys
- Web3Forms key was sanitized; rotate if previously exposed
- Missing tokens surface console errors in dev

## Testing Web3Forms
Edit `test-web3forms.js` and uncomment the call ONLY in local development.

## Future Improvements
- Add on-demand revalidation endpoint
- Implement sitemap generation
- Add OG / SEO metadata generation using Storyblok fields

---
Original Next.js scaffold instructions below:

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
