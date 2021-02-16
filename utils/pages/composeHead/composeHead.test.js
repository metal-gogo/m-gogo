import composeHead from './index'

describe('@/utils/pages/composeHead', () => {
  const defaultTitle = 'Blog about my random thoughts'
  const defaultDescription =
    "Blog about anything that pops into my mind. Probably you will find some tech content here since I'm a Software Engineer."

  it('composes the head metadata with default values', () => {
    const composedHead = composeHead()
    const expectedHead = {
      title: `m-gogo | ${defaultTitle}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: defaultDescription,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: defaultTitle,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: defaultDescription,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: defaultTitle,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: defaultDescription,
        },
      ],
    }
    expect(composedHead).toEqual(expectedHead)
  })

  it('includes the "og:image" property if a featured image is passed to the function', () => {
    const dummyFeaturedImage = 'https://dummy.url'
    const composedHead = composeHead({ featuredImageUrl: dummyFeaturedImage })
    expect(composedHead.meta).toContainEqual({
      hid: 'og:image',
      property: 'og:image',
      content: dummyFeaturedImage,
    })
  })

  it('includes the title passed to the function on the "title", "og:title" and "twitter:title"', () => {
    const dummyTitle = 'Dummy title'
    const composedHead = composeHead({ title: dummyTitle })
    expect(composedHead.title).toContain(dummyTitle)
    expect(composedHead.meta).toContainEqual({
      hid: 'og:title',
      property: 'og:title',
      content: dummyTitle,
    })
    expect(composedHead.meta).toContainEqual({
      hid: 'twitter:title',
      name: 'twitter:title',
      content: dummyTitle,
    })
  })

  it('includes the description passed to the function on the "description", "og:description" and "twitter:description"', () => {
    const dummyDescription = 'Dummy long description in here'
    const composedHead = composeHead({ description: dummyDescription })
    expect(composedHead.meta).toContainEqual({
      hid: 'description',
      name: 'description',
      content: dummyDescription,
    })
    expect(composedHead.meta).toContainEqual({
      hid: 'og:description',
      property: 'og:description',
      content: dummyDescription,
    })
    expect(composedHead.meta).toContainEqual({
      hid: 'twitter:description',
      name: 'twitter:description',
      content: dummyDescription,
    })
  })
})
