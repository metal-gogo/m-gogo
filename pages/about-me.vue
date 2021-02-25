<template>
  <div>
    <main class="container">
      <h1 class="title">About me</h1>
      <article-content :post="aboutMePost" />
    </main>
    <aside v-if="posts" class="container">
      <post-list list-title="Latest posts" :posts="posts" />
    </aside>
  </div>
</template>

<script>
import composeHead from '@/utils/pages/composeHead'

export default {
  name: 'AboutMePage',
  async asyncData({ $content, params, $sentry }) {
    const aboutMePost = await $content('/', 'about-me').fetch()

    const posts = await $content('posts')
      .only(['title', 'slug', 'summary', 'featuredImage', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return { aboutMePost, posts }
  },
  head() {
    const { title, summary, featuredImageUrl } = this.aboutMePost

    return composeHead({ title, description: summary, featuredImageUrl })
  },
}
</script>
