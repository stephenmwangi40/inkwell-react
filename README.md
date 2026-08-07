# Inkwell & Co. — React + Tailwind

Converted from the original static prototype with proper structure.

## Highlights

- **Real routes** (not hash links): `/process`, `/services`, `/pricing`, `/faq`, `/privacy`, `/terms`
- **Home** uses shared layout + section content
- **Phone mode** matches write.zip: bottom nav, menu sheet, search-only topbar, full-width CTAs
- **Writer desk** includes Chart.js **earnings line chart** + **work-mix doughnut**
- **Dark sidebar** on desktop; **Uber-style bottom nav** on phones (≤640px)
- Privacy & Terms placeholder pages (“to be updated”)

## Setup

```bash
npm install
npm run dev
```

If `npm install` fails on Windows with “Exit handler never called”:

```bash
npm cache clean --force
rmdir /s /q node_modules
del package-lock.json
npm install
```

Use **Node 18 or 20 LTS**.

## Demo accounts

| Role | Login |
|------|--------|
| Customer | `amara@brightleaf.co` / `demo1234` |
| Writer | `admin` / `writer123` |

## Structure

```
src/
  components/
    ui/Button.jsx
    layout/Header.jsx, Footer.jsx, MarketingLayout.jsx
    dashboard/DashboardShell.jsx, Charts.jsx
  pages/
    Home.jsx, Login.jsx, Signup.jsx, …
    marketing/  Services, Process, Writers, Pricing, FAQ, Privacy, Terms
    customer/CustomerDashboard.jsx
    writer/WriterDashboard.jsx
  context/AppContext.jsx
  lib/db.js
```
