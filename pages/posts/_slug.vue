<template>
  <article class="container">
    <h1 class="title">{{ post.title }}</h1>
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
  head() {
    const { title, description } = this.post

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
