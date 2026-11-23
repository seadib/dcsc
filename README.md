<p align="center">
  <a href="https://seadib.github.io/dcsc">
    <img src="image/logo.png" alt="Dhaka College Science Club Logo" width="130" height="130">
  </a>
</p>

<h1 align="center">Dhaka College Science Club (DCSC)</h1>

<p align="center">
  <em>Spreading the knowledge of science to the utmost since 1996</em>
</p>

<p align="center">
  <a href="https://seadib.github.io/dcsc"><img src="https://img.shields.io/badge/Website-Live_Online-00F2FE?style=flat-square&logo=google-chrome&logoColor=white" alt="Live Website"></a>
  <a href="https://dcsc.sanity.studio"><img src="https://img.shields.io/badge/Admin_Studio-CMS_Live-F03E2F?style=flat-square&logo=sanity&logoColor=white" alt="Admin Studio"></a>
  <a href="https://github.com/seadib/dcsc"><img src="https://img.shields.io/badge/Repository-GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub Repository"></a>
  <a href="#-terms-of-use--copyright"><img src="https://img.shields.io/badge/License-Proprietary-red?style=flat-square" alt="Proprietary License"></a>
  <img src="https://img.shields.io/badge/Framework-Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/Styling-Tailwind_CSS-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

<p align="center">
  <strong>#ForClubAndCountry</strong> 🇧🇩
</p>

---

### 🔗 Live Links:
- 🌐 **Live Website**: https://seadib.github.io/dcsc
- 🛠️ **Admin Dashboard**: https://dcsc.sanity.studio
- 💻 **Repository**: https://github.com/seadib/dcsc

---

## 📖 About DCSC

**Dhaka College Science Club (DCSC)** is one of the premier collegiate science organizations in Bangladesh, established in **1996**. Over nearly three decades of heritage, DCSC has inspired thousands of students, fostering scientific curiosity, competitive Olympiad excellence, research ethics, and technological innovation.

This official monorepo powers DCSC's next-generation digital ecosystem — combining a **Next.js 16 App Router** frontend, a cloud-hosted **Sanity Studio v3** zero-code Content Management System, and an interactive virtual **Sci-Lab** suite.

---

## 🚀 System Architecture

```text
                                  ┌───────────────────────────────┐
                                  │      Official Domain          │
                                  │   seadib.github.io/dcsc       │
                                  └──────────────┬────────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
    ┌─────────────────────────────┐                             ┌─────────────────────────────┐
    │     Modern Web Client       │                             │     Sanity Studio v3 CMS    │
    │  • Next.js 16 (App Router)  │◄────── Realtime GROQ API ───┤  • Cloud: dcsc.sanity.studio│
    │  • Tailwind CSS v4          │                             │  • Zero-Code Administration │
    │  • React Server Components  │                             │  • Live Visual Page Builder │
    │  • Automated SEO & OpenGraph│                             │  • High-Res CDN Asset Engine│
    └──────────────┬──────────────┘                             └─────────────────────────────┘
                   │
                   ▼
    ┌─────────────────────────────┐
    │    Interactive Sci-Lab      │
    │  • Chemistry Reactions      │
    │  • Orbital Gravity Physics  │
    │  • Atom Builder & Quizzes   │
    └─────────────────────────────┘
```

---

## ✨ Key Platform Features

| Feature | Description | Status |
| :--- | :--- | :---: |
| 🎨 **Dynamic Page Builder** | Reorder, curate, and toggle hero banners, statistics, events, posts, and CTA sections directly from Sanity Studio without touching code. | ✅ Live |
| 👥 **Committee Management** | Comprehensive batch directory featuring member bios, portraits, designations, and social handles, with collapsible past batch archives. | ✅ Live |
| 🎓 **Faculty & Mentors Panel** | Profiles of honorable teacher moderators with one-click administrative pause/resume visibility controls. | ✅ Live |
| 🏆 **Olympiad Trophies Showcase** | Dedicated showcase celebrating national/international Math, Physics, and Earth Olympiad champions and project awards. | ✅ Live |
| 🖼️ **Curated Photo Gallery** | Multi-album photo collections (Olympiad Hunt, Annual Grand Iftar, Science Festivals) with automated Alt-text and CDN acceleration. | ✅ Live |
| 📰 **Digital Wall Magazine** | Digital archive containing 25+ volumes of "Wednesday Wonders" infographics, research articles, and student publications. | ✅ Live |
| 🔬 **Virtual Sci-Lab Hub** | Browser-based interactive simulation canvases for mixing chemical reagents, orbital mechanics, atomic structure, and timed quizzes. | ✅ Live |
| 🔍 **Automated Dynamic SEO** | Server-side metadata, OpenGraph social sharing banners, dynamic sitemap, and robots.txt generation. | ✅ Live |

---

## 📁 Monorepo Structure

```text
dcsc/
├── .agents/skills/             # 🤖 Workspace automation skills
│   └── git-release-manager/    # Automated semantic versioning and release publisher
├── image/                      # 🖼️ High-resolution club media assets and logos
├── studio/                     # 🛠️ Standalone Sanity Studio v3 CMS
│   ├── schemaTypes/            # Document and singleton schemas
│   │   ├── documents/          # batch, committeeMember, event, post, achievement, etc.
│   │   ├── objects/            # PageBuilder blocks, SEO object definitions
│   │   └── singletons/         # homePage, siteSettings
│   ├── sanity.config.ts        # Studio workspace configuration
│   └── sanity.cli.ts           # Sanity CLI & cloud hosting configuration
├── web/                        # ⚡ Modern Next.js 16 App Router Frontend
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── app/                # Next.js App Router (/events, /committee, /gallery, etc.)
│   │   ├── components/         # Page builder, navigation, modals, member cards
│   │   └── lib/                # Sanity client, image URL builder, SEO utilities
├── achievements.html           # 🏛️ Legacy static accolades page
├── committee.html              # Legacy static committee page
├── events.html                 # Legacy static events page
├── gallery.html                # Legacy static gallery page
├── index.html                  # Legacy static landing page
├── scilab.html                 # 🔬 Interactive virtual science lab hub
├── wall-magazine.html          # Legacy wall magazine collection
├── AGENTS.md                   # 📜 Agent development & release policies
├── CHANGELOG.md                # 📝 Version-by-version release changelog
├── LICENSE                     # 🔒 Terms of use and ownership notice
└── README.md                   # 📖 Complete platform documentation
```

---

## 🛠️ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Git](https://git-scm.com/)

### 1. Web Application (Next.js 16)
```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Run the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the client application.

### 2. Admin CMS (Sanity Studio v3)
```bash
# Navigate to studio directory
cd studio

# Install dependencies
npm install

# Run the studio locally
npm run dev
```
Open [http://localhost:3333](http://localhost:3333) to access local Sanity Studio, or use the cloud dashboard at [https://dcsc.sanity.studio](https://dcsc.sanity.studio).

---

## 🔒 Terms of Use & Copyright

© 2026 Abdullah Al Adib (seadib) & Dhaka College Science Club (DCSC). All rights reserved.

This platform, codebase, and design architecture are developed and administered by Abdullah Al Adib for official Dhaka College Science Club (DCSC) activities. Club members, executives, and authorized contributors are fully welcome to use and collaborate on this project for club operations. External unauthorized parties unaffiliated with DCSC may not copy, clone, or redistribute this work without prior permission.

For permissions, collaborations, or inquiries:
- ✉️ **Admin Contact**: `drseadib@gmail.com`
- 🌐 **Official Website**: [seadib.github.io/dcsc](https://seadib.github.io/dcsc)
- 🔒 **Full Terms**: [LICENSE](LICENSE)

---

## 👨‍💻 Engineering & Credits

<p align="center">
  <strong>Platform designed, engineered, and maintained by</strong>
</p>

<h3 align="center">
  <a href="https://adi.pro.bd/">Abdullah Al Adib</a>
</h3>
<p align="center">
  <em>Lead Developer &amp; Technical Contributor • Dhaka College Science Club</em>
</p>

<p align="center">
  <a href="https://github.com/seadib"><img src="https://img.shields.io/badge/GitHub-seadib-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub Profile"></a>
  <a href="https://adi.pro.bd/"><img src="https://img.shields.io/badge/Portfolio-adi.pro.bd-00F2FE?style=flat-square" alt="Portfolio"></a>
  <a href="mailto:drseadib@gmail.com"><img src="https://img.shields.io/badge/Email-drseadib@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email"></a>
</p>

<br>

<p align="center">
  <strong>Dhaka College Science Club (DCSC)</strong><br>
  <em>Est. 1996 • Mirpur Road, Dhanmondi, Dhaka-1205, Bangladesh</em><br>
  <em>Spreading the knowledge of science to the utmost</em><br><br>
  <strong>#ForClubAndCountry</strong> 🇧🇩
</p>
