<div align="center">

<img src="image/logo.png" alt="DCSC Logo" width="140">

# 🔬 Dhaka College Science Club (DCSC)

### *Spreading the knowledge of science to the utmost since 1996*

[![Website](https://img.shields.io/badge/🌐_Website-Live-00F2FE?style=for-the-badge)](https://seadib.github.io/dcsc)
[![Admin Studio](https://img.shields.io/badge/🛠️_Admin_Studio-Live-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)](https://dcsc.sanity.studio)
[![Repository](https://img.shields.io/badge/💻_Repository-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seadib/dcsc)
[![License: Proprietary](https://img.shields.io/badge/🔒_License-Proprietary-red?style=for-the-badge)](#-copyright--proprietary-notice)

**#ForClubAndCountry** 🇧🇩

</div>

---

### 🔗 Live Links:
- 🌐 **Live Website**: https://seadib.github.io/dcsc
- 🛠️ **Admin Dashboard**: https://dcsc.sanity.studio
- 💻 **Repository**: https://github.com/seadib/dcsc

---

## 📖 About DCSC

**Dhaka College Science Club (DCSC)** is one of the oldest and most prestigious collegiate science organizations in Bangladesh, established in **1996**. Over three decades of excellence, DCSC has nurtured generations of scientists, researchers, Olympiad champions, and innovators.

This repository powers the entire official digital ecosystem of DCSC — integrating a **Next.js 16 App Router** frontend, a cloud-deployed **Sanity Studio v3** zero-code Content Management System, and the legacy interactive static web assets.

---

## 🚀 Modern Architecture & Key Capabilities

<div align="center">

| Module | Framework / Platform | Status & Live Access |
| :--- | :--- | :--- |
| **Public Frontend** | Next.js 16, React 19, Tailwind CSS v4, TypeScript | 🌐 [seadib.github.io/dcsc](https://seadib.github.io/dcsc) |
| **Admin Dashboard** | Sanity Studio v3 (Fluid Cloud Hosting) | 🛠️ [dcsc.sanity.studio](https://dcsc.sanity.studio) |
| **Interactive Sci-Lab** | HTML5 Physics & Chemistry Simulation Canvases | 🔬 [Interactive Hub](https://seadib.github.io/dcsc/scilab.html) |
| **Source Repository** | GitHub Releases, Semantic Tags, Asset Tracking | 💻 [seadib/dcsc](https://github.com/seadib/dcsc) |

</div>

### ✨ Highlights

- 🎨 **Dynamic Drag-and-Drop Page Builder**: Reorder, toggle, and curate homepage hero banners, stats counters, events, posts, committee highlights, and CTA blocks directly from Sanity Studio.
- 👥 **Executive Committee & Historical Archives**: Full interactive view for current batch (2025-26) with biography modal popups, plus archived collapsible views with carousel sliders for past batches.
- 🎓 **Honorable Moderators & Mentors Panel**: Administrative control to manage teacher profiles with pause/resume visibility switches.
- 🏆 **National Olympiad & Accolades Showcase**: Dedicated showcase for awards won at national Math, Physics, Earth Olympiads, and Science Fests.
- 🖼️ **Curated Photo Gallery & Albums**: Multi-image albums (Olympiad Hunt 4.0, Grand Iftar, Intra Fest) with automated Alt-text generation and Sanity CDN image optimization.
- 📰 **Digital Wall Magazine & Wednesday Wonders**: High-resolution archive of 25+ scientific infographic issues and research articles.
- ⚡ **Automated Dynamic SEO & OpenGraph**: Instant metadata and social card generation across all routes.
- 🌙 **Modern Dark Aesthetic**: Deep obsidian palette (`#080C14`), vibrant cyan accents (`#00F2FE`), and responsive typography (Orbitron, Space Grotesk, Plus Jakarta Sans).

---

## 📁 Repository Structure

```text
dcsc/
├── .agents/skills/             # 🤖 Workspace Automation Skills
│   └── git-release-manager/    # Automated semantic tagging & GitHub Releases
├── image/                      # 🖼️ High-resolution club media assets & logos
├── studio/                     # 🛠️ Standalone Sanity Studio v3 CMS
│   ├── schemaTypes/            # Content schemas (singletons, documents, pageBuilder)
│   ├── sanity.config.ts        # Studio workspace configuration
│   └── sanity.cli.ts           # Sanity CLI & cloud hosting config
├── web/                        # ⚡ Modern Next.js 16 App Router Frontend
│   ├── src/
│   │   ├── app/                # Route segments (/events, /committee, /gallery, etc.)
│   │   ├── components/         # Page builder, navbar, modals, cards
│   │   └── lib/                # Sanity client, image URL builder, SEO helpers
├── index.html                  # 🏛️ Original legacy static web experience
├── achievements.html           # Static accolades mirror
├── committee.html              # Static committee mirror
├── events.html                 # Static events mirror
├── gallery.html                # Static gallery mirror
├── scilab.html                 # 🔬 Interactive virtual science labs
├── wall-magazine.html          # 📰 Wall magazine infographics
├── AGENTS.md                   # 📜 Agent development & release policies
├── CHANGELOG.md                # 📝 Version-by-version release history
├── LICENSE                     # 🔒 Official proprietary license terms
└── README.md                   # 📖 Project documentation
```

---

## 🛠️ Local Development

### 1. Web Frontend (Next.js)
```bash
cd web
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Next.js application.

### 2. Admin CMS (Sanity Studio)
```bash
cd studio
npm install
npm run dev
```
Open [http://localhost:3333](http://localhost:3333) for local development, or use the cloud version directly at [https://dcsc.sanity.studio](https://dcsc.sanity.studio).

---

## 🏷️ Release Versioning

| Tag | Date | Milestone Description |
| :--- | :--- | :--- |
| **`v2.1.5`** | 2026-11-23 | Formal Proprietary LICENSE file & full copyright enforcement |
| **`v2.1.2`** | 2026-11-23 | Standardized Live Links specification across all documentation |
| **`v2.1.0`** | 2026-11-23 | Complete content & asset synchronization (Trophies, Wall Magazines, Albums) |
| **`v2.0.1`** | 2026-11-23 | Cloud deployment of Sanity Studio at `dcsc.sanity.studio` |
| **`v2.0.0`** | 2026-11-23 | Next.js 16 App Router & Sanity Studio v3 monorepo architecture |
| **`v1.0.0`** | 2026-11-08 | Original legacy static website (HTML5, CSS3, Vanilla JS, Sci-Lab) |

---

## 🔒 Copyright & Terms of Use

© 2026 Abdullah Al Adib (seadib) & Dhaka College Science Club (DCSC). All rights reserved.

This platform, codebase, and design architecture are developed and administered by Abdullah Al Adib for official Dhaka College Science Club (DCSC) activities. Club members, executives, and authorized contributors are fully welcome to use and collaborate on this project for club operations. External unauthorized parties unaffiliated with DCSC may not copy, clone, or redistribute this work without prior permission.

For permissions or inquiries, contact:
- ✉️ Email: `drseadib@gmail.com`
- 🌐 Website: [seadib.github.io/dcsc](https://seadib.github.io/dcsc)
- 🔒 Full Legal Terms: [LICENSE](LICENSE)



---

## 👨‍💻 Engineering & Credits

<div align="center">

**Platform designed, engineered, and maintained by**

### [Abdullah Al Adib](https://adi.pro.bd/)
*Lead Developer & Technical Contributor • Dhaka College Science Club*

[![GitHub](https://img.shields.io/badge/GitHub-seadib-181717?style=flat&logo=github)](https://github.com/seadib)
[![Portfolio](https://img.shields.io/badge/Portfolio-adi.pro.bd-blue?style=flat)](https://adi.pro.bd/)

<br>

**Dhaka College Science Club (DCSC)**  
*Est. 1996 • Mirpur Road, Dhanmondi, Dhaka-1205, Bangladesh*  
*Spreading the knowledge of science to the utmost*

**#ForClubAndCountry** 🇧🇩

</div>
