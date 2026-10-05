# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A balanced dual audience:
- Technical recruiters, engineering hiring managers, and talent partners evaluating Steven Nguyen for Forward Deployed Engineer (FDE) and Senior Full-Stack Software Engineer roles.
- Engineering peers, founders, prospective collaborators, and users exploring his AI-native software projects (Terraces, Architype) and open-source tooling.

## Product Purpose

Serves as the canonical single source of truth for Steven Nguyen's personal brand, career accomplishments, and live engineering portfolio. Success means evaluators and collaborators immediately grasp his technical depth, end-to-end execution, and craft within seconds, while providing verifiable interactive proof of his engineering capability.

## Positioning

Proven end-to-end builder spanning enterprise infrastructure and distributed systems (Workday SDE II building internal security tooling, CI/CD pipelines, CVE patching, and AWS multi-region rollouts) to AI-native 0-to-1 products (Terraces, Architype) with live interactive proof (Gemini-powered portfolio assistant, tokenized expiring resume delivery gate). Unlike static resume sites, xosnos.com operates as a live demonstration of full-stack engineering and product craft.

## Operating Context

- **Recruiter Evaluation:** Rapid desktop scanning (30-second passes) of experience, technical skills, project impact, and requesting/downloading the resume PDF.
- **Peer & Collaborator Discovery:** Exploring architecture, tech stacks, live demos, and GitHub repositories across featured projects.
- **Mobile Visits:** Responsive browsing driven by links shared on LinkedIn, X/Twitter, GitHub, or direct outreach.
- **Interactive Inquiries:** Engaging with the embedded Gemini-powered assistant ("Ask Steven") to query specific career details, technical proficiencies, and contact information.
- **Resume Fulfillment:** Gated download flow utilizing expiring tokens, Resend email dispatch, Google Drive PDF fetching, and Google Sheets audit logging.

## Capabilities and Constraints

- **Core Capabilities:**
  - Streaming conversational AI assistant backed by Google Gemini (`/api/chat`) with client rate limiting and origin protection.
  - Tokenized, expiring resume request and download pipeline (`/api/resume/request`, `/api/resume/download`) backed by Resend, Google Drive, and Google Sheets.
  - Interactive project and education modals with focus trapping, keyboard navigation, and scroll lock.
  - Categorized skills grid synced automatically to the root GitHub profile README (`bun run sync:readme-skills`).
  - System-aware light/dark theme toggle with no flash of unstyled content (FOUC).
  - High-performance media delivery using Next.js image optimization (AVIF/WebP).
- **Technical Constraints:**
  - Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion, Lucide React, Bun package manager.
  - Strict Biome formatting and linting rules.
  - Zero unverified or fabricated claims; factual parity between portfolio content and source data in `src/data/*.ts`.
  - Production origin allowlisting for POST endpoints.
- **Undecided Product Scope:**
  - Future expansion into technical writing/blog essays.
  - Potential activation of the unmounted music player integration (`/api/music/now-playing`).

## Brand Commitments

- **Identity & Name:** Steven Nguyen (brand handle: `xosnos`, domain: `xosnos.com`).
- **Tone & Voice:** Confident, energetic, precise, and authentic. Grounded in engineering reality and community impact without generic AI hype, buzzword overload, or inflated claims.
- **Visual Commitments:**
  - Sky-blue brand accent (`#70CBFF`).
  - Slate neutral palettes (`#0F172A` / `#FFFFFF`).
  - Montserrat for expressive, bold geometric headings.
  - Lato for clear, highly readable body typography.
  - High craft standards: subtle depth, soft glows, restrained purposeful motion.

## Evidence on Hand

- **Enterprise Engineering:** SDE II at Workday (full-stack security tooling, CI/CD pipelines, CVE remediation, multi-region AWS microservice rollouts).
- **AI-Native & 0-to-1 Products:**
  - Terraces: AI-native career agent monorepo (TanStack Start, PostgreSQL, AI SDK).
  - Architype: Collaborative system design canvas (Next.js, React Flow, Supabase).
  - UNAVSA Mail Merge: Google Workspace add-on (Google Apps Script, Gmail API, Sheets).
  - UVSA-Midwest App: Cross-platform mobile app (React Native, Expo, Firebase) serving 31 universities and 1,500+ constituents.
  - Almond Travel & jammming: React web applications.
- **Community Leadership:** Technology Director and technical leadership for 501(c)(3) Vietnamese American non-profit organizations.
- **Education:** University of Michigan, B.S.E. in Computer Science.
- **Assets on Hand:** Real photography and verified project thumbnails in `public/assets/img/`, structured data in `src/data/*.ts`.

## Product Principles

- **Proof over proclamation:** Demonstrate engineering capability through working, secure, and interactive systems rather than passive text claims.
- **Craft across the full stack:** Treat interface details, type safety, server resilience, and build ergonomics with equal rigor.
- **Uncompromised accessibility:** Landmark-first architecture, visible keyboard focus, WCAG AA contrast, and reduced-motion paths for every animated element.
- **Dual-audience legibility:** Deliver immediate clarity for fast recruiter skimming while providing depth and technical texture for engineering peers.

## Accessibility & Inclusion

- Adherence to WCAG AA contrast standards across both light and dark themes.
- Landmark-first semantics (`<header>`, `<main id="main-content">`, `<nav aria-label="Primary">`, `<footer>`) and a skip-to-content focus link.
- Accessible modal dialogs with focus trapping, `aria-modal="true"`, `aria-labelledby`, and Escape key dismissal via `useDialog`.
- First-class support for `prefers-reduced-motion` across all entrance and looping animations.
- Polite live regions (`aria-live="polite"`) for status updates, rotating roles, and assistant streaming.
