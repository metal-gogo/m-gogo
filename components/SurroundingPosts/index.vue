<template>
  <nav class="surrounding-posts container">
    <NuxtLink
      v-if="prev"
      :to="{ name: 'posts-slug', params: { slug: prev.slug } }"
      class="surrounding-posts__link surrounding-posts__link--prev"
    >
      <brand-icon
        class="surrounding-posts__icon surrounding-posts__icon--prev"
        :name="arrow"
        title="Arrow icon pointing back"
      />
      {{ prev.title }}
    </NuxtLink>
    <div v-else />
    <!-- Added empty div to mantain the "Next Post" link on the end -->
    <NuxtLink
      v-if="next"
      :to="{ name: 'posts-slug', params: { slug: next.slug } }"
      class="surrounding-posts__link surrounding-posts__link--next"
    >
      {{ next.title }}
      <brand-icon
        class="surrounding-posts__icon surrounding-posts__icon--next"
        :name="arrow"
        title="Arrow icon pointing forward"
      />
    </NuxtLink>
  </nav>
</template>

<script>
import dictionary from '@/utils/dictionary'

export default {
  name: 'SurroundingPosts',
  props: {
    next: {
      type: Object,
      default: null,
    },
    prev: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      arrow: dictionary?.icons?.utilities?.arrow,
    }
  },
}
</script>

<style lang="scss">
.surrounding-posts {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  width: 100%;

  @media screen and (min-width: $breakpoint-small) {
    grid-template-columns: 1fr 1fr;
  }
}

.surrounding-posts__link {
  @include elevation(1);

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 0;
  border-radius: 6px;
  transition: 0.3s ease-in-out box-shadow;

  &:hover {
    @include elevation(4);

    border: 0;
  }
}

.surrounding-posts__link--prev {
  @media screen and (min-width: $breakpoint-small) {
    justify-content: flex-start;
  }
}

.surrounding-posts__link--next {
  @media screen and (min-width: $breakpoint-small) {
    justify-content: flex-end;
    text-align: right;
  }
}

.surrounding-posts__icon {
  width: 1.5rem;
  min-width: 1.5rem;
}

.surrounding-posts__icon--prev {
  transform: rotate(180deg);
}

// .surrounding-posts__icon--next {
// }
</style>
