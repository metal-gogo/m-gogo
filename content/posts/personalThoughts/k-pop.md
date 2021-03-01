---
title: K-pop
summary: Why I admire K-pop industry
featuredImage: static/images/posts/tech/what-is-itcss/ITCSS.jpg
category: personalThoughts
isDraft: true
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
