<template>
  <header class="container the-header">
    <nuxt-link class="the-header__link-logo" to="/">
      <brand-icon class="the-header__logo" :name="logo" title="home" />
    </nuxt-link>
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
.the-header__link-logo {
  border: 0;

  &:focus,
  &:hover {
    border: 0;
  }
}

.the-header__logo {
  width: 6.55rem;
  height: 2.5rem;
}
</style>
