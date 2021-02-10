const CldImageStub = {
  name: 'cld-image',
  props: {
    alt: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  render(createElement) {
    return createElement('div', [
      createElement('img', {
        attrs: {
          src: this.publicId,
          alt: this.alt,
        },
      }),
    ])
  },
}

export default CldImageStub
