// From Dan's Guides: https://github.com/justsml/guides/tree/master/express/setup-guide
const router = module.exports = require('express').Router()
const fs = require('fs')
const path = require('path')

const imageJimp = require('../src/imageJimp.js')
const imageSharp = require('../src/imageSharp.js')
const helpers = require('../src/helpers.js')
const {getRandom, getByIndex,
  getImages, toSize,
  echoStream} = helpers

router.get('/', getOptions, getAll)
router.get('/:dimension1/:dimension2', getOptions, resizeSharp)

function getOptions(req, res, next) {
  const {dimension1, dimension2} = req.params
  const options = {
    width: 420, height: 420,
    rounded: null,
    outputType: 'jpg',
    resizeMode: 'cover'
  }
  options.imagePath = path.resolve('assets', getRandom())

  const isWidth = s => `${s}`.toLowerCase().indexOf('w') > -1
  const isHeight = s => `${s}`.toLowerCase().indexOf('h') > -1
  if (isWidth(dimension1)) options.width = toSize(dimension1)
  if (isWidth(dimension2)) options.width = toSize(dimension2)
  if (isHeight(dimension1)) options.height = toSize(dimension1)
  if (isHeight(dimension2)) options.height = toSize(dimension2)
  // could break, missed cases, lets proceed! MVP!!!!
  req.options = options

  next()
}

function resizeSharp(req, res, next) {
  if (!req.options || !req.options.width) return next(new Error('Invalid Options - Make sure Query Params are Parsed Correctly.'))
  const { imagePath, rounded, outputType, resizeMode } = req.options

  res.type(outputType || 'jpg')

  console.time('sharp.resize')
  fs.createReadStream(imagePath)
    .on('error', next)
    .on('end', () => console.timeEnd('sharp.resize'))
    .pipe(ImageFilters.resize(req.options))
    .pipe(rounded > 0 && rounded <= 500 ? ImageFilters.roundCorners({...options, percent: rounded}) : echoStream())
    .pipe(res)
}

function resizeJimp(req, res, next) {
  if (!req.options || !req.options.width) return next(new Error('Invalid Options - Make sure Query Params are Parsed Correctly.'))

  const { imagePath, rounded, outputType, resizeMode } = req.options

  res.type(outputType || 'jpg')
  console.time('jimp.resize')
  res.on('finish', () => console.timeEnd('jimp.resize'))
  imageSharp.resizeCover(req.options)
    .then(buf => res.send(buf))
    .catch(next)
}



function getAll(req, res, next) {
  res.send(`<h3>Go to the <a href='https://github.com/justsml/adorbs-as-a-service'>README for instructions</a></h3>
  <!--

  ${getImages()}

  -->`)
}


