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
import availableCategories from '@/utils/dictionary/categoriesDictionary/availableCategories'

export default {
  name: 'IndexPage',
  async asyncData({ $content, params, $sentry }) {
    const homepagePost = await $content('index').fetch()
    const posts = await $content('posts', { deep: true })
      .where({
        slug: { $nin: availableCategories },
        isDraft: { $ne: true },
      })
      .only(['title', 'path', 'summary', 'featuredImage', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return { homepagePost, posts }
  },
}
</script>
