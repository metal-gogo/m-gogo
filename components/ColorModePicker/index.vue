<template>
  <button class="color-mode__button" @click="toggleColorMode">
    <brand-icon class="color-mode__icon" :name="sunAndMoon" :title="title" />
  </button>
</template>

<script>
import dictionary from '@/utils/dictionary'
import availableColorModes from './availableColorModes'

export default {
  name: 'ColorModePicker',
  data() {
    return {
      sunAndMoon: dictionary?.icons?.utilities?.sunAndMoon,
    }
  },
  computed: {
    title() {
      return `Click to toggle the color mode. The current preference is "${this.$colorMode.preference}"`
    },
  },
  methods: {
    toggleColorMode() {
      const currentColorMode = availableColorModes.indexOf(
        this.$colorMode.value
      )
      const nextColorMode = (currentColorMode + 1) % availableColorModes.length
      this.$colorMode.preference = availableColorModes[nextColorMode]
    },
  },
}
</script>

<style lang="scss">
.color-mode__button {
  padding: 0;
  background: $transparent;
  border: 0;

  &:hover {
    background-color: $transparent;

    .light-mode & {
      background-color: $transparent;
    }
  }
}

.color-mode__icon {
  width: 2.5rem;
  height: 2.5rem;

  path {
    stroke: var(--accent);
    transition: stroke 0.3s ease-in-out;
  }

  &:hover {
    path {
      stroke: $light-color;

      .light-mode & {
        stroke: $dark-color;
      }
    }
  }
}
</style>
