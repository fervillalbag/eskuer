module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  env: {
    API_URL: process.env.API_URL,
    URL_CLOUDINARY: process.env.URL_CLOUDINARY,
    SUPERMARKET_CLOUDINARY_PRESET: process.env.SUPERMARKET_CLOUDINARY_PRESET,
    PRODUCT_CLOUDINARY_PRESET: process.env.PRODUCT_CLOUDINARY_PRESET,
    POST_CLOUDINARY_PRESET: process.env.POST_CLOUDINARY_PRESET
  }
}
