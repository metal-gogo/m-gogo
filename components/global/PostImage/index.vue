<template>
  <figure class="post-image">
    <client-only placeholder="Loading image...">
      <cld-image
        class="post-image__image-container"
        client-hints="true"
        sizes="100vw"
        :public-id="src"
        :alt="alt"
        :width="width"
        :height="height"
        progressive
      >
        <slot name="placeholders">
          <cld-placeholder type="blur" />
        </slot>
        <slot name="transformations">
          <cld-transformation
            fetch-format="auto"
            quality="auto"
            loading="lazy"
          />
          <cld-transformation crop="scale" gravity="faces" effect="sharpen" />
        </slot>
      </cld-image>
    </client-only>
    <figcaption v-if="title.length > 0" class="post-image__figcaption">
      {{ title }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'PostImage',
  props: {
    alt: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      required: true,
    },
    responsive: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
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
}

.post-image__image-container {
  overflow: hidden;
}

.post-image__figcaption {
  @include body-2;

  padding-left: 0.5rem;
}
</style>
