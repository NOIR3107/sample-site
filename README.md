# Meridian Climate

A demo marketing site for a fictional heating and cooling company in Portland,
Oregon. Light, photo-led and conversion-focused, modelled on what the
best-performing HVAC sites do (Quilt, Aira, Jetson, and top local contractors):
a clear promise with a rating beside the booking button, three ways in by
intent, financing and a membership plan, reviews, a service-area map and a
booking form on every "Get a free estimate" button.

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion,
three.js via React Three Fiber.

> **Sample content.** The reviews, rating, statistics, prices, financing terms
> and service towns are placeholders, all in the `sample` export of
> `content/home.ts`. Replace them with real, verifiable figures before the site
> represents an actual business. Invented reviews on a real company's site are
> deceptive advertising (in the US, the FTC's fake-review rule applies).

---

## Run it locally

Node 20.9 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

Production check:

```bash
npm run build
```

```bash
npm start
```

---

## Deploy

Push the repository to GitHub (or GitLab / Bitbucket) first. Both hosts
build straight from the repo, and every later push redeploys automatically.

### Vercel

1. vercel.com > **Add New... > Project** > import the repository.
2. Leave the detected settings as they are (Framework: Next.js, build
   command `npm run build`).
3. Optional: add the environment variables below.
4. **Deploy**.

### Netlify

1. app.netlify.com > **Add new site > Import an existing project** > pick the
   repository.
2. `netlify.toml` already sets the build command, publish directory and Node
   version; Netlify applies its Next.js runtime automatically.
3. Optional: add the environment variables below.
4. **Deploy site**.

### Environment variables (both optional)

| Name | What it does |
|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | Where the booking form posts (Formspree, Web3Forms, Basin, or your own API). Without it, submitting opens the visitor's email app with the request filled in. |
| `NEXT_PUBLIC_SITE_URL` | Your real domain, e.g. `https://www.yourcompany.com`. Used for canonical links, social previews, the sitemap and robots.txt. Without it, the Vercel or Netlify production URL is used. |

See `.env.example`.

---

## Editing the site

Copy lives in `content/`, not in components.

| File | What is in it |
|---|---|
| `content/site.ts` | Company name, phone, email, address, hours, offer bar, navigation |
| `content/home.ts` | Every homepage section, plus the `sample` block (reviews, rating, stats, prices, towns) |
| `content/services.ts` | The six service pages |
| `content/projects.ts` | Case studies and their photographs |
| `content/pages.ts`, `content/about.ts`, `content/blog.ts`, `content/legal.ts` | Inner pages |
| `app/globals.css` | Colour, type and spacing tokens |

The phone number `(503) 555-0148` is in the 555-01xx range reserved for
fiction; replace it in `content/site.ts`.

Photographs load from `images.unsplash.com` (free Unsplash licence) through
the Next.js image optimizer. Fonts are bundled locally (`geist` package and
`app/fonts/`), so builds never depend on reaching Google Fonts.

---

## How it is built

- **Homepage sections** live in `components/home/`, one file each, assembled
  in `app/page.tsx` in the order a customer decides.
- **The 3D house** (`components/scenes/house-scene.tsx`) is an isometric
  cutaway drawn with three.js primitives. Scroll progress balances each room's
  temperature and airflow. It is lazy-loaded and only renders while on screen.
- **Booking**: any element with `data-book` opens the booking dialog
  (`components/booking/`) and still links to `/contact/#book` without
  JavaScript. `data-book="Repair"` and similar preselect the request type.
- **Motion** uses Motion (`motion/react`) through a shared set of reveal
  effects in `components/motion/fx.tsx`. Everything respects
  `prefers-reduced-motion`.
- **Phones** get a docked Call / Free estimate bar and a bottom-sheet booking
  form.
