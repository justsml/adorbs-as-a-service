const fs = require('fs')
const path = require('path')
const { Transform } = require('stream');




const helpers = {
  _images: [],

  echoStream: ({writableObjectMode = true} = {}) => new Transform({
    writableObjectMode: writableObjectMode,

    transform(chunk, encoding, callback) {
      // Echo the data
      callback(null, chunk);
    }
  }),

  toSize(str) {
    return parseInt(`${str}`.replace(/[^0-9]/g, ''), 10)
  },

  getImages() {
    if (helpers._images.length > 0) return helpers._images
    const images = fs.readdirSync(path.resolve(__dirname, '..', 'assets'))
      .filter(name => /jpg$/.test(name))
    // console.log('images')
    helpers._images = images
    return images
  },
  getRandom() {
    const images = helpers.getImages()
    const idx = Math.floor(Math.random() * images.length)
    console.log('idx:', idx, images.length)
    return images[idx]
  },

  getByIndex(index) {
    if (index >= 0 && index < helpers._images.length) {
      return images[index]
    }
  }

}


module.exports = helpers
