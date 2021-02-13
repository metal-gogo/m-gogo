<template>
  <section class="the-footer-acknowledgments">
    <p><strong>Acknowledgments</strong></p>
    <client-only placeholder="Loading image">
      <ul class="the-footer-acknowledgments__list">
        <li
          v-for="acknowledgment in acknowledgments"
          :key="acknowledgment.link"
          class="the-footer-acknowledgments__list-item"
        >
          <span>{{ acknowledgment.element }}</span>
          <a
            :href="acknowledgment.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ acknowledgment.company }}
          </a>
        </li>
      </ul>
    </client-only>
  </section>
</template>

<script>
import acknowledgments from './acknowledgments'

export default {
  name: 'TheFooterAcknowledgments',
  data() {
    return {
      acknowledgments,
    }
  },
}
</script>

<style lang="scss">
.the-footer-acknowledgments {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 0;
}

.the-footer-acknowledgments__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  list-style-type: none;
}

.the-footer-acknowledgments__list-item {
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
