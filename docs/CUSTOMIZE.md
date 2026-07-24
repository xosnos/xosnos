# Customization

Most content lives in typed data files under [`src/data/`](../src/data/), so changes
rarely require touching component code.

## Add a project

Add an entry to the `projects` array in [`src/data/projects.ts`](../src/data/projects.ts)
and set `published: true` to show it on the site.

## Add experience

Add an entry to [`src/data/experience.ts`](../src/data/experience.ts) and set
`published: true` to show it.

## Update skills

Edit [`src/data/skills.ts`](../src/data/skills.ts), then sync the GitHub profile README:

```bash
bun run sync:readme-skills
```

Commit both the data file and the updated root [`README.md`](../README.md). To verify sync in CI or before pushing:

```bash
bun run check:readme-skills
```

## Change the section order

The homepage section sequence is defined in [`src/app/page.tsx`](../src/app/page.tsx).
See [architecture.md](architecture.md#page-composition) for the current order.

## Change colors

Update the CSS custom properties in
[`src/app/globals.css`](../src/app/globals.css):

```css
:root {
  --color-primary: #70cbff;
  --color-secondary: #2c3e50;
}
```
