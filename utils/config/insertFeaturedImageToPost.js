const insertFeaturedImageToPost = async (document) => {
  if (document.extension !== '.md' || !document.featuredImage) return

  const { $cloudinary } = require('@nuxtjs/cloudinary')

  const { featuredImage } = document

  const publicId = featuredImage.substring(0, featuredImage.lastIndexOf('.'))

  const folder = publicId
    .substr(0, publicId.lastIndexOf('/'))
    .replace('static', '')

  const asset = await $cloudinary.upload(featuredImage, {
    folder,
    use_filename: true,
    unique_filename: false,
    overwrite: false,
  })

  document.featuredImageUrl = asset.secure_url || {}
  document.featuredImage = asset.public_id || {}
}

export default insertFeaturedImageToPost
