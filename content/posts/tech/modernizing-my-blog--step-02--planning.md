---
title: "Modernizing a Stale Nuxt 2 Blog: The Technical Plan"
summary: "Tool decisions, real risks, and a 20-PR rollout — the specifics I locked in before writing any code."
featuredImage: "static/images/posts/tech/modernizing-my-blog--step-02--planning/featured-image.jpg"
category: "tech"
isDraft: true
---

# Modernizing a Stale Nuxt 2 Blog: The Technical Plan

*Tool decisions, real risks, and a 20-PR rollout — the specifics I locked in before writing any code.*

In the previous post, I covered why I decided to revive this blog and the migration strategy I landed on: stabilize the old codebase first, then migrate directly to Nuxt 4. Here are the technical decisions I locked in before touching any code.

## The technical decisions that shaped the plan

### Most of the code changes will be done with agents

This is probably the most current part of the whole story.

Most of the implementation work in this modernization will be agent-assisted.

That is not because I think agents can own the migration. They cannot. It is because a lot of upgrade work is mechanical:

- bumping versions,
- rewriting config formats,
- replacing deprecated APIs,
- migrating syntax,
- following framework upgrade checklists,
- applying repetitive code transformations.

Agents are good at that, especially when the task is scoped tightly and the PR boundaries are clear.

But that only works if I stay opinionated about the shape of the work. I do not want a swarm of “technically plausible” changes. I want deliberate ones. The hard part is not generating code. The hard part is deciding what should be changed, in what order, and with what level of risk.

### I’m replacing `nvm` with `mise`

I chose `mise` over `nvm` for runtime management.

Part of that is preference, but part of it is practical. `mise` is faster, cleaner, and handles more than just Node. I like having one tool that can manage multiple runtimes with a proper config file instead of a pile of ad hoc setup notes.

For an old side project, reducing friction matters.

### Ramda is not surviving the migration

Ramda is present for a tiny amount of actual value:

- `assocPath` and `mergeDeepRight` in `getIconsDictionary.js`
- `isNil` and `isEmpty` in `composeHead/index.js`

That is not a serious reason to keep both Ramda and `babel-plugin-ramda` around.

This is exactly the kind of dependency that lingers because it once made sense, not because it still does. Native JavaScript can replace all of it cleanly, so I am removing it early and simplifying the dependency graph before the framework move.

### Cloudinary is the biggest real risk

The most fragile part of the migration is not Nuxt itself. It is Cloudinary.

`@nuxtjs/cloudinary` is not just outdated; it is a beta Nuxt 2 module with build-time behavior. It uploads images and rewrites paths in content. That is the kind of integration that becomes dangerous during framework upgrades because it is doing more than rendering.

My plan is to split the concern in two:

- use `@nuxt/image` with the Cloudinary provider for delivery,
- rewrite the build-time upload logic using the Cloudinary Node SDK directly.

That keeps Cloudinary as the backend without keeping the abandoned framework-specific layer.

> **Image note:** A small architecture diagram could work here.  
> Suggested concept: old flow (`@nuxtjs/cloudinary` doing everything) versus new split flow (`@nuxt/image` for delivery + Cloudinary SDK for uploads).  
> Suggested path: `static/images/posts/tech/modernizing-my-blog--step-02--planning/cloudinary-migration-diagram.jpg`

### oxlint is interesting, but not enough on its own

I considered replacing ESLint entirely with oxlint later in the process.

The performance argument is real, and I think oxlint is promising. But Vue projects are not just JS projects. Template rules still matter. I do not want to lose checks around template correctness just because a faster linter exists.

So my post-v2.0.0 direction is a hybrid:

- oxlint for fast JS/TS coverage,
- ESLint with `eslint-plugin-vue` for Vue-specific rules,
- `eslint-plugin-oxlint` to reduce duplication.

That feels like the right level of pragmatism: faster where possible, specific where necessary.

### I’m not adopting oxfmt yet

I looked at oxfmt too.

I am not using it yet.

My rule for dormant side projects is different from my rule for actively maintained codebases. On something I touch every week, I am more willing to adopt sharp new tooling. On something that might sit for months, I want boring tools that age well.

Prettier is boring in exactly the right way.

So Prettier stays, and I can revisit oxfmt later when it feels less like a bet.

### TypeScript comes after v2.0.0

TypeScript is not part of the core modernization.

That is deliberate.

There is always a temptation to roll every desirable improvement into one big “finally doing it right” migration. That is how straightforward upgrades turn into messy rewrites.

I do not want to migrate:

- framework,
- content system,
- image pipeline,
- tests,
- linting,
- and type system

all at once.

First I want a stable, modern JavaScript baseline. Then I can add TypeScript once the platform underneath it has stopped moving.

## The risks I wanted to name before starting

One thing that made the planning clearer was stopping the vague “this migration might be tricky” thinking and listing the exact places where it could go sideways.

These are the ones I care about most.

### 1. The Cloudinary build pipeline

`uploadImagesToCloudinary.js` and `insertFeaturedImageToPost.js` rely on:

```js
require('@nuxtjs/cloudinary').$cloudinary
```

That disappears entirely after migration. This is not a compatibility tweak. It is a rewrite.

### 2. Dynamic SVG loading

BrandIcon currently uses a webpack-style runtime pattern:

```js
require('@/assets/svgs/${name}.svg?raw')
```

### 3. Vue components embedded in markdown

The current markdown content includes custom Vue components like `<post-image>` and `<post-video>` directly in the files. That may still work after the content migration, but it is exactly the sort of thing that deserves verification instead of optimism.

### 4. The catch-all route migration

`pages/posts/_.vue` becomes `pages/posts/[...slug].vue`.

That sounds small, but route params change shape too: `params.pathMatch` becomes a `params.slug` array. This is the kind of thing that creates annoying, avoidable bugs if I treat it as a rename instead of a behavior change.

### 5. Firebase output assumptions

Nuxt 4 generates to `.output/public/` by default. My current `firebase.json` points to `dist/`.

Small detail. Easy fix. Still exactly the kind of detail that will happily waste your time at the end if you do not track it up front.

> **Image note:** A “risk map” graphic could fit nicely here.  
> Suggested concept: a simple checklist or annotated diagram calling out Cloudinary, SVG loading, markdown components, route migration, and Firebase output.  
> Suggested path: `static/images/posts/tech/modernizing-my-blog--step-02--planning/migration-risk-map.jpg`

## The rollout plan: 20 PRs in 5 phases

I do not want this project modernized in one giant branch.

Yes, the codebase is small. No, that does not make a giant migration diff a good idea.

Small projects especially benefit from cleanly separated changes, because the review cost of ambiguity is proportionally higher. If the whole repo changes at once, there is nowhere to hide confusion.

So I split the work into 20 PRs across five phases.

### Phase A — Stabilization (PRs 1–6)

1. Git tag baseline (`v1.9.2-pre-modernization`)
2. Node 18 + `mise` + CI update + remove `fibers`
3. Dead code cleanup + bug fixes
4. Remove Ramda → native JS
5. Dev tooling upgrade (`prettier`, `husky`, `commitlint`, `stylelint`)
6. Remove `core-js` + Babel legacy packages

### Phase B — Framework Migration (PRs 7–8)

7. Nuxt 3 core migration
8. Nuxt 4 structural migration

### Phase C — Module & Feature Migration (PRs 9–14)

9. Content migration (v1 → v3)
10. Cloudinary replacement
11. SVG loading migration
12. Module migration (`color-mode`, `fonts`, `PWA`, `sitemap`)
13. Jest → Vitest
14. ESLint flat config (`@nuxt/eslint` + `eslint-plugin-vue`)

### Phase D — Ship (PRs 15–16)

15. CI/CD finalization + Firebase deploy
16. Cleanup + README + `v2.0.0` tag

### Phase E — Post-v2.0.0 Enhancements (PRs 17–20)

17. JS → TypeScript
18. Hybrid oxlint + ESLint
19. Evaluate oxfmt
20. Cleanup + `v2.1.0` tag

This is not process for process’s sake.

It is how I keep agent-generated work reviewable, reversible, and understandable. If the agents are going to do a lot of the typing, I need the structure to do even more of the thinking.

> **Image note:** This is a strong place for a roadmap-style visual.  
> Suggested concept: a five-phase timeline with the 20 PRs grouped visually.  
> Suggested path: `static/images/posts/tech/modernizing-my-blog--step-02--planning/modernization-roadmap.jpg`

## What success looks like

Success means:

- the blog runs on **Nuxt 4 / Vue 3 / Node 20+**
- the content renders the same way it did before
- images still serve correctly from Cloudinary
- PWA behavior still works
- sitemap generation still works
- CI passes cleanly
- Firebase deployment works
- there are no beta, deprecated, or abandoned dependencies left in the critical path

Then, after `v2.0.0`, I can focus on the nicer things:

- TypeScript,
- faster linting,
- and a toolchain that feels current without feeling fragile.

That last part matters to me more than novelty. I am not trying to build the most fashionable setup possible. I am trying to end up with a project I can return to later without immediately regretting my past decisions.

## What comes next

The first step is intentionally unglamorous.

I am tagging the baseline.

Before agents start rewriting configs, swapping modules, and migrating framework conventions, I want a clean marker for the “before” state. On a project like this, the baseline is part of the implementation. It is the thing that keeps modernization from turning into vague motion.

So that is where I am starting.

Not with the biggest migration step. Not with the most exciting one.

With the one that gives every later change something solid to compare against.

Step 3: Tagging the starting line →

---

---

## Image asset suggestions

- `static/images/posts/tech/modernizing-my-blog--step-02--planning/featured-image.jpg`
- `static/images/posts/tech/modernizing-my-blog--step-02--planning/cloudinary-migration-diagram.jpg`
- `static/images/posts/tech/modernizing-my-blog--step-02--planning/migration-risk-map.jpg`
- `static/images/posts/tech/modernizing-my-blog--step-02--planning/modernization-roadmap.jpg`

<!-- Links reference -->
