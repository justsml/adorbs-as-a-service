// From Dan's Guides: https://github.com/justsml/guides/tree/master/express/setup-guide
const router = module.exports = require('express').Router()
const helpers = require('../src/helpers.js')
const {getRandom, getByIndex, getImages} = helpers
const fs = require('fs')

const kittens = getImages()

// console.log('files:', kittens)
// Standard CRUD routes:

router.get('/', getAll)
router.get('/:dimension1/:dimension2', resizeImage)


function resizeImage(req, res, next) {

    // readableStream
    // .pipe(roundedCornerResizer)
    // .pipe(writableStream)

  res.status(200).json({  })
}


const ImageFilters = {
  resize({width, height}) {
    return sharp()
      .resize(width, height)
  },

  roundCorners({width, height, percent}) {
    const roundedCorners = Buffer.from(`<svg>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${percent}" ry="${percent}"/>
    </svg>`)

    const roundedCornerResizer = sharp()
      .resize(width, height)
      .overlayWith(roundedCorners, { cutout: true })
      .png()

    return roundedCornerResizer
  }

}

function getAll(req, res, next) {
  res.send(`<h3>Go to the <a href='https://github.com/justsml/adorbs-as-a-service'>README for instructions</a></h3>
  <!--

  ${kittens}

  -->`)
}
