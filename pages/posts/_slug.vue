<template>
  <main>
    <article class="container">
      <h1 class="title">{{ post.title }}</h1>
      <article-content :post="post" />
    </article>
  </main>
</template>

<script>
import composeHead from '@/utils/pages/composeHead'

export default {
  name: 'PostPage',
  async asyncData({ $content, params, $sentry }) {
    const post = await $content('posts', params.slug).fetch()

    return { post }
  },
  head() {
    const { title, summary, featuredImageUrl } = this.post

    return composeHead({ title, description: summary, featuredImageUrl })
  },
}
</script>
