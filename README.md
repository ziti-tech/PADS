# People Action Development Society (PADS)

A responsive multi-page NGO website for People Action Development Society. The site presents PADS programs, community stories, leadership, volunteering opportunities and donation options through a modern green-and-gold visual system.

## Features

- Responsive desktop, tablet and mobile layouts
- Mobile accordion navigation with collapsible submenus
- Rotating homepage hero
- Animated impact counters
- Program and education detail pages
- Filterable gallery with image lightbox
- Leadership profiles with individual portraits
- Contact, volunteer, newsletter and donation form interfaces
- Form validation and demonstration success states
- Reduced-motion, touch-target and safe-area support
- Locally stored, content-specific NGO imagery

## Technology

- React
- Vite
- Lucide React icons
- Playwright for responsive layout testing
- Plain CSS with custom responsive breakpoints

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will normally be available at `http://localhost:5173`.

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Main Routes

### About

- `/where-we-work/`
- `/leadership/`
- `/accountability/`
- `/in-the-media/`
- `/newsletter/`
- `/tribute/`

### Programs

- `/st-patricks-academy/`
- `/little-flower-school/`
- `/literacy-project/`
- `/sponsorship/`
- `/community-health/`
- `/women-empowerment/`
- `/outreach/`
- `/vocational-training/`
- `/drinking-water/`

### Get Involved

- `/volunteer/`
- `/legacy-gift/`
- `/donating-methods/`
- `/make-your-contribution/`
- `/contact-us/`
- `/gallery/`

Unknown routes use a reusable informational-page layout rather than returning an empty screen.

## Responsive Testing

The automated audit checks the homepage and critical inner pages for horizontal overflow, mobile navigation behavior and submenu accordion behavior.

Run it while the development server is active:

```bash
node scripts/responsive-audit.mjs
```

The current viewport matrix includes:

- 320px and 390px phones
- 768px and 1024px tablets
- 1110px small laptops
- 1180px and 1366px desktops
- 1920px wide displays

Screenshots from the audit are written to `/tmp/pads-responsive`.

## Project Structure

```text
PADS/
├── public/images/              # Local website imagery
├── scripts/responsive-audit.mjs
├── src/main.jsx                # Header, homepage and footer
├── src/pages.jsx               # Inner pages and route selection
├── src/styles.css              # Site-wide and responsive styles
├── index.html
└── package.json
```

## Images

Website images are stored locally in `public/images`. They were created for this project in a natural NGO documentary style and are assigned according to page content such as education, healthcare, clean water, volunteering, livelihoods, media and leadership.

## Integrations Still Required

The forms currently provide client-side validation and demonstration confirmation states. Production use requires connecting:

- A payment provider such as Stripe or PayPal
- An email or form-delivery service
- A newsletter platform
- A CMS or backend if non-technical content editing is required

Never place private API keys directly in the React source. Use environment variables and a secure server-side endpoint.

## Organization

People Action Development Society is presented as a community-focused NGO working in education, healthcare, livelihoods, clean water and social development.
