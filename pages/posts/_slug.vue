<template>
  <div>
    <main>
      <article class="container">
        <h1 class="title">{{ post.title }}</h1>
        <article-content :post="post" />
      </article>
    </main>
    <aside>
      <surrounding-posts :prev="prev" :next="next" />
    </aside>
  </div>
</template>

<script>
import composeHead from '@/utils/pages/composeHead'

export default {
  name: 'PostPage',
  async asyncData({ $content, params }) {
    const post = await $content('posts', params.slug).fetch()
    const [prev, next] = await $content('posts')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return { post, prev, next }
  },
  head() {
    const { title, summary, featuredImageUrl } = this.post

    return composeHead({ title, description: summary, featuredImageUrl })
  },
}
</script>
