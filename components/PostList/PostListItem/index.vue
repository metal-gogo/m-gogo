<template>
  <li class="post-list-item">
    <nuxt-link
      :to="postSlug"
      class="post-list-item__link"
      :aria-labelledby="postTitleId"
    >
      <div class="post-list-item__image-container">
        <post-image
          :src="featuredImage"
          :alt="''"
          :title="''"
          :width="364"
          :height="182"
          crop-type="pad"
          background="#ba7cf0"
          class="post-list-item__image"
        >
          <template #transformations>
            <cld-transformation
              width="972"
              height="972"
              crop="pad"
              background="black"
            />
            <cld-transformation
              fetch-format="auto"
              quality="auto"
              loading="lazy"
            />
            <cld-transformation gravity="north" />
          </template>
        </post-image>
      </div>
      <article class="post-list-item__article">
        <h3 :id="postTitleId" class="post-list-item__title">
          {{ title }}
        </h3>
        <p class="post-list-item__summary">{{ summary }}</p>
      </article>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'PostListItem',
  props: {
    featuredImage: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    postSlug() {
      return `posts/${this.slug}/`
    },
    postTitleId() {
      return `title_${this.slug}`
    },
  },
}
</script>

<style lang="scss">
.post-list-item {
  margin-bottom: 0;
  background-color: $black-100;
  border-radius: 6px;
}

.post-list-item__link {
  @include elevation(2);

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border: 0;
  border-radius: 6px;
  transition: 0.3s ease-in-out box-shadow;

  &:hover {
    @include elevation(8);

    border: 0;
  }
}

.post-list-item__image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10.11rem;
  overflow: hidden;

  .post-list-item__image {
    margin: 0;
  }
}

.post-list-item__article {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
  background-color: var(--text-color);
}

.post-list-item__title {
  margin-bottom: 0.5rem;
  color: var(--bg-color);
}

.post-list-item__summary {
  @include body-2;

  margin-bottom: 0;
  color: var(--bg-color);
}
</style>
