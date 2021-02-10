import fs from 'fs'

const uploadImagesToCloudinary = () => {
  const glob = require('glob')
  const { $cloudinary } = require('@nuxtjs/cloudinary')
  const assetsFolder = 'static/images'
  const globPattern = `${assetsFolder}/**/*`
  glob(globPattern, async (error, files) => {
    if (error) {
      return
    }

    const uploadedFiles = await Promise.all(
      files.map((file) => {
        if (fs.lstatSync(file).isDirectory()) {
          return null
        }

        const folder = file
          .substr(0, file.lastIndexOf('/'))
          .replace('static', '')

        return $cloudinary.upload(file, {
          folder,
          use_filename: true,
          unique_filename: false,
          overwrite: false,
        })
      })
    )
    const newFiles = uploadedFiles.filter(
      (uploadedFile) => uploadedFile && !uploadedFile.existing
    )
    // eslint-disable-next-line no-console
    console.log({ newFiles })
  })
}

export default uploadImagesToCloudinary
