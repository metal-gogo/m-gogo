<template>
  <article class="container">
    <article-content :post="post" />
  </article>
</template>

<script>
export default {
  name: 'PostSlug',
  async asyncData({ $content, params }) {
    const post = await $content('posts', params.slug).fetch()

    return { post }
  },
}
</script>
