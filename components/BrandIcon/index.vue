<template>
  <figure class="brand-icon">
    <!-- eslint-disable vue/no-v-html -->
    <picture
      class="brand-icon__icon"
      v-html="require(`@/assets/svgs/${name}.svg?raw`)"
    />
    <!-- eslint-enable vue/no-v-html -->
    <figcaption class="brand-icon__figcaption">{{ title }}</figcaption>
  </figure>
</template>

<script>
import availableIcons from './availableIcons'

export default {
  name: 'BrandIcon',
  props: {
    name: {
      type: String,
      required: true,
      validator(name) {
        return availableIcons.includes(name)
      },
    },
    title: {
      type: String,
      default: '',
      // required: true,
    },
    desc: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.brand-icon {
  margin: 0;
}

.brand-icon__icon {
  display: block;

  svg {
    max-width: 100%;
    height: auto;
  }
}

.brand-icon__figcaption {
  @include visually-hidden;
}
</style>
