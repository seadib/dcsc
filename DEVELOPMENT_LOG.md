# 📓 Dhaka College Science Club (DCSC) — Development & Issue Resolution Log

This document provides a permanent, transparent record of all engineering work, architectural transformations, bugs encountered, and solutions applied across each release of the DCSC web platform.

---

## 🚀 Version 2.0.0 (Next.js 16 + Sanity Studio v3 Architecture)
- **Release Date**: November 23, 2026
- **Live Admin Studio**: [https://dcsc.sanity.studio](https://dcsc.sanity.studio)
- **Repository**: [https://github.com/seadib/dcsc](https://github.com/seadib/dcsc)
- **Git Tag**: `v2.0.0`

### 📋 1. Work Completed (কী কী কাজ করা হয়েছে)
1. **Full-Stack Monorepo Architecture**:
   - Structured the repository cleanly into `/web` (Next.js frontend) and `/studio` (Sanity Studio v3 CMS), while preserving legacy static files for archival reference.
2. **Cloud-Deployed Sanity Studio v3**:
   - Configured project ID `t5npxsw7` and dataset `production`.
   - Assigned dedicated custom hostname `dcsc` (`https://dcsc.sanity.studio`).
   - Successfully built and deployed Sanity Studio bundle to Sanity Cloud Hosting with zero hosting fees.
3. **Comprehensive Content Modeling & Schemas**:
   - Singletons: `siteSettings` (global branding, contact, maps), `homePage` (modular Page Builder).
   - Document Collections: `batch`, `committeeMember`, `teacherLeader`, `event`, `post`, `achievement`, `galleryAlbum`, `wallMagazine`.
4. **Drag-and-Drop Dynamic Page Builder**:
   - Implemented 8 modular blocks (`heroBlock`, `statsBlock`, `eventsBlock`, `postsBlock`, `committeeBlock`, `galleryBlock`, `scilabBlock`, `joinCtaBlock`).
   - Admin users can reorder, hide, add, or edit any section on the homepage in real-time.
5. **Interactive UI / UX Modernization**:
   - **Executive Committee**: Clean photo cards with click-to-open biography popups, social media links, and batch categorization.
   - **Batch Archiving**: Active batch (2025-26) highlighted, previous batches displayed with preview sliders and dynamic full pages at `/committee/[batch]`.
   - **Teacher Panel**: Dedicated teacher/moderator cards with administrative pause/resume visibility toggles.
   - **Direct Facebook Integration**: Events and posts open directly in Facebook with fallback detail views.
   - **Interactive Sci-Lab**: Preserved chemistry, gravity, atom simulations, and quizzes in modern dark cards.
6. **Automated SEO & Social Graph**:
   - Automated dynamic page titles, descriptions, and OpenGraph images via `lib/seo.ts`.
   - Automated `sitemap.ts` and `robots.ts` dynamically indexing all batches and pages.
7. **Complete Data & Asset Migration**:
   - 100% of all legacy content migrated to Sanity CDN:
     - 4 Teachers / Mentors
     - 29 Executive Committee Members with bio and social links
     - 4 Batch records
     - 6 Major Events with event dates, links, and featured images
     - 10 Articles / Posts with excerpts and images
     - 5 National & Regional Olympiad Achievements with trophies/badges
     - 4 Gallery Albums with multi-photo arrays
     - 27 Wall Magazine / Wednesday Wonders editions
     - Over 50+ images uploaded to Sanity CDN and referenced via high-speed CDN URLs.

---

### ⚠️ 2. Problems Encountered & Exact Solutions Applied (কী কী সমস্যা ছিল এবং কীভাবে সমাধান করা হয়েছে)

#### 🔴 Problem 1: Path Delimiter Collision (`##` in directory path)
* **The Issue**: The local workspace was located at `C:\Users\USER\Downloads\##aicode\DCSC`. In both Vite (Rollup) and Next.js / Webpack, `#` is treated as a URL fragment delimiter. When Vite or Webpack analyzed relative imports (e.g. `../../node_modules/...`), the `#` cut the path in half, resulting in duplicate broken strings like `constants.js##aicode/DCSC/studio/...` and `ENOENT` crashes.
* **The Root Cause**: Node's internal `fs.realpathSync.native` resolves drive mappings back to physical paths, causing tools that parse paths as URLs to misinterpret `#` as a hash fragment.
* **The Solution**: 
  1. For local development: Mapped a clean virtual drive without `#` characters using `subst X: "C:\Users\USER\Downloads\##aicode\DCSC"`.
  2. For Sanity Studio cloud build/deploy: Isolated the studio build into a clean temporary environment (`C:\Users\USER\AppData\Local\Temp\dcsc-studio`), executed `npx sanity build` and `npx sanity deploy --no-build`, ensuring Vite never encounters `#` during compilation.

#### 🔴 Problem 2: Next.js 16 Turbopack Font Resolution Crash
* **The Issue**: Turbopack crashed when attempting to load Google fonts via `next/font/google` due to the path containing `#`.
* **The Solution**: Configured Next.js build scripts to use the stable Webpack engine (`--webpack`) and moved Google Font declarations to clean CSS imports inside `globals.css`.

#### 🔴 Problem 3: Next.js 16 Route Segment `revalidate` Conflict
* **The Issue**: In Next.js 16 App Router, `export const revalidate = 60` threw `Route segment config "revalidate" is not compatible with nextConfig.cacheComponents`.
* **The Solution**: Removed legacy `export const revalidate` statements and standardized data caching inside the Sanity client using native Next.js fetch cache options (`next: { revalidate: 60 }`).

#### 🔴 Problem 4: Server Component Prerender Hydration Mismatch
* **The Issue**: In `Footer.tsx`, evaluating `new Date().getFullYear()` in a server component caused Next.js build to fail on prerender mismatches.
* **The Solution**: Added `'use client'` directive to `Footer.tsx` so client-side hydration evaluates dynamic dates consistently without server prerender conflicts.

#### 🔴 Problem 5: Sanity API Token Permissions (Editor vs Administrator)
* **The Issue**: Setting the project's `studioHost` via the Sanity Management API returned `401 Unauthorized` / `Forbidden` because the initial API token only possessed `Editor` role.
* **The Solution**: Requested and configured an `Administrator` token, enabling direct project-level PATCH mutations and instant cloud studio deployment.

#### 🔴 Problem 6: CORS Origin Restrictions for Studio & Localhost
* **The Issue**: Newly deployed studio (`https://dcsc.sanity.studio`) and frontend could encounter CORS restrictions when authenticating users and mutating data.
* **The Solution**: Executed automated CORS registrations via Sanity API adding `https://dcsc.sanity.studio` and `http://localhost:3000` with `allowCredentials: true`.

#### 🔴 Problem 7: Missing Content in Initial CMS Seed
* **The Issue**: The initial migration only seeded 3 posts and 4 events without achievements, wall magazines, or photo albums.
* **The Solution**: Developed an automated extraction and migration pipeline (`import_all_website_content.py`) that parsed all legacy HTML files, uploaded all 133 local images to Sanity CDN with deduplication, and populated all 5 achievements, 4 albums, 27 wall magazines, 10 posts, and 6 events.

---

## 🏛️ Version 1.0.0 (Original Static Website Edition)
- **Release Date**: November 8, 2026
- **Git Tag**: `v1.0.0`
- **Commit**: `7f70a56c57af7c0f7ac32932c06e2477e6610148`

### 📋 Work Summary:
- Initial static multi-page site coded in HTML5, CSS3, and JavaScript.
- Static member cards, basic event cards, and manual image links.
- Required direct source-code editing for every text, member, or event change.
