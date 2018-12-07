// From Dan's Guides: https://github.com/justsml/guides/tree/master/express/setup-guide
const sharp = require('sharp')
const router = module.exports = require('express').Router()
const helpers = require('../src/helpers.js')
const fs = require('fs')
const path = require('path')
const {getRandom, getByIndex,
  getImages, toSize,
  echoStream} = helpers

const kittens = getImages()

// console.log('files:', kittens)
// Standard CRUD routes:

router.get('/', getAll)
router.get('/:dimension1/:dimension2', resizeImage)


function resizeImage(req, res, next) {
  // console.log('getRandom()', getRandom())
  const rndImg = path.resolve('assets', getRandom())
  const options = {width: 420, height: 420}; // colorado defaults

  const {dimension1, dimension2} = req.params;
  const isWidth = s => `${s}`.toLowerCase().indexOf('w') > -1
  const isHeight = s => `${s}`.toLowerCase().indexOf('h') > -1
  if (isWidth(dimension1)) options.width = toSize(dimension1)
  if (isWidth(dimension2)) options.width = toSize(dimension2)
  if (isHeight(dimension1)) options.height = toSize(dimension1)
  if (isHeight(dimension2)) options.height = toSize(dimension2)
  // could break, missed cases, lets proceed! MVP!!!!

  const { rounded } = req.query

  res.type('jpg')

  fs.createReadStream(rndImg)
    .on('error', next)
    .pipe(ImageFilters.resize(options))
    .pipe(rounded > 0 && rounded <= 100 ? ImageFilters.roundCorners({...options, percent: rounded}) : echoStream())
    .pipe(res)

    // readableStream
    // .pipe(roundedCornerResizer)
    // .pipe(writableStream)

  // res.status(200).json({  })
}


const ImageFilters = {
  resize({width, height}) {
    return sharp()
    .resize(width, height, {
      // background: 'rgba(0, 0, 0, 255)',
      fit: 'contain',
      withoutEnlargement: true
    })
    // .gif()
    .on('error', err => console.error(err))
  },

  roundCorners({width, height, percent = 100}) {
    const roundedCorners = Buffer.from(`<svg>
    <rect x="0" y="0" width="${width}" height="${height}" rx="${percent}" ry="${percent}"/>
    </svg>`)

    const roundedCornerResizer = sharp()
    .resize(width, height, {
      fit: 'contain',
      withoutEnlargement: true
    })
    .overlayWith(roundedCorners, { cutout: true })
    // .png()

    return roundedCornerResizer
  }

}

function getAll(req, res, next) {
  res.send(`<h3>Go to the <a href='https://github.com/justsml/adorbs-as-a-service'>README for instructions</a></h3>
  <!--

  ${kittens}

  -->`)
}


