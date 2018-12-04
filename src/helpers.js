const fs = require('fs')
const {resolve} = require('path')

module.exports = {
  _images = [],

  getImages() {
    if (this._images) return this._images
    const images = fs.readdirSync(resolve(__dirname, '..', 'assets'))
      .filter(name => /jpg$/.test(name))
    this._images = images
    return images
  },
  getRandom() {
    const images = getImages()
    return images[Math.random() * images.length]
  },

  getByIndex(index) {
    if (index >= 0 && index < this._images.length) {
      return images[index]
    }
  }

}