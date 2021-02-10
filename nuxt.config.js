import {
  getContentRoutes,
  insertFeaturedImageToPost,
  uploadImagesToCloudinary,
} from './utils/config'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'm-gogo | Blog about my random thoughts',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          "Blog about anything that pops into my mind. Probably you will find some tech content here since I'm a Software Engineer.",
      },
      {
        'http-equiv': 'Accept-CH',
        content: 'DPR, Viewport-Width, Width',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@700&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/main.scss'],

  // SCSS resources
  styleResources: {
    scss: [
      '@/assets/styles/settings/_variables.scss',
      '@/assets/styles/tools/_mixins.scss',
    ],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://cloudinary.nuxtjs.org/
    '@nuxtjs/cloudinary',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Cloudinary module configuration (https://cloudinary.nuxtjs.org/options/)
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    useComponent: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  hooks: {
    'content:file:beforeInsert': async (document) => {
      await insertFeaturedImageToPost(document)
    },
    'build:before': async (nuxt) => {
      await uploadImagesToCloudinary()
    },
  },

  // Generate static files (https://content.nuxtjs.org/advanced/)
  generate: {
    async routes() {
      return await getContentRoutes()
    },
  },
}
