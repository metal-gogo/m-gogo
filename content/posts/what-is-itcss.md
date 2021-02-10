---
title: What is ITCSS?
description: In-depth explanation on how does ITCSS provides a sane and scalable architecture for CSS
featuredImage: static/images/posts/what-is-itcss/ITCSS.png
---

**ITCSS** refers to Inverted Triangle CSS, a term introduced by [Harry Roberts (@csswizardry)][csswizardry], to deal with the increasing complexity of managing projects with CSS. This methodology helps you organize your CSS projects in a sane and scalable manner. In this blog post I'll try to explain the magnificence of this beautiful architecture.

<!-- omit in toc -->
## Article content 

- [CSS global scope](#css-global-scope)
- [Selectors specificity](#selectors-specificity)
- [CSS Cascade](#css-cascade)
- [The Specificity Graph](#the-specificity-graph)
- [So... What is ITCSS?](#so-what-is-itcss)
  - [Generic to explicit](#generic-to-explicit)
  - [Low specificity to high specificity](#low-specificity-to-high-specificity)
  - [Far-reaching to localized](#far-reaching-to-localized)
- [ITCSS layers](#itcss-layers)
  - [Settings](#settings)
  - [Tools](#tools)
  - [Generic](#generic)
  - [Elements](#elements)
  - [Objects](#objects)
  - [Components](#components)
  - [Trumps / Utilities](#trumps--utilities)

---

Before diving deep into **ITCSS**, I want to review the three aspects of CSS
that it tries to address: **CSS global scope**, **Selectors specificity**, and **CSS cascade**.

## CSS global scope

```css
html {
  font-family: "Crimson Pro", serif;
}
```

Except for some form elements, you've just set a font on every bit of text on a site. That's what you were trying to do, probably. Setting that font-family every time would be tedious and error-prone.

CSS is global by nature. **On purpose!**

_But why?_

We want to use consistent typography, colors, sizing, spacing, layout, transitions, etc., and have our websites & apps feel like one cohesive unit.

Nevertheless, the global nature of CSS is perhaps the most-pointed-at anti-feature of CSS. Some people don’t like it. We all know it’s very easy to write a single CSS rule that has implications all over a site, breaking things you really didn’t want to break.

Even though we want consistency around our application, there are occasions on which we prefer to have a local impact. That's why the frontend community has built CSS Modules. Vue achieves this by adding the **scoped** keyword on the style tag.

For example, writing the following:

```vue
<style scoped>
.example {
  color: violet;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

Will be converted into the following:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: violet;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

---

## Selectors specificity

[Specificity][specificity] is how browsers decide which CSS property values are the most relevant to an element and, therefore, will be applied. Browsers base **specificity** on the matching rules which, are composed of different sorts of CSS selectors.

**Specificity** is a weight set by browsers to a given CSS declaration, determined by the number of each selector type in the matching selector. When multiple declarations have equal **specificity**, the last declaration found in the CSS is rendered. As per CSS rules, directly targeted elements will always take precedence over rules which an element inherits from its ancestor.

The following list of selector types increases by **specificity**:

- Type selectors (e.g., `h1`) and pseudo-elements (e.g., `::before`).
- Class selectors (e.g., `.example`), attributes selectors (e.g., `[type="radio"]`), and pseudo-classes (e.g., `:hover`).
- ID selectors (e.g., `#example`).

Take a look at this amazing image created by [Estelle Weyl][estelle-weyl] on her [post on specificity][estelle-weyl:specificity] for a visual representation of **specificity**.

<post-image src="/images/posts/what-is-itcss/css_specifishity.png" alt="Image describing different specificity selectors with plankton, fish, and sharks" title="CSS specificity explained with plankton, fish, and sharks." width="1184" height="1326"></post-image>

---

## CSS Cascade

[CSS][css] stands for Cascading Style Sheets, and that first word cascading is essential to understand — the way that the cascade behaves is key to understanding CSS.

Stylesheets **cascade** - at an elementary level, this means that the order of CSS rules matters; when two rules apply that have equal specificity, the one that comes last in the CSS is the one used.

For the following code snippets:

```css
h1 {
  color: violet;
}

h1 {
  color: blue;
}
```

```html
<h1>This is my heading.</h1>
```

The result would be:

<post-image src="/images/posts/what-is-itcss/css_cascade_example.png" alt="The result of the cascade, applying the last declared rule to h1 tags" title="Result of an example of the CSS cascade applying two styles to h1 tags." width="1262" height="235"></post-image>

---

## The Specificity Graph

[Harry Roberts][csswizardry] introduced the term **specificity graph** in 2014. The **specificity graph** is a visual representation of how specific the code is regarding its position in the CSS code. With this graph, we can determine how specific our code is and how many rules are overridden.

The specificity graph is a straightforward model for diagrammatically
assessing your's codebase overall health in terms of specificity. With a
screenshot, you can look at an entire project's CSS and highlight any
potentially troublesome areas of higher-than-ideal specificity.

It is worth highlighting explicitly and upfront that the Specificity Graph
is just a high-level and relatively crude model. It aims to give a
comprehensive and general overview of the selectors' specificity across an
entire project.

<post-image src="/images/posts/what-is-itcss/better_specificity_graph.png" alt="A line graph depicting a gradual increment on specificity through the stylesheet" title="Example graph provided by Harry Roberts to showcase the ideal specificity graph." width="1504" height="998"></post-image>

As you can see, the **specificity** should be growing towards the end of the graph. Additionally, you can take on that spikes are not great, however, in a real-life codebase you should see some spikes on the end; but that is perfectly fine since we will want to have some component-based **specificity** there.

<post-image src="/images/posts/what-is-itcss/demo_specificity_graph.png" alt="A line graph without a big increment towards the end" title="The specificity graph of this website at the time of writing this article." width="1832" height="718"></post-image>

You may notice that there is no real increment in the specificity on this website specificity graph. This is due to the early stage of the blog. So until now, I have not needed to add a lot of styling for specific components, therefore we don't see the expected spikes on the end of the graph. However, the approach using **ITCSS** provides a predictable graph on the website 🤓.

---

## So... What is ITCSS?

Inverse Triangle CSS (**ITCSS**) is a CSS architecture and not a library. You can see it as a mindset, therefore it works well with CSS pre-processors such as [LESS][less], [SCSS][scss], and [Stylus][stylus]; and **ITCSS** is entirely compatible with methodologies like [BEM][bem], [SMACSS][smacss], and [OOCSS][oocss].

The specificity graph is the cornerstone for the ITCSS. This architecture will try to ensure that our CSS code is scalable and predictable through time by making us to write our code following these guidelines:

### Generic to explicit
    
We start with the most generic, low-level, catch-all, unremarkable styles and eventually progress to more explicit and specific rules as we move through the project.

### Low specificity to high specificity

The lowest-specificity selectors appear towards the beginning, with specificity steadily increasing as we progress through the project. We want to ensure that we avoid as much of the Specificity Wars as we can, so we try and refrain from writing higher-specificity selectors before lower-specificity ones. We're always adding specificity in the same direction, thus avoiding conflicts.

### Far-reaching to localized

Selectors towards the beginning of the project affect a lot of the DOM, with that reach progressively lessened as we go through the codebase. We want to make 'passes' over the DOM by writing rules that affect gradually less and less of it.

These guidelines are easier said than followed. To achieve this in a consistent way, Harry Roberts created the **ITCSS**, a CSS architecture in seven layers.

---

## ITCSS layers

In **ITCSS**, each layer is a logical progression from the last. It increases in specificity, it gets more explicit and intentioned, and it narrows the reach of the selectors used. This means our CSS is inherently easier to scale, as we're writing it in an order that only ever adds to what was written previously. We don't waste time undoing or overriding overly opinionated CSS that was written earlier on.

<post-image src="/images/posts/what-is-itcss/ITCSS.png" alt="A triangle facing down divided in 7, where every part of the triangle is one layer of the ITCSS architecture" title="ITCSS layers diagram." width="600" height="400"></post-image>

It also means that everything, and every type of thing, has its own consistent, predictable place to live. This makes both finding and adding styles much simpler, which is particularly useful when you have several developers contributing to the codebase.

### Settings

ITCSS layer used with pre-processors to define fonts, breakpoints, colors, and other variables. It’s important not to output any CSS in this layer.
    
### Tools

ITCSS layer used for pre-processors mixins, placeholders and functions. It’s important not to output any CSS in this layer.

### Generic

ITCSS layer used to reset and/or normalize styles, box-sizing definition, etc. This is the first layer that generates actual CSS.

### Elements

ITCSS layer used for the styling of bare HTML elements (like `<h1>`, `<a>`, etc.). These
come with default styling from the browser so we can redefine them here according to the brand.

### Objects

ITCSS layer used for class-based selectors which define undecorated design patterns, for example media object known from OOCSS. Useful for things like containers and grids.

### Components

ITCSS layer used for specific UI components. This is where the majority of our
work should take place. With modern component-based frameworks such as [React][react], [Vue][vue], [Angular][angular], and [Svelte][svelte] most UI components are often composed of objects and other
components. Therefore, I recommend keeping all component related CSS on its own components directory, as close as possible to the component code.

### Trumps / Utilities

ITCSS layer for utilities and helper classes with the ability to override anything which goes before in the triangle, eg. hide helper class. This layer shouldn't be used unless something awful happens.

<post-image src="/images/posts/what-is-itcss/ITCSS_reach_specificity_explicitness.png" alt="A triangle facing showing the relationship of reach, specificity, and explicitness on the ITCSS architecture" title="Reach, specificity, and explicitness diagram with ITCSS." width="247" height="204"></post-image>

<!-- Links reference -->

[csswizardry]: https://twitter.com/csswizardry
[specificity]: https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
[estelle-weyl]: http://www.standardista.com/
[estelle-weyl:specificity]: http://www.standardista.com/css3/css-specificity/
[css]: https://developer.mozilla.org/en-US/docs/Web/CSS
[less]: http://lesscss.org/
[scss]: https://sass-lang.com/
[stylus]: https://stylus-lang.com/
[bem]: http://getbem.com/
[smacss]: http://smacss.com/
[oocss]: https://www.keycdn.com/blog/oocss
[react]: https://reactjs.org/
[vue]: https://vuejs.org/
[angular]: https://angular.io/
[svelte]: https://svelte.dev/
