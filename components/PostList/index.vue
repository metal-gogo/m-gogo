<template>
  <section v-if="hasPosts" class="post-list">
    <h2 v-if="listTitle.length" class="post-list-title">
      {{ listTitle }}
    </h2>
    <ul class="post-list__items">
      <post-list-item
        v-for="(post, index) in posts"
        :key="index"
        :featured-image="post.featuredImage"
        :slug="post.slug"
        :summary="post.summary"
        :title="post.title"
      />
    </ul>
  </section>
</template>

<script>
export default {
  name: 'PostList',
  props: {
    posts: {
      type: Array,
      required: true,
    },
    listTitle: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    hasPosts() {
      return this.posts?.length > 0
    },
  },
}
</script>

<style lang="scss">
.post-list {
  width: 100%;
  max-width: 100%;
}

.post-list__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
  grid-gap: 2.5rem 1rem;
  max-width: 100%;
  padding: 1rem 0;
  margin: 0;
  list-style: none;
}
</style>
