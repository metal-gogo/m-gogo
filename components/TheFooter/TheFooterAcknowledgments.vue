<template>
  <div class="the-footer-acknowledgments">
    <p><strong>Acknowledgments</strong></p>
    <ul class="the-footer-acknowledgments__list">
      <li
        v-for="acknowledgment in acknowledgments"
        :key="acknowledgment.link"
        class="the-footer-acknowledgments__list-item"
      >
        {{ acknowledgment.element }}
        <a
          :href="acknowledgment.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ acknowledgment.company }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TheFooterAcknowledgments',
  data() {
    return {
      acknowledgments: [
        {
          element: 'Built with',
          company: 'NuxtJS',
          link: 'https://nuxtjs.org/',
        },
        {
          element: 'Icons by',
          company: 'Orion Icon Library',
          link: 'https://orioniconlibrary.com',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.the-footer-acknowledgments {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
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
}
</style>
