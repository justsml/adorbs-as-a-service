const Jimp = require('jimp');

module.exports = { resizeCover }

function resizeCover({
  imagePath,
  width, height,
  quality = 80,
  outputType = 'jpg'
}) {

  return Jimp.read(imagePath)
    .then(img => {
      return img
        .clone()
        .contain(width, height) // resize
        // .quality(quality) // set JPEG quality
        .getBufferAsync(outputType === 'jpg' ? Jimp.MIME_JPEG : Jimp.MIME_GIF)
    })
}

