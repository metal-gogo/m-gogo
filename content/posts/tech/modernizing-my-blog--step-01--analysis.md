---
title: "Modernizing a Stale Nuxt 2 Blog: The First Analysis"
summary: "How I’m using agents, small PRs, and a lot of restraint to revive an abandoned side project."
featuredImage: "static/images/posts/tech/modernizing-my-blog--step-01--analysis/featured-image.jpg"
category: "tech"
isDraft: true
---

This is about a small personal blog I built, mostly abandoned, and eventually decided to fix — with AI handling more of the typing than usual, and judgment doing all of the thinking.

<!-- omit in toc -->
## Content 

<nav class="table-of-contents">

- [How I’m Modernizing a Small, Stale Nuxt 2 Blog Without Turning It Into a Mess](#how-im-modernizing-a-small-stale-nuxt-2-blog-without-turning-it-into-a-mess)
  - [Why I’m bringing it back now](#why-im-bringing-it-back-now)
  - [What had gone stale](#what-had-gone-stale)
  - [The three options I considered](#the-three-options-i-considered)
    - [Option A — Stabilize first, then migrate](#option-a--stabilize-first-then-migrate)
    - [Option B — Use Nuxt Bridge as an intermediate step](#option-b--use-nuxt-bridge-as-an-intermediate-step)
    - [Option C — Migrate directly to a modern stack](#option-c--migrate-directly-to-a-modern-stack)
  - [What I chose](#what-i-chose)
    - [Why Nuxt 4, not Nuxt 3](#why-nuxt-4-not-nuxt-3)
  - [What comes next](#what-comes-next)

</nav>

# How I’m Modernizing a Small, Stale Nuxt 2 Blog Without Turning It Into a Mess

*How I’m using agents, small PRs, and a lot of restraint to revive an abandoned side project.*

A few years ago, I built a small personal blog with Nuxt 2.

Then I mostly abandoned it.

Not dramatically. I did not rage-quit the project or decide it was dead. It just slipped into that familiar side-project state where nothing is actively wrong, but nothing is being improved either. The blog stayed small, mostly worked, and sat there untouched while the ecosystem moved on.

And the ecosystem really did move on.

The project is still running on Nuxt 2, Vue 2, and Node 14. The dependencies are old. CI is pinned to outdated assumptions. One of the most important modules in the stack, `@nuxtjs/cloudinary`, is stuck in a permanent beta and effectively belongs to another era of the framework.

So this is not a story about saving a critical production app. It is a story about bringing back a neglected small project without overengineering the rescue.

What makes this worth doing now is simple: modern AI tools changed the math.

A few years ago, a project like this was easy to leave alone. It was too small to justify a big manual migration, but stale enough that touching it felt annoying and expensive. That balance has shifted. With agents handling a lot of the repetitive upgrade work, it is finally practical to revive the project instead of leaving it frozen or rewriting it from scratch.

That does **not** mean the work is automatic. It just means the boring parts are cheaper. The judgment still matters.

That is what this post is about.

Before I start letting agents tear through the repo, I wanted a plan that matched the actual size and shape of the codebase.

<post-image src="/images/posts/tech/modernizing-my-blog--step-01--analysis/featured-image" alt="A Nuxt 2 blog being modernized piece by piece" width="1536" height="1024"></post-image>

## Why I’m bringing it back now

The honest answer is not “because the blog broke.”

It did not.

The honest answer is that the project had reached that awkward state where it still ran, but it had become increasingly unpleasant to touch. The longer a project sits on an old stack, the less confidence you have when you finally come back to it. Every dependency starts to feel suspicious. Every upgrade looks entangled with five others. Even simple maintenance starts to carry weird psychological weight.

AI changes that, but only partially.

It does not remove the need to understand the system. If anything, it makes planning more important. Once code changes become cheap to generate, the real risk shifts: not “can I produce the diff?” but “am I producing the right diff?”

That is the part I do not want to delegate.

So the way I am approaching this is:

- use agents for the mechanical upgrade work,
- keep the migration heavily staged,
- review everything like the project matters,
- avoid mixing “modernization” with “changing everything because I can.”

I am taking the same approach with the writing. I’m using ChatGPT to help shape and refine the posts, and Grammarly for the final polish. That feels appropriate for a series about AI-assisted maintenance work: use the tools, but stay responsible for the voice and the decisions.

## What had gone stale

This blog has been sitting on roughly the same foundation since around 2021. It is a small codebase — around 3 pages, 11 components, and roughly 700 lines of code — but the stack around it is old enough to create real friction.

Here is what stood out immediately:

- **Node 14** is end-of-life.
- **Nuxt 2** is in maintenance mode.
- Most of the dependencies are 4–5 years old.
- **`@nuxtjs/cloudinary`** is still beta and never really matured.
- The CI setup still assumes an old world.

None of that means the site is unusable. It means it is old in the worst way: old enough that the next change is harder than it should be.

<post-image src="/images/posts/tech/modernizing-my-blog--step-01--analysis/stale-stack-overview" alt="The stale stack: Nuxt 2, Vue 2, Node 14, and outdated CI" width="2048" height="1365"></post-image>

## The three options I considered

Once I decided to bring the project back, I narrowed the migration strategy to three real options.

### Option A — Stabilize first, then migrate

Clean up the existing Nuxt 2 codebase before touching the framework: remove dead code, fix small bugs, get CI into a trustworthy state, trim dependencies that no longer earn their keep. This keeps cleanup problems from getting mixed into framework problems.

### Option B — Use Nuxt Bridge as an intermediate step

Nuxt Bridge is the standard cautious path for Nuxt 2 apps with real framework complexity — Vuex, custom plugins, middleware, custom webpack behavior. It buys time before a full migration.

### Option C — Migrate directly to a modern stack

Skip the intermediate layer and move directly to the modern stack. Only viable if the app is small and legible enough to see the full migration surface clearly.

<post-image src="/images/posts/tech/modernizing-my-blog--step-01--analysis/migration-options-diagram" alt="Three migration paths: Stabilize first, Nuxt Bridge, and Direct migration — with the chosen paths highlighted" width="1536" height="1024"></post-image>

## What I chose

I chose **A + C**.

First stabilize the project, then migrate directly.

I ruled out Nuxt Bridge pretty quickly. This codebase is too small to justify the overhead. There is no Vuex store. No middleware. No plugins. No custom webpack configuration. In a larger app, Bridge would be a useful buffer. In this one, it would mostly be extra ceremony and one more migration I would have to do later anyway.

That is one of the recurring themes of this project: a lot of conventional migration advice is written for codebases that are much larger and messier than mine.

This project does have risk, but not that kind of risk.

Its risk comes from old dependencies, stale assumptions, and a few fragile implementation details. That is different from deep application complexity. So I do not need a long compatibility phase. I need a clean plan and careful sequencing.

The sequencing I landed on looks like this:

1. stabilize the old codebase enough to reduce noise,
2. migrate the framework in controlled steps,
3. move module and feature migrations after the core framework move,
4. leave TypeScript and experimental tooling until after the first modern release.

### Why Nuxt 4, not Nuxt 3

My reasoning is simple: if I already have to rewrite config, update routing conventions, revisit file layout, and replace old module assumptions, I do not see much value in stopping one major behind.

This is a side project. It may sit for long stretches again. If I am going to spend the effort modernizing it, I would rather land on the current stable foundation than finish the work and immediately feel behind again.

That said, I am not doing it as one heroic PR.

I split it into two phases:

- **PR 7**: the Nuxt 3 core migration
- **PR 8**: the Nuxt 4 structural migration

That split matters. When a migration fails, “something broke” is not useful information. I want to know whether the breakage came from composable and config changes, or from layout and convention changes. Smaller steps make cause and effect easier to see.


## What comes next

With the strategy decided, the next post gets into the specifics: the technical decisions I locked in before writing any code, the exact risks I wanted to track up front, and the full 20-PR rollout plan.

**Step 2: The plan**
