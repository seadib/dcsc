# Changelog

All notable changes to the Dhaka College Science Club (DCSC) platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v2.0.0] - 2026-11-23

### 🌟 Major Architecture Overhaul (Next.js 16 + Sanity Studio v3)
Transformed the static multi-page website into a high-performance modern web application powered by **Next.js 16 (App Router)** and a standalone **Sanity Studio v3** cloud-hosted Content Management System (CMS).

### ✨ Added
- **Monorepo Architecture**:
  - `web/`: Next.js 16 frontend with React 19, Tailwind CSS v4, Lucide React, and Sanity Image URL pipeline.
  - `studio/`: Standalone Sanity Studio v3 deployed directly to Sanity Cloud Hosting at [https://dcsc.sanity.studio](https://dcsc.sanity.studio).
- **Sanity CMS Schemas & Content Modeling**:
  - **Singletons**:
    - `siteSettings`: Global club identity, brand logos, contact coordinates, interactive Google Map embed, and social links.
    - `homePage`: Modular, zero-code drag-and-drop Page Builder.
  - **Document Collections**:
    - `batch`: Batch taxonomy with `isCurrentActive` flag, history archive, and dynamic routing (`/committee/[batch]`).
    - `committeeMember`: Detailed executive profiles (name, role, priority order, avatar, Facebook profile, bio, achievements).
    - `teacherLeader`: Mentors and moderators panel with active/pause visibility toggle and honorifics.
    - `event`: Event management with date/time, category, badges, status (upcoming/past), and direct Facebook event redirection.
    - `post`: News & Wednesday Wonders publications with Facebook post redirection and rich excerpts.
    - `achievement`: Club accolades, Olympiad trophies, and science expo awards with year tags and photo proofs.
    - `galleryAlbum`: Photo albums with cover photos and nested image arrays with captions and automated alt texts.
    - `wallMagazine`: Digital wall magazine publications (Wednesday Wonders) with cover art, issue numbers, and downloadable PDFs.
- **Drag-and-Drop Page Builder Blocks**:
  - `heroBlock`: Customizable badge, dual-color headline, tagline, and call-to-action buttons.
  - `statsBlock`: Dynamic numbers and milestones counter (30+ years, 15,000+ alumni, 200+ accolades, 50+ fests).
  - `eventsBlock`: Configurable events carousel/grid with direct event links.
  - `postsBlock`: Latest articles and news feed with social engagement links.
  - `committeeBlock`: Executive and teacher panel spotlight with modal biography triggers.
  - `galleryBlock`: High-resolution visual moments grid.
  - `scilabBlock`: Interactive Sci-Lab hub preview (chemistry, gravity, atom simulations).
  - `joinCtaBlock`: Prominent membership conversion banner.
- **Automated Dynamic SEO & OpenGraph**:
  - Centralized metadata generator (`lib/seo.ts`) generating dynamic page titles, descriptions, canonical URLs, and OpenGraph tags.
  - Dynamic `sitemap.ts` and `robots.ts` generated on-the-fly via Next.js App Router metadata API.
- **Interactive UX Features**:
  - Member modal popup displaying full member biography and social channels upon clicking committee cards.
  - Batch archiving: Current active batch displayed prominently, past batches collapsed with preview slider and dedicated full-page routes (`/committee/[batch]`).
  - Mobile-responsive navigation header with glassmorphism blur and quick search.

### 🔄 Changed
- Replaced hardcoded static HTML/CSS files with dynamic server-rendered React components consuming Sanity GROQ queries with ISR caching.
- Consolidated committee profiles into centralized CDN-hosted image assets.
- Optimized image delivery using Sanity Image URL builder with automatic WebP conversion and responsive source sizing.

### 🐛 Fixed & Engineered
- **Vite/Webpack URL Fragment Delimiter Issue**: Solved path resolution breaks caused by `#` characters in project directory (`##aicode`) by using virtual drive mapping (`subst X:`) and isolated workspace execution for builds.
- **Turbopack Build Compatibility**: Resolved Turbopack panic on path fragments by configuring custom Webpack pipeline and CSS font imports.
- **Next.js 16 CacheComponents Compatibility**: Fixed route segment conflict with Next.js 16 cacheComponents by removing legacy `export const revalidate` across pages.
- **Client-Side Hydration on Dynamic Dates**: Fixed prerender hydration mismatch by isolating dynamic year calculations into `'use client'` Footer component.
- **Sanity CORS & Permissions**: Configured CORS origins (`https://dcsc.sanity.studio`, `http://localhost:3000`) and assigned `dcsc` studio host.

---

## [v1.0.0] - 2026-11-08

### 🏛️ Original Legacy Static Website
Initial release of the Dhaka College Science Club static website.

### ✨ Features
- Static HTML5 / CSS3 / Vanilla JavaScript multi-page layout.
- Separate HTML pages for each section:
  - `index.html`: Main landing page with club banner, committee preview, and event highlights.
  - `about.html`: Club history, mission, vision, and contact coordinates.
  - `committee.html`: Static grid of executive committee members and teacher advisors.
  - `events.html`: Static event listing with standalone event pages (`event-freshers.html`, `event-neuroverse.html`, `event-quizzing.html`, `event-us.html`).
  - `posts.html`: Facebook post mirrors and announcements.
  - `achievements.html`: Listing of trophies and Olympiad achievements.
  - `gallery.html`: Static photo galleries (`gallery-iftar.html`, `gallery-intra.html`, `gallery-olympiad.html`).
  - `wall-magazine.html`: Static grid of 27 wall magazine images (`w1.jpg` to `w27.jpg`).
  - `scilab.html`: Interactive science simulators (chemistry reactions, gravity physics, atom builder, quizzes).
  - `join.html`: Membership registration form and certificate generator.
  - `certificates.html`: Certificate verification interface.
- Basic responsive design and dark-themed styling (`style.css`).
- Manual OpenGraph meta tags and static `sitemap.xml`.
