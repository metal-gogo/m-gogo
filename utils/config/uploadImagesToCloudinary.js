import fs from 'fs'

const uploadImage = (file) => {
  const { $cloudinary } = require('@nuxtjs/cloudinary')

  if (fs.lstatSync(file).isDirectory()) {
    return null
  }

  const folder = file.substr(0, file.lastIndexOf('/')).replace('static', '')

  return $cloudinary.upload(file, {
    folder,
    use_filename: true,
    unique_filename: false,
    overwrite: false,
  })
}

const logUploadedFiles = (files) => {
  const newFiles = files.filter((files) => files && !files.existing)

  if (newFiles.length > 0) {
    // eslint-disable-next-line no-console
    console.log({ newFiles })
  }
  const previouslyUploadedFiles = files.length - newFiles.length

  // eslint-disable-next-line no-console
  console.log(
    `Previously uploaded files to Cloudinary: ${previouslyUploadedFiles}`
  )
}

const uploadImagesToCloudinary = () => {
  const glob = require('glob')
  const assetsFolder = 'static/images'
  const globPattern = `${assetsFolder}/**/*`
  glob(globPattern, async (error, files) => {
    if (error) {
      return
    }

    const uploadedFiles = await Promise.all(
      files.map((file) => uploadImage(file))
    )
    logUploadedFiles(uploadedFiles)
  })
}

export default uploadImagesToCloudinary
