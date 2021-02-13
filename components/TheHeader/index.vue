<template>
  <header class="container the-header">
    <nuxt-link class="the-header__link-logo" to="/">
      <the-logo />
    </nuxt-link>
    <color-mode-picker />
  </header>
</template>

<script>
import dictionary from '@/utils/dictionary'

export default {
  name: 'TheHeader',
  data() {
    return {
      logo: dictionary?.icons?.brand?.logo,
    }
  },
}
</script>

<style lang="scss">
.the-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.the-header__link-logo {
  border: 0;
  outline: 2px dotted $transparent;
  transition: outline 0.3s ease-in-out;

  &:hover {
    border: 0;
    outline: 2px dotted $transparent;
  }

  &:focus {
    border: 0;
    outline: 2px dotted var(--accent);
  }
}
</style>
