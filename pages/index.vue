<template>
  <main class="container">
    <h1 class="title">M-GoGo blog</h1>
    <article-content :post="post" />
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content, params }) {
    const post = await $content('/', 'homepage').fetch()

    return { post }
  },
}
</script>
