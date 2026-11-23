# 📋 Dhaka College Science Club (DCSC) — Master Work & Code Change Tracker

> **Versioning Protocol Notice**:  
> In accordance with project instructions, all current development remains strictly within the **Version 2.x** stream (Semantic Versioning: `2.x.y`).  
> - **Major (3.0.0)**: Will only be initiated upon explicit instruction when a completely new design or paradigm shift is requested.  
> - **Minor (2.1.0, 2.2.0, ...)**: Feature additions, new content modules, dynamic integrations.  
> - **Patch (2.0.1, 2.0.2, ...)**: Bug fixes, build adjustments, asset hotfixes, configuration tweaks.  
> 
> This document is continuously maintained. Every task, prior state, problem encountered, code modification, and solution is logged here in real-time.

---

## 🗺️ Version Summary Matrix

| Version | Release Date | Git Tag | Primary Scope | Status |
| :--- | :--- | :--- | :--- | :--- |
| **v1.0.0** | 2026-11-08 | `v1.0.0` | Original Legacy Static Website (HTML5, CSS3, Vanilla JS) | Archived |
| **v2.0.0** | 2026-11-23 | `v2.0.0` | Initial Next.js 16 App Router & Sanity Studio v3 Architecture | Complete |
| **v2.0.1** | 2026-11-23 | `v2.0.1` | Cloud Deploy to `dcsc.sanity.studio`, Vite Path `#` Fix & CORS Setup | Complete |
| **v2.1.0** | 2026-11-23 | `v2.1.0` | Full Content & Asset Synchronization (Achievements, Albums, Wall Magazines, Page Builder) | **Active** |

---

## 📌 Detailed Version Logs

```
================================================================================
VERSION 2.1.0 — FULL CONTENT & ASSET SYNCHRONIZATION
================================================================================
```
- **Release Date**: November 23, 2026
- **Git Tag**: `v2.1.0`
- **Scope**: Comprehensive data migration of all legacy content, albums, wall magazines, Olympiad trophies, and full Page Builder population in Sanity Studio.

#### 1. State Prior to This Version (আগে কী অবস্থা ছিল):
- Sanity Studio was deployed, but only 4 basic events and 3 posts existed without featured images attached.
- Achievements were 0 in Sanity (5 Olympiad & science expo trophies remained unmigrated).
- Wall Magazine was 0 in Sanity (27 editions of Wednesday Wonders `w1.jpg`–`w27.jpg` were not in the CMS).
- Photo Gallery Albums were 0 in Sanity (Intra fest, Olympiad hunt, and Iftar albums were missing).
- The `homePage` Page Builder was empty (`[]`), falling back to hardcoded component defaults.

#### 2. Challenges & Problems Faced (কী কী সমস্যা ছিল):
- **Problem**: 133 local images needed to be processed and uploaded to Sanity CDN without duplicating assets already stored.
- **Problem**: Regex parsing on nested HTML cards in legacy files failed on non-recursive matches.
- **Problem**: Page Builder in Sanity required strict `_type` and `_key` structures matching `@/studio/schemaTypes/objects/pageBuilder/blocks.ts`.

#### 3. Code & Architecture Changes (কোড যেভাবে পরিবর্তন করা হয়েছে):
- **Asset Deduplication & Upload Engine** (`import_all_website_content.py`):
  - Built an automated asset pipeline querying existing `sanity.imageAsset` records by `originalFilename` to eliminate duplicate uploads.
  - Uploaded remaining images to `https://t5npxsw7.api.sanity.io/v2021-06-07/assets/images/production`.
- **Created Document Collections**:
  - `achievement`: Added 5 Olympiad & national triumph records (`achievement-dc-nakshatra`, `achievement-poster-designing`, `achievement-gregorian-fiesta`, `achievement-math-summit`, `achievement-mgcsc-mindspark`) with year tags, descriptions, and trophy images.
  - `galleryAlbum`: Created 4 structured albums (`Olympiad Hunt 4.0`, `Grand Iftar Mahfil 2026`, `DCSC Intra Science Festival 2025`, `Campus Life & Science Workshops`) with multi-photo arrays, captions, and automated alt tags.
  - `wallMagazine`: Created 27 consecutive digital publications (Vols. 1–27) for Wednesday Wonders with cover art and descriptions.
  - `event`: Updated all 6 major events with exact dates, categories, featured images, descriptions, and direct Facebook URLs.
  - `post`: Updated all 10 posts with high-resolution images (`p1.jpg`–`p10.jpg`), excerpts, and Facebook redirection.
- **Populated Page Builder**:
  - Seeded `homePage` singleton with all 8 draggable blocks (`heroBlock`, `statsBlock`, `eventsBlock`, `postsBlock`, `committeeBlock`, `galleryBlock`, `scilabBlock`, `joinCtaBlock`).
- **Updated Site Settings**:
  - Populated `siteSettings` singleton with official contact info, Google Maps coordinates, social links, and brand logo.

---

```
================================================================================
VERSION 2.0.1 — CLOUD HOSTING & INFRASTRUCTURE HARDENING
================================================================================
```
- **Release Date**: November 23, 2026
- **Git Tag**: `v2.0.1`
- **Scope**: Deploying Sanity Studio to Sanity Cloud Hosting, resolving Vite path collisions, configuring CORS, and pushing to remote git.

#### 1. State Prior to This Version (আগে কী অবস্থা ছিল):
- Sanity Studio only ran locally on port `3333`.
- The user was unable to configure Sanity Studio Host via the browser UI.
- The initial API token had only `Editor` permissions, preventing project-level configuration changes.

#### 2. Challenges & Problems Faced (কী কী সমস্যা ছিল):
- **Problem 1 (Vite Hash Delimiter Crash)**:
  - The project root contained `##` (`C:\Users\USER\Downloads\##aicode\DCSC`).
  - Vite uses Rollup and treats `#` as an URL hash delimiter. During module resolution, relative imports broke into strings like `constants.js##aicode/DCSC/studio/...`, causing `ENOENT` build crashes.
- **Problem 2 (Sanity API Token Role)**:
  - Project PATCH request to assign `studioHost` returned `401 Unauthorized` with the Editor token.
- **Problem 3 (CORS Restrictions)**:
  - The newly registered studio domain `https://dcsc.sanity.studio` was not allowlisted in Sanity CORS origins.

#### 3. Code & Architecture Changes (কোড যেভাবে পরিবর্তন করা হয়েছে):
- **Path Isolation Workaround**:
  - Implemented virtual drive mapping `subst X: "C:\Users\USER\Downloads\##aicode\DCSC"` to remove `#` from local paths.
  - For the cloud build/deploy, isolated the Studio source into `C:\Users\USER\AppData\Local\Temp\dcsc-studio` where `fs.realpathSync.native` resolves cleanly without `#`.
- **Assigned Custom Host**:
  - Patched project `t5npxsw7` using the new Administrator token to assign `studioHost: "dcsc"`.
  - Updated `studio/sanity.cli.ts` with `studioHost: 'dcsc'`.
- **Built & Deployed Studio**:
  - Executed `npx sanity build` and `npx sanity deploy --no-build --yes`.
  - Successfully deployed to live URL: [https://dcsc.sanity.studio/](https://dcsc.sanity.studio/).
- **Configured CORS Origins**:
  - Registered `https://dcsc.sanity.studio` and `http://localhost:3000` via Sanity CORS API with `allowCredentials: true`.

---

```
================================================================================
VERSION 2.0.0 — NEXT.JS 16 & SANITY STUDIO V3 MODERN ARCHITECTURE
================================================================================
```
- **Release Date**: November 23, 2026
- **Git Tag**: `v2.0.0`
- **Scope**: Complete transformation from static HTML/CSS to Next.js 16 App Router frontend + standalone Sanity Studio v3 monorepo.

#### 1. State Prior to This Version (আগে কী অবস্থা ছিল):
- Website was a legacy static multi-page project (`index.html`, `about.html`, `committee.html`, etc.).
- Modifying any committee member, teacher, or event required direct manual HTML code editing.
- No Content Management System (CMS), no automated SEO, no dynamic routing.

#### 2. Challenges & Problems Faced (কী কী সমস্যা ছিল):
- **Problem 1**: Turbopack crashed when loading Google Fonts in paths containing `#`.
- **Problem 2**: Next.js 16 `cacheComponents` conflicted with route-level `export const revalidate = 60`.
- **Problem 3**: `new Date().getFullYear()` in server components triggered SSR prerender hydration errors.
- **Problem 4**: Sanity REST endpoints required specific API versioning (`v2021-06-07`).

#### 3. Code & Architecture Changes (কোড যেভাবে পরিবর্তন করা হয়েছে):
- **Created Monorepo Structure**:
  - `/web`: Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide React.
  - `/studio`: Sanity Studio v3 configured with singletons and document schemas.
- **Built Frontend Routes in `/web/src/app`**:
  - `/`: Dynamic homepage rendered via `PageBuilder.tsx`.
  - `/committee`: Active executive committee with bio modal popups + historical batch slider.
  - `/committee/[batch]`: Dynamic route displaying full past batch rosters.
  - `/events`: Filterable events grid with upcoming/past status and Facebook links.
  - `/posts`: News & Wednesday Wonders articles.
  - `/achievements`: Accolades, national Olympiad titles, and science expo trophies.
  - `/gallery`: Photo albums with CDN image optimization.
  - `/wall-magazine`: Interactive digital wall magazines.
  - `/scilab`: Hands-on science simulations (chemistry, gravity, atom, quiz).
  - `/about`: Club history, founding mission, interactive Google Map embed.
  - `/join`: Membership application and certificate generator.
  - `sitemap.ts` & `robots.ts`: Dynamic automated SEO crawling endpoints.
- **Sanity Client Integration** (`web/src/lib/sanity/`):
  - `client.ts`: Configured with `projectId: 't5npxsw7'`, `dataset: 'production'`, `apiVersion: '2024-01-01'`.
  - `queries.ts`: Type-safe GROQ queries for all document types and page builder blocks.
  - `image.ts`: Helper using `@sanity/image-url` for responsive image generation.
  - `seo.ts`: Centralized metadata generator for OpenGraph, Twitter cards, and canonical tags.
- **Initial Data Migration**:
  - Uploaded 4 teachers, 29 executive members, 4 batch records, and initial events/posts via REST mutation endpoint.

---

```
================================================================================
VERSION 1.0.0 — ORIGINAL LEGACY STATIC WEBSITE
================================================================================
```
- **Release Date**: November 8, 2026
- **Git Tag**: `v1.0.0`
- **Commit**: `7f70a56c57af7c0f7ac32932c06e2477e6610148`
- **Scope**: The original Dhaka College Science Club static website created and maintained before modern CMS transformation.

#### Features:
- Multi-page static architecture (`index.html`, `about.html`, `committee.html`, `events.html`, `posts.html`, `achievements.html`, `gallery.html`, `wall-magazine.html`, `scilab.html`, `join.html`, `certificates.html`).
- Styling powered by `style.css` with dark theme accents.
- Client-side JavaScript (`app.js`).
- Manual sitemap and metadata management.
