import wrapperFactoryBuilder from '@/tests/unit/wrapperFactoryBuilder.js'

import ArticleContent from './index.vue'

describe('@/components/ArticleContent', () => {
  const samplePost = {
    dir: '/posts',
    path: '/posts/my-first-blog-post',
    extension: '.md',
    slug: 'my-first-blog-post',
    createdAt: '2020-06-22T10:58:51.640Z',
    updatedAt: '2020-06-22T10:59:27.863Z',
    title: 'Blog title',
    description: 'Blog description',
  }
  const wrapperFactory = wrapperFactoryBuilder(ArticleContent, {
    props: {
      post: samplePost,
    },
  })
  const rootTag = 'NUXT-CONTENT-STUB' // we are stubbing the <nuxt-content> component
  const rootClass = 'article-content'

  let wrapper

  beforeEach(() => {
    wrapper = wrapperFactory()
  })

  it(`must be wrapped on a "<${rootTag.toLowerCase()}>" tag`, () => {
    expect(wrapper.element.tagName).toEqual(rootTag)
  })

  it(`the wrapper tag must have a "${rootClass}" class`, () => {
    expect(wrapper.classes()).toContain(rootClass)
  })
})
