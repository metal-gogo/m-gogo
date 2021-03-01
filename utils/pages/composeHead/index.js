import { isEmpty, isNil } from 'ramda'

const composeHead = ({
  title = 'Blog about my random thoughts',
  description = "Blog about anything that pops into my mind. Probably you will find some tech content here since I'm a Software Engineer.",
  featuredImageUrl,
} = {}) => {
  const meta = [
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
    // Open Graph
    { hid: 'og:title', property: 'og:title', content: title },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description,
    },
    // Twitter Card
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: title,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description,
    },
  ]

  if (!isNil(featuredImageUrl) && !isEmpty(featuredImageUrl)) {
    meta.push({
      hid: 'og:image',
      property: 'og:image',
      content: featuredImageUrl,
    })
  }

  return {
    title: `${title} | m-gogo`,
    meta,
  }
}

export default composeHead
