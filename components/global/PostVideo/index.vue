<template>
  <figure class="post-video">
    <!-- <client-only placeholder="Loading image..."> </client-only> -->
    <iframe
      class="post-video__video-container"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      :width="width"
      :height="height"
      :src="src"
    />
    <figcaption v-if="title.length > 0" class="post-video__figcaption">
      {{ title }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'PostVideo',
  props: {
    height: {
      type: Number,
      required: true,
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
.post-video {
  display: flex;
  flex-direction: column;
}

.post-video__image-container {
  overflow: hidden;
}

.post-video__figcaption {
  @include body-2;

  padding-left: 0.5rem;
}
</style>
