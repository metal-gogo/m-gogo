<template>
  <figure class="post-image">
    <img class="post-image__img" :src="src" :alt="alt" />
    <figcaption class="post-image__figcaption">{{ title }}</figcaption>
  </figure>
</template>

<script>
export default {
  name: 'PostImage',
  props: {
    alt: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.post-image {
  padding: 0 1rem;
  margin: 0 0 1rem;

  @media screen and (min-width: $breakpoint-small) {
    padding: 0 1.5rem;
  }
}

.post-image__img {
  border: 2px solid var(--accent);
  border-radius: 6px;
}

.post-image__figcaption {
  @include body-2;

  padding-left: 0.5rem;
}
</style>
