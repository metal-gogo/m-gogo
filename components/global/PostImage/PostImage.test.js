import wrapperFactoryBuilder from '@/tests/unit/wrapperFactoryBuilder.js'

import PostImage from './index.vue'

describe('@/components/global/PostImage', () => {
  const sampleProps = {
    src: '/images/posts/dummy-article/image.png',
    alt: 'Description of the image',
    title: 'Title of the image',
    width: 200,
    height: 200,
  }
  const wrapperFactory = wrapperFactoryBuilder(PostImage, {
    props: sampleProps,
  })
  const rootTag = 'FIGURE'
  const rootClass = 'post-image'

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

  it('must render an image to contain "src" passed as prop', () => {
    const img = wrapper.find('img')
    expect(img.attributes('src')).toContain(sampleProps.src)
  })

  it('must render an image with the "alt" passed as prop', () => {
    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe(sampleProps.alt)
  })

  it('must render "title" passed as prop', () => {
    expect(wrapper.text()).toContain(sampleProps.title)
  })
})
