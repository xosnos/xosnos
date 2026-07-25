---
version: alpha
name: xosnos.com
description: Design system for Steven Nguyen's portfolio and career presence.
colors:
  primary: "#70CBFF"
  background-light: "#FFFFFF"
  foreground-light: "#0F172A"
  card-light: "#F8FAFC"
  secondary-light: "#F1F5F9"
  muted-foreground-light: "#64748B"
  border-light: "#E2E8F0"
  destructive-light: "#EF4444"
  background-dark: "#0F172A"
  foreground-dark: "#F8FAFC"
  card-dark: "#1E293B"
  secondary-dark: "#1E293B"
  muted-foreground-dark: "#94A3B8"
  border-dark: "#334155"
  destructive-dark: "#DC2626"
typography:
  headline-display:
    fontFamily: Montserrat
    fontSize: 6rem
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 3.75rem
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.05em
  headline-md:
    fontFamily: Montserrat
    fontSize: 2.25rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.025em
  body-lg:
    fontFamily: Lato
    fontSize: 1.25rem
    fontWeight: 300
    lineHeight: 1.625
  body-md:
    fontFamily: Lato
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  label-sm:
    fontFamily: Montserrat
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.1em
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  2xl: 3rem
  section: 6rem
  container: 80rem
rounded:
  sm: 0.25rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
components:
  page-light:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.foreground-light}"
  page-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
  content-card-light:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
  content-card-dark:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
  secondary-surface-light:
    backgroundColor: "{colors.secondary-light}"
  secondary-surface-dark:
    backgroundColor: "{colors.secondary-dark}"
  supporting-copy-light:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.muted-foreground-light}"
    typography: "{typography.body-md}"
  supporting-copy-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.muted-foreground-dark}"
    typography: "{typography.body-md}"
  divider-light:
    backgroundColor: "{colors.border-light}"
    height: 1px
  divider-dark:
    backgroundColor: "{colors.border-dark}"
    height: 1px
  error-indicator-light:
    backgroundColor: "{colors.destructive-light}"
    size: 0.5rem
    rounded: "{rounded.full}"
  error-indicator-dark:
    backgroundColor: "{colors.destructive-dark}"
    size: 0.5rem
    rounded: "{rounded.full}"
  social-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background-dark}"
    rounded: "{rounded.full}"
    size: 3rem
---

# xosnos.com design system

This reference defines the visual intent and implemented tokens for [xosnos.com](https://www.xosnos.com). Use it to keep portfolio updates recognizable, readable, and consistent across light and dark themes.

## Overview

xosnos.com presents Steven Nguyen's career as a polished technical portfolio. Recruiters, collaborators, and visitors should understand his role, specialties, and project impact without searching through the interface.

The site should feel confident, energetic, and precise. Spacious editorial sections keep career content readable, while sky-blue accents, large geometric headings, soft glows, and restrained motion add personality. Content remains more prominent than decoration.

## Colors

The palette combines high-contrast slate neutrals with one sky-blue brand color. [`src/app/globals.css`](../src/app/globals.css) defines the normative runtime values and maps them to Tailwind CSS utilities.

| Role | Light theme | Dark theme | Usage |
| --- | --- | --- | --- |
| Background | `#FFFFFF` | `#0F172A` | Page canvas |
| Foreground | `#0F172A` | `#F8FAFC` | Headings and primary text |
| Card | `#F8FAFC` | `#1E293B` | Cards, popovers, and raised regions |
| Primary | `#70CBFF` | `#70CBFF` | Actions, links, focus rings, and highlights |
| Secondary | `#F1F5F9` | `#1E293B` | Supporting surfaces |
| Muted foreground | `#64748B` | `#94A3B8` | Metadata and supporting copy |
| Border | `#E2E8F0` | `#334155` | Controls, dividers, and boundaries |
| Destructive | `#EF4444` | `#DC2626` | Errors and destructive states |

Use `primary` selectively so actions and focus states remain identifiable. The theme follows the operating system by default, and the theme provider disables transitions during theme changes.

## Typography

Typography separates expressive headings from readable narrative copy. Next Font preloads both Google font families with `display: swap`.

- **Headings**: Use Montserrat at weight `700` or `800`. Large headings use tight tracking and compact line height.
- **Body copy**: Use Lato at weight `300` or `400`. Use `700` only when content hierarchy requires emphasis.
- **Labels**: Use uppercase Montserrat with generous tracking for compact metadata, badges, and section markers.
- **Italics**: Reserve italic Lato for quotations and supporting details.

## Layout

The site uses a fluid, mobile-first layout that becomes a centered fixed-max-width composition on larger screens. Tailwind CSS Grid and Flexbox utilities control local composition.

- Keep primary sections within an `80rem` maximum width.
- Use `1.5rem` horizontal gutters on small screens and `3rem` gutters from the `md` breakpoint.
- Separate major sections with `6rem` vertical padding.
- Keep long-form copy narrower than its surrounding section.
- Stack content on small screens before introducing columns at `md` or `lg`.

## Elevation & Depth

Borders, tonal surfaces, and soft shadows establish hierarchy. Cards start with a subtle border and shadow, then increase border contrast or shadow depth on hover without shifting surrounding layout.

Use blurred sky-blue or blue shapes as low-opacity background atmosphere. Reserve strong shadows and backdrop blur for overlays, modal dialogs, floating controls, and featured media.

## Shapes

Rounded geometry makes the interface approachable without weakening its technical character. The base radius is `0.75rem`.

- Use `1.5rem` radii for cards, modals, and featured media.
- Use `1rem` radii for nested media and compact panels.
- Use full rounding for avatars, badges, social controls, and primary call-to-action buttons.
- Keep decorative glow shapes circular and visually subordinate to content.

## Components

Components apply the shared tokens while preserving clear hierarchy and interaction states.

### Navigation and floating actions

Keep navigation visually quiet until interaction. Show hover and focus states through the primary color, a visible focus ring, or a small transform that does not reflow the page.

### Section headings

Pair a compact uppercase label with a large Montserrat heading. A short primary-colored rule may reinforce the section boundary.

### Cards

Use the theme's card surface, border, and large radius. Project, experience, and education cards may increase shadow depth, border contrast, or media scale on hover. Keep essential content visible without hover.

### Buttons and links

Reserve filled primary buttons for the main action in a section. Keep inline links distinguishable from body text, and provide visible keyboard focus for every interactive element.

### Dialogs and inputs

Place dialogs above a darkened, blurred overlay. Keep labels or meaningful placeholders available, use rounded inputs with clear borders, and show errors next to the affected field.

## Do's and Don'ts

- Do keep role, experience, and project impact readable without interaction.
- Do preserve semantic light and dark theme tokens.
- Do use the primary color for actions, focus, and selected highlights.
- Do maintain visible keyboard focus and Web Content Accessibility Guidelines (WCAG) AA contrast.
- Do use motion to clarify hierarchy or state changes.
- Don't hide essential information behind hover, animation, or a modal.
- Don't add competing accent colors without updating the palette and its semantic roles.
- Don't mix unrelated corner-radius styles in the same component group.
- Don't let decorative glows, gradients, or shadows reduce text readability.
- Don't add persistent motion without a reduced-motion alternative.

## Responsive behavior

The site uses Tailwind CSS 4's default mobile-first minimum-width breakpoints. Current components primarily use `sm`, `md`, and `lg` variants.

| Prefix | Minimum width |
| --- | --- |
| `sm` | `640px` |
| `md` | `768px` |
| `lg` | `1024px` |
| `xl` | `1280px` |
| `2xl` | `1536px` |

## Motion

Motion provides page fades, one-time viewport reveals, staggered cards, and modal transitions. Viewport reveals start when 15% of an element enters the viewport. Most direct interactions finish within `300 ms`; hero background shapes and the title gradient repeat indefinitely.

The current implementation has no global `prefers-reduced-motion` override and does not use Motion's `useReducedMotion` hook. Treat this as an accessibility gap when adding or changing animation.

## Performance

The repository does not enforce Lighthouse, paint-time, or bundle-size budgets. It does apply the following measures:

- Next.js image optimization with AVIF and WebP output
- Responsive image widths and lazy loading for non-hero content
- Preloaded fonts with `display: swap`
- Optimized `lucide-react` package imports
- Vercel Analytics and Speed Insights in the root layout
