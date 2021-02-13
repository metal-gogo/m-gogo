<template>
  <brand-icon class="the-logo" :name="logo" title="m-gogo logo" />
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
.the-logo {
  width: 6.55rem;
  height: 2.5rem;
  background: $lavender-white;
  border-radius: 64px;
}
</style>
