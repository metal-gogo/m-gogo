import wrapperFactoryBuilder from '@/tests/unit/wrapperFactoryBuilder.js'

import PostVideo from './index.vue'

describe('@/components/global/PostVideo', () => {
  const sampleProps = {
    src: 'https://www.youtube.com/embed/_dummyId',
    title: 'Title of the video',
    width: 320,
    height: 180,
  }
  const wrapperFactory = wrapperFactoryBuilder(PostVideo, {
    props: sampleProps,
  })
  const rootTag = 'FIGURE'
  const rootClass = 'post-video'

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

  it('must render "title" passed as prop', () => {
    expect(wrapper.text()).toContain(sampleProps.title)
  })
})
