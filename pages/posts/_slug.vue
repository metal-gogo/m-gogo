<template>
  <main>
    <article class="container">
      <h1 class="title">{{ post.title }}</h1>
      <article-content :post="post" />
    </article>
  </main>
</template>

<script>
export default {
  name: 'PostPage',
  async asyncData({ $content, params, $sentry }) {
    try {
      const post = await $content('posts', params.slug).fetch()

      return { post }
    } catch (error) {
      $sentry.captureException(error)
    }
  },
  head() {
    const { title, description, featuredImageUrl } = this.post

    return {
      title: `m-gogo | ${title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: featuredImageUrl,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
      ],
    }
  },
}
</script>
