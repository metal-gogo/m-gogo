<template>
  <svg-icon
    class="brand-icon"
    aria-labelledby="title"
    aria-describedby="desc"
    role="img"
    :name="name"
    :title="title"
    :desc="desc"
    :width="width"
    :height="height"
  />
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
      required: true,
    },
    desc: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 48,
    },
    height: {
      type: Number,
      default() {
        return this.width
      },
    },
  },
}
</script>
