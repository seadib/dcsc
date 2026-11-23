# 🔬 Dhaka College Science Club (DCSC) Official Web Platform

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Sanity Studio](https://img.shields.io/badge/Sanity-Studio_v3-F03E2F?style=flat&logo=sanity)](https://www.sanity.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

The official web platform and zero-code content management architecture for **Dhaka College Science Club (DCSC)** — established in 1996, one of the oldest and most prestigious collegiate science clubs in Bangladesh.

---

## 🌐 Live Deployments & Dashboards

| Service | Description | Live URL |
| :--- | :--- | :--- |
| **Live Website** | Official hosted club website on GitHub Pages | [https://seadib.github.io/dcsc](https://seadib.github.io/dcsc) |
| **Admin Dashboard (Sanity Studio)** | Zero-code cloud CMS for managing all website content | [https://dcsc.sanity.studio](https://dcsc.sanity.studio) |
| **GitHub Repository** | Source code, version history, and release tags | [https://github.com/seadib/dcsc](https://github.com/seadib/dcsc) |


---

## 🚀 Key Features

### 🛠️ 1. Zero-Code Sanity Studio Admin Panel
- **Page Builder**: Reorder, add, or toggle homepage sections via drag-and-drop.
- **Executive Committee**: Manage current and past executive batches, member designations, avatars, social links, and biography popups.
- **Honorable Moderators & Mentors**: Manage teacher profiles with administrative pause/resume visibility switches.
- **Events & Science Fests**: Publish upcoming and past festivals with direct Facebook event integration.
- **Wednesday Wonders & News**: Publish science digests, announcements, and articles.
- **Club Achievements**: Record national Olympiad titles, science expo trophies, and project awards.
- **Photo Gallery & Albums**: Multi-photo albums with automated alt tags and CDN image optimization.
- **Digital Wall Magazine**: Interactive archives of publications and infographics.

### ⚡ 2. Next.js 16 High-Performance Frontend
- **App Router & Server-Side Rendering (SSR)** for near-instant page loads.
- **Incremental Static Regeneration (ISR)** for high-speed delivery with real-time freshness.
- **Tailwind CSS v4 & Lucide Icons** delivering an ultra-modern dark-themed aesthetic.
- **Interactive Sci-Lab Hub** featuring chemistry, gravity, atom simulations, and Olympiad quizzes.
- **Automated Dynamic SEO & OpenGraph** generator for social media previews.

---

## 📁 Repository Structure

```text
dcsc/
├── studio/                     # Standalone Sanity Studio v3 CMS
│   ├── schemaTypes/            # Content models & schemas
│   │   ├── documents/          # batch, committeeMember, event, post, achievement, etc.
│   │   ├── objects/            # seo, pageBuilder blocks
│   │   └── singletons/         # homePage, siteSettings
│   ├── sanity.config.ts        # Studio workspace configuration
│   └── sanity.cli.ts           # Studio deployment settings (dcsc.sanity.studio)
│
├── web/                        # Next.js 16 App Router Frontend
│   ├── src/
│   │   ├── app/                # Route segments (/events, /committee, /gallery, etc.)
│   │   ├── components/         # PageBuilder blocks, Navigation, Modals, Footer
│   │   └── lib/                # Sanity client, Image URL builder, SEO utilities
│   └── public/                 # Static assets, fallback logos, audio
│
├── CHANGELOG.md                # Standardized version release history
├── DEVELOPMENT_LOG.md          # Comprehensive issue resolution and engineering log
└── README.md                   # Project documentation
```

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 20+ installed
- npm or pnpm

### 1. Run Next.js Frontend
```bash
cd web
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run Sanity Studio Locally
```bash
cd studio
npm install
npm run dev
```
Open [http://localhost:3333](http://localhost:3333) in your browser (or use the cloud version at [dcsc.sanity.studio](https://dcsc.sanity.studio)).

---

## 🏷️ Release Versioning

- **`v1.0.0`**: Legacy static HTML/CSS/JS website.
- **`v2.0.0`**: Modern Next.js 16 App Router + Cloud-Deployed Sanity Studio v3 Architecture.

For complete release details and engineering logs, refer to [CHANGELOG.md](file:///X:/CHANGELOG.md) and [DEVELOPMENT_LOG.md](file:///X:/DEVELOPMENT_LOG.md).

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
