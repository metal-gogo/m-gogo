---
title: "Modernizing my blog (Step 3): A New Publish Flow"
summary: "Replacing stale CI actions, fixing Node 20 compatibility one layer at a time, and getting Firebase preview deploys working again."
featuredImage: "static/images/posts/tech/modernizing-my-blog--step-03--a-new-publish-flow/featured-image.jpg"
category: "tech"

---

The plan said to tag the baseline and bump Node. The tagging was straightforward. Getting the publish pipeline working again was not.

<!-- omit in toc -->
## Content

<nav class="table-of-contents">

- [Modernizing a Stale Nuxt 2 Blog: A New Publish Flow](#modernizing-a-stale-nuxt-2-blog-a-new-publish-flow)
  - [What this step was supposed to be](#what-this-step-was-supposed-to-be)
  - [The four things that broke](#the-four-things-that-broke)
    - [1. fibers is incompatible with Node 16+](#1-fibers-is-incompatible-with-node-16)
    - [2. Webpack 4 and OpenSSL 3 do not get along](#2-webpack-4-and-openssl-3-do-not-get-along)
    - [3. Nuxt 2.15 has a webpack rule conflict on Node 18](#3-nuxt-215-has-a-webpack-rule-conflict-on-node-18)
    - [4. PostCSS 7 was being hoisted over PostCSS 8](#4-postcss-7-was-being-hoisted-over-postcss-8)
  - [The CI overhaul](#the-ci-overhaul)
    - [Stale action versions](#stale-action-versions)
    - [Firebase CLI forced the jump to Node 20](#firebase-cli-forced-the-jump-to-node-20)
    - [Standardizing everything to Node 20](#standardizing-everything-to-node-20)
  - [A bug found during generate](#a-bug-found-during-generate)
  - [The small things](#the-small-things)
  - [What came out the other side](#what-came-out-the-other-side)
  - [What comes next](#what-comes-next)

</nav>

# Modernizing a Stale Nuxt 2 Blog: A New Publish Flow

*Replacing stale CI actions, fixing Node 20 compatibility one layer at a time, and getting Firebase preview deploys working again.*

In the previous post I laid out the full technical plan: the 20 PRs, the five phases, the risks I wanted to track before writing any code. Phase A starts with stabilization. The first real code change was supposed to be mechanical: tag the baseline, bump the Node version, update CI, and remove `fibers`.

That part was fine.

The part that was not fine was everything the Node bump pulled out of the walls.

<post-image src="/images/posts/tech/modernizing-my-blog--step-03--a-new-publish-flow/featured-image" alt="Dependency chain breaking after a Node upgrade in a Nuxt 2 project, affecting CI, Firebase deploys, webpack, and project dependencies." width="1536" height="1024"></post-image>


## What this step was supposed to be

The original scope for this PR was straightforward:

- bump `.nvmrc` and CI from Node 14 to Node 18,
- remove `fibers` (a native addon that Node 18 drops support for),
- update the stale GitHub Actions versions,
- make sure `npm run generate` still works.

That is it.

None of those tasks are interesting individually. A Node bump on a Nuxt 2 project is not supposed to be interesting. It is supposed to be a few lines in a config file and a clean CI run.

What it actually turned into was an unplanned dependency investigation with four distinct root causes, each of which only became visible after fixing the one before it.

## The four things that broke

<post-image src="/images/posts/tech/modernizing-my-blog--step-03--a-new-publish-flow/dependency-cascade-diagram" alt="Dependency cascade triggered by a Node upgrade: fibers incompatibility, OpenSSL 3 breaking webpack 4, Nuxt webpack rule conflict, and PostCSS 7 hoisting over PostCSS 8." width="1536" height="1024"/>

### 1. fibers is incompatible with Node 16+

`fibers` is a native Node addon that `sass-loader` used for synchronous Sass compilation. It was recommended for performance in old Sass and webpack setups.

It has not worked on Node 16 or later because V8 dropped the underlying API it relied on. The `sass-loader` source reflects this: `isSupportedFibers()` returns false for Node ≥ 16 and the package simply never loads.

The fix was to remove `fibers` from `package.json`. No replacement needed — `sass-loader@10` already falls back to async Dart Sass when `fibers` is not available, and modern Dart Sass is fast enough that the omission is irrelevant.

### 2. Webpack 4 and OpenSSL 3 do not get along

Node 18 ships with OpenSSL 3. Webpack 4 uses a legacy hash function (`md4`) that OpenSSL 3 does not support.

The result is a runtime crash during build:

```
Error: error:0308010C:digital envelope routines::unsupported
```

The standard workaround is `NODE_OPTIONS=--openssl-legacy-provider`, which tells Node to load the OpenSSL legacy provider and restores access to the old hash functions.

I added it to the `dev`, `build`, and `generate` scripts in `package.json`:

```json
"dev": "NODE_OPTIONS=--openssl-legacy-provider nuxt",
"build": "NODE_OPTIONS=--openssl-legacy-provider nuxt build",
"generate": "NODE_OPTIONS=--openssl-legacy-provider nuxt generate"
```

This is not a permanent fix. Webpack 4 replacing `md4` with `xxhash64` is tracked upstream, and the proper resolution is the Nuxt 4 migration. For now, the flag gets the project running.

### 3. Nuxt 2.15 has a webpack rule conflict on Node 18

After clearing the OpenSSL crash, the next failure was a webpack error at startup:

```
Error: Rule can only have one resource source (provided resource and test + include + exclude)
```

This only surfaces on newer Node versions because of changes in how webpack 4 validates its own rule configuration at runtime. Nuxt 2.15 generates a webpack config that trips the validation.

The fix was upgrading Nuxt from `2.15.8` to `2.18.1`, which ships a corrected webpack config. That is the last official Nuxt 2 release and the version we should be on anyway.

### 4. PostCSS 7 was being hoisted over PostCSS 8

Nuxt 2.18 uses PostCSS 8 internally through its own plugin system. After upgrading Nuxt, the next build failure was:

```
Error: PostCSS plugin requires PostCSS 8.
```

The cause was `stylelint`, which had `postcss@7` in its own dependencies. Because PostCSS 7 was present in the tree with no direct PostCSS 8 pinned at the top level, npm was hoisting the wrong version.

The fix was adding `postcss@^8.4.0` as an explicit `devDependency`. That pins the correct version at the root of the install tree and prevents the old version from winning the hoisting race.

With PostCSS 8 pinned, the build completed cleanly.

## The CI overhaul

The broken dependency chain was not the only problem waiting in the project. The CI setup had its own category of neglect.

<post-image src="/images/posts/tech/modernizing-my-blog--step-03--a-new-publish-flow/ci-overhaul-comparison" alt="Comparison of outdated and modern GitHub Actions workflows, showing old actions and inconsistent Node versions versus standardized Node 20 workflows and updated actions." width="1536" height="1024" />

### Stale action versions

The existing workflows were pinned to action versions that GitHub has since deprecated:

| Action | Was | Now |
|---|---|---|
| `actions/checkout` | `v2` | `v4` |
| `actions/setup-node` | `v2` | `v4` |
| `actions/cache` | `v2.1.7` | `v4` |
| `github/codeql-action` | `v1` | `v3` |

The firebase hosting workflows had also never had a `setup-node` step at all — they were relying on whatever Node happened to be available on the runner, which is not a safe assumption.

All four action families were updated to their current stable versions, and explicit `setup-node` steps were added to both firebase hosting workflows.

### Firebase CLI forced the jump to Node 20

After the initial bump to Node 18, the firebase hosting preview deploy started failing with a new error:

```
Firebase CLI v15.9.0 is incompatible with Node.js v18.20.8
Please upgrade Node.js to version >=20.0.0 || >=22.0.0 || >=24.0.0
```

<post-image src="/images/posts/tech/modernizing-my-blog--step-03--a-new-publish-flow/firebase-preview-deploy-problem" alt="Firebase Hosting preview deploy blocked by Firebase CLI requiring Node 20, preventing deployments running on Node 18." width="1536" height="1024" />

`firebase-tools@latest` — which the `FirebaseExtended/action-hosting-deploy@v0` action installs at runtime — had dropped support for Node 18.

There were two options: pin firebase-tools to an older version, or bump Node to 20. Pinning a tool to avoid an upgrade creates a problem to manage later. Bumping Node to 20 is the right direction anyway.

Node 20 is the active LTS. The `NODE_OPTIONS` workaround still applies there. The dependency compatibility issues are the same. There was no reason to stay at 18.

### Standardizing everything to Node 20

<post-image src="/images/posts/tech/modernizing-my-blog--step-03--a-new-publish-flow/node-version-standardization" alt="All project environments aligned to Node 20 including local development, CI workflows, Firebase deploy pipelines, and regenerated lockfile." width="1536" height="1024" />

With the firebase requirement pulling Node to 20, it made sense to align everything at once rather than running different versions in different workflows.

All five configuration points now use Node 20:

- `.nvmrc`
- `ci.yml`
- `ci.develop.yml`
- `firebase-hosting-pull-request.yml`
- `firebase-hosting-merge.yml`

The `package-lock.json` was also regenerated from scratch on Node 20 to clear any lingering artifacts from the Node 14 install tree.

## A bug found during generate

<post-image src="/images/posts/tech/modernizing-my-blog--step-03--a-new-publish-flow/generate-only-bug-discovery" alt="Static generation revealing a hidden bug where a route fails during build even though local development works." width="1024" height="1536" />

Running `npm run generate` after the stack was stable revealed a pre-existing bug that had nothing to do with the Node upgrade.

The `/about-me` route was crashing during static generation:

```
TypeError: Cannot read properties of undefined (reading '_normalized')
```

The cause was in `pages/about-me.vue`. The `asyncData` function fetches recent posts and includes a `<nuxt-link :to="post.path">` in the template. But the content query was using `.only()` to select specific fields — and `path` was not in the list:

```js
// before
.only(['title', 'slug', 'summary', 'featuredImage', 'createdAt'])

// after
.only(['title', 'slug', 'path', 'summary', 'featuredImage', 'createdAt'])
```

<post-image src="/images/posts/tech/modernizing-my-blog--step-03--a-new-publish-flow/missing-field-bug" alt="Content query missing the path field causing nuxt-link to receive undefined and crash during static generation." width="1536" height="1024" />

Without `path`, the link received `undefined` and vue-router crashed during SSR normalization. The fix was one field added to one array.

This is the kind of bug that does not surface during regular development — `nuxt dev` is more forgiving than `nuxt generate` about unresolved routes. It only became visible when the full static generation ran cleanly enough for this route to actually execute.

## The small things

Two other small changes came along with this PR.

**`.env.example`** was added with the three Cloudinary variables the project uses: `CLOUDINARY_CLOUD`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. The project already read from environment variables in the config. There was just nothing documenting what those variables were.

**`.vscode/settings.json`** had a stale `codeActionsOnSave` value:

```json
// before: boolean, now deprecated
"source.fixAll.eslint": true

// after: expected string
"source.fixAll.eslint": "explicit"
```

VS Code's auto-migration had already updated this locally, so committing it just stopped the file showing as perpetually dirty in git.

<post-image src="/images/posts/tech/modernizing-my-blog--step-03--a-new-publish-flow/small-fixes" alt="Small maintenance fixes including adding an env example file, updating VS Code ESLint settings, and minor configuration cleanup." width="1536" height="1024" />

## What came out the other side

After this PR, the project can:

- run locally on Node 20,
- pass `npm run generate` without errors,
- deploy to Firebase Hosting from CI,
- run linting and tests on Node 20,
- and build without either the OpenSSL or the webpack rule conflict.

That is more work than "bump the Node version" sounds like. But it is the right kind of work — clearing actual incompatibilities before they become harder to untangle later, when the codebase is in the middle of a framework migration.

Everything broken by the Node upgrade was worth finding before the framework migration. Any of those issues landing in the middle of a Nuxt 3 migration would have made root-cause analysis harder and the PR diffs bigger.

<post-image src="/images/posts/tech/modernizing-my-blog--step-03--a-new-publish-flow/stabilization-summary" alt="Project stabilization after Node 20 migration with working local builds, successful static generation, restored Firebase deploys, and green CI pipelines." width="1024" height="1536" />

## What comes next

With the project baseline stable and the Node version current, the Phase A cleanup continues.

The next PR removes dead code, fixes a few small bugs that have been accumulating, and trims the dependency graph before anything more structural happens.

Small things first. That is the discipline.

<post-image src="/images/posts/tech/modernizing-my-blog--step-03--a-new-publish-flow/what-comes-next" alt="Roadmap from publish flow stabilization to the next phase of the project: removing dead code and cleaning up dependencies." width="1536" height="1024" />
