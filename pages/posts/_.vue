<template>
  <div>
    <main>
      <article class="container">
        <h1 class="title">{{ post.title }}</h1>
        <article-content :post="post" />
      </article>
    </main>
    <!-- <aside class="container">
      <category-list />
    </aside> -->
    <aside v-if="categoryPosts" class="container">
      <post-list :list-title="categoryPostsTitle" :posts="categoryPosts" />
    </aside>
  </div>
</template>

<script>
import composeHead from '@/utils/pages/composeHead'
import publishedCategories from '@/utils/dictionary/categoriesDictionary/publishedCategories'

export default {
  name: 'DynamicPostPage',
  async asyncData({ $content, params, error }) {
    const path = `/posts/${params.pathMatch || 'index'}`
    const isCategoryPage = publishedCategories.includes(params.pathMatch)
    const category = isCategoryPage
      ? params.pathMatch
      : params.pathMatch.split('/')[0]
    const categoryPosts = await $content('posts', { deep: true })
      .where({
        category: { $eq: category },
        path: { $ne: path },
        isDraft: { $ne: true },
      })
      .only(['title', 'path', 'summary', 'featuredImage', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .fetch()
    const [post] = await $content('posts', { deep: true })
      .where({
        path,
        isDraft: { $ne: true },
      })
      .fetch()
    if (!post) {
      error({
        statusCode: 404,
        message: 'Page could not be found',
      })
    }

    return { post, category, categoryPosts }
  },
  head() {
    const { title, summary, featuredImageUrl } = this.post

    return composeHead({ title, description: summary, featuredImageUrl })
  },
  computed: {
    categoryPostsTitle() {
      return `Latest ${this.category} posts`
    },
  },
}
</script>
