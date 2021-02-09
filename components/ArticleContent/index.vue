<template>
  <nuxt-content :document="post" class="article-content" />
</template>

<script>
export default {
  name: 'ArticleContent',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.nuxt-content-container {
  max-width: 100%;
}

.nuxt-content {
  max-width: 100%;

  hr {
    height: 2px;
    margin: 2.5rem 0;
    background-color: var(--accent);
    border: 0;
  }
}

.nuxt-content-highlight {
  position: relative;
  max-width: 100%;
  padding: 0 1rem;
  margin-bottom: 1rem;

  @media screen and (min-width: $breakpoint-small) {
    padding: 0 1.5rem;
  }

  .filename {
    @include body-2;

    position: absolute;
    top: 0.25rem;
    right: 2.25rem;
    color: $dark-color;
  }

  pre {
    margin: 0;
    border: 2px solid var(--accent);
    border-radius: 6px;
  }

  code {
    @include body-2;

    background-color: $transparent;
  }
}
</style>
