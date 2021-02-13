<template>
  <div>
    <the-header />
    <Nuxt />
    <the-footer />
  </div>
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition-timing-function: ease-in-out;
  transition-duration: 500ms;
  transition-property: opacity;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
