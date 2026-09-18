# Customize portfolio content

Most visible content lives in typed modules under [`src/data/`](../src/data/). This guide identifies the canonical files and publication rules for common updates.

## Find the content owner

Start with the module that owns the content you want to change:

| File | Content |
| --- | --- |
| `about.ts` | Biography, location, profile details, and image |
| `ai-assistant.ts` | Assistant labels, starter prompts, and errors |
| `contact.ts` | Email address, hero invitation line, and typical response time |
| `education.ts` | Schools, courses, activities, awards, and images |
| `experience.ts` | Work, volunteer, and project history |
| `footer.ts` | Footer links, locations, technology labels, and availability |
| `hero.ts` | Name, role, call to action, and profile image |
| `navigation.ts` | Section navigation labels and targets |
| `projects.ts` | Project subtitles, descriptions, links, images, cover tags, and overview tags |
| `skills.ts` | Domain knowledge, featured site tools, and GitHub README badges |

`heroContent.tagline` is rendered in the hero. `primaryCtaLabel` and `secondaryCtaLabel` control the two hero actions (mailto contact and resume gate). The mailto target comes from `contactContent.email`.

## Add a project

Add an entry to `projectItems` in [`src/data/projects.ts`](../src/data/projects.ts). Every project requires `id`, `title`, `image`, `subtitle`, `description`, `coverTags`, and `tags`. `subtitle` and `coverTags` appear on the closed project card. `description` and the combined `coverTags` + `tags` list appear in the project details dialog. Set `published: true` to render it; omitted or false values remain hidden.

## Add experience

Add an entry to `experiences` in [`src/data/experience.ts`](../src/data/experience.ts). Every entry requires `id`, `organization`, `role`, `type`, and `startDate`. Entries render by default; set `published: false` to hide one.

## Update skills

Edit [`src/data/skills.ts`](../src/data/skills.ts). `featuredSkills` is the short primary-stack list at the top of the skills section. `skillCategories` is the full badge list rendered below that strip and synced to the GitHub profile README:

```bash
bun run sync:readme-skills
```

Commit both the data file and the updated root [`README.md`](../README.md). Verify synchronization before you push:

```bash
bun run check:readme-skills
```

## Change the section order

The homepage section sequence is defined in [`src/app/page.tsx`](../src/app/page.tsx).
Keep [`src/data/navigation.ts`](../src/data/navigation.ts) in the same order.
See [page composition](ARCHITECTURE.md#page-composition) for the current order.

## Change colors

Update semantic custom properties in the `:root` and `[data-theme="dark"]` blocks of [`src/app/globals.css`](../src/app/globals.css):

```css
:root {
  --primary: #70cbff;
  --secondary: #f1f5f9;
}

[data-theme="dark"] {
  --primary: #70cbff;
  --secondary: #1e293b;
}
```

The `@theme inline` block maps these semantic values to Tailwind utilities such as `bg-primary` and `text-secondary`. Do not replace those mappings with fixed color values.
