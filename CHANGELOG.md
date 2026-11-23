

## [v2.1.5] - 2026-11-23
### Add Formal Proprietary License File
Added official root LICENSE file declaring All Rights Reserved proprietary terms for Dhaka College Science Club web platform.


## [v2.1.4] - 2026-11-23
### Clean Removal of Obsolete License Text
Completely removed the legacy MIT license section from README.md to ensure 100% proprietary protection.


## [v2.1.3] - 2026-11-23
### Proprietary License & Copyright Protection Policy
Removed MIT open-source license badge and established official Proprietary & All Rights Reserved copyright protection for Dhaka College Science Club.


## [v2.1.2] - 2026-11-23
### Standardize Live Links across Documentation and Releases
Integrated mandatory live website link (https://seadib.github.io/dcsc), Sanity Studio admin dashboard, and GitHub repository into a unified, permanent format.


## [v2.1.1] - 2026-11-23
### Automated Git Release & Asset Management Workflow
Introduced workspace-level Git release automation skill (.agents/skills/git-release-manager) and rules (AGENTS.md, GEMINI.md) to automatically track repository assets, bump semantic versions, tag git commits, and publish official GitHub Releases on every push.
# Changelog

All notable changes to the Dhaka College Science Club (DCSC) platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **Version Progression Policy**: All ongoing work remains in the `2.x` stream (e.g. `v2.0.0` -> `v2.0.1` -> `v2.1.0` -> `v2.2.0`). Version 3.0 will only be created when a completely new architectural or visual design shift is initiated.

---

## [v2.1.0] - 2026-11-23

### 🌟 Full Content & Asset Synchronization
- **Club Achievements**: Migrated 5 major national Olympiad and science expo trophies from `achievements.html` into Sanity (`achievement` collection) with dates, descriptions, and high-resolution trophy photos (`a1.jpg`–`a5.jpg`).
- **Wall Magazine (Wednesday Wonders)**: Uploaded and created 27 consecutive digital wall magazine editions (`w1.jpg`–`w27.jpg`) in Sanity (`wallMagazine` collection).
- **Photo Gallery Albums**: Structured 4 multi-photo albums (`galleryAlbum` collection) for Olympiad Hunt 4.0, Grand Iftar Mahfil 2026, Intra Science Festival 2025, and Campus Memories with automated alt tags and captions.
- **Events & Posts Expansion**: Synchronized all 6 major club events and 10 news posts with full excerpts, CDN-hosted images (`p1.jpg`–`p10.jpg`), and direct Facebook URLs.
- **Home Page PageBuilder**: Populated the `homePage` singleton in Sanity with all 8 draggable blocks (`heroBlock`, `statsBlock`, `eventsBlock`, `postsBlock`, `committeeBlock`, `galleryBlock`, `scilabBlock`, `joinCtaBlock`), giving admins full zero-code customization.
- **Master Work Tracker**: Added `WORK_TRACKER.md` to permanently record code evolution, prior states, bugs, and engineering solutions.

---

## [v2.0.1] - 2026-11-23

### ☁️ Cloud Studio Deployment & Security Hardening
- **Sanity Cloud Hosting**: Assigned dedicated studio hostname `dcsc` and deployed Sanity Studio v3 to [https://dcsc.sanity.studio](https://dcsc.sanity.studio).
- **Vite Hash Delimiter Fix**: Isolated studio compilation into clean workspace to prevent Vite/Rollup crashes caused by `#` characters in directory paths.
- **CORS Allowlist**: Configured Sanity CORS origins for `https://dcsc.sanity.studio` and `http://localhost:3000` with authentication credentials enabled.
- **Admin Privileges**: Transitioned to Administrator API token enabling full project-level mutations and management.

---

## [v2.0.0] - 2026-11-23

### 🚀 Initial Modernization (Next.js 16 + Sanity Studio v3)
- **Monorepo Architecture**: Created clean separation between `/web` (Next.js App Router) and `/studio` (Sanity Studio v3).
- **Content Modeling**: Created schemas for `siteSettings`, `homePage`, `batch`, `committeeMember`, `teacherLeader`, `event`, `post`, `achievement`, `galleryAlbum`, and `wallMagazine`.
- **Dynamic Frontend Pages**: Rebuilt all club sections as high-performance Server Components with Tailwind CSS v4 and Lucide icons.
- **Interactive Features**: Added committee member bio modal popups, batch archive history, teacher pause/resume visibility, and Sci-Lab interactive hubs.
- **Automated SEO**: Implemented dynamic metadata, OpenGraph cards, `sitemap.ts`, and `robots.ts`.

---

## [v1.0.0] - 2026-11-08

### 🏛️ Original Legacy Static Website
- Multi-page static architecture coded in HTML5, CSS3, and JavaScript.
- Static member roster, event listings, wall magazine grid, and certificate tools.
