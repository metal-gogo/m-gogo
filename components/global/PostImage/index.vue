<template>
  <figure class="post-image">
    <client-only placeholder="Loading image">
      <cld-image class="post-image__img-container" :public-id="src" :alt="alt">
        <cld-placeholder :type="placeholderType" :responsive="responsive" />
        <cld-transformation :width="width" :height="height" crop="scale" />
        <cld-transformation fetch-format="auto" quality="auto" loading="lazy" />
      </cld-image>
    </client-only>
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
    height: {
      type: Number,
      required: true,
    },
    placeholderType: {
      type: String,
      default: 'blur',
    },
    responsive: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.post-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  margin: 0 0 1rem;

  @media screen and (min-width: $breakpoint-small) {
    padding: 0 1.5rem;
  }
}

.post-image__img-container {
  overflow: hidden;
  border: 2px solid var(--accent);
  border-radius: 6px;
}

.post-image__figcaption {
  @include body-2;

  padding-left: 0.5rem;
}
</style>
