<template>
  <footer class="the-footer container">
    <div class="the-footer__built-message">
      <span>Crafted with</span>
      <brand-icon
        class="the-footer__heart-icon"
        :name="heart"
        title="Heart icon"
      />
      <span>from Mexico</span>
    </div>
    <the-footer-acknowledgments />
  </footer>
</template>

<script>
import dictionary from '@/utils/dictionary'

export default {
  name: 'TheFooter',
  data() {
    return {
      heart: dictionary?.icons?.utilities?.heart,
    }
  },
}
</script>

<style lang="scss">
.the-footer {
  align-items: center;
  border-top: 2px solid var(--accent);
}

.the-footer__built-message {
  display: flex;
  align-items: center;
  justify-content: center;
}

.the-footer__heart-icon {
  width: 1.5rem;
  margin: 0 0.3rem;
}
</style>
