<template>
  <div>
    <main class="container">
      <h1 class="title">M-GoGo blog</h1>
      <article-content :post="homepagePost" />
    </main>
    <aside v-if="posts" class="container">
      <post-list list-title="Latest posts" :posts="posts" />
    </aside>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content, params, $sentry }) {
    const homepagePost = await $content('/', 'index').fetch()
    const posts = await $content('posts')
      .only(['title', 'slug', 'summary', 'featuredImage', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return { homepagePost, posts }
  },
}
</script>
