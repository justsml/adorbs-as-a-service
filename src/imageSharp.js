const sharp = require('sharp')
const {HORIZONTAL_ALIGN_CENTER,
  VERTICAL_ALIGN_MIDDLE} = require('./constants.js')

const ImageFilters = {
  resize({width, height}) {
    return sharp()
    .resize(width, height)
    .on('error', err => console.error(err))
  },

  getMetadata({imagePath}) {
    return sharp(imagePath).metadata()
  },

  contain({width, height, alignBits = HORIZONTAL_ALIGN_CENTER | VERTICAL_ALIGN_MIDDLE}) {
      if (typeof width !== 'number' || typeof height !== 'number') {
        throw new Error('width and height must be numbers');
      }
      // alignBits = alignBits ||

      const hbits = alignBits & ((1 << 3) - 1);
      const vbits = alignBits >> 3;

      // check if more flags than one is in the bit sets
      if (
        !(
          (hbits !== 0 && !(hbits & (hbits - 1))) ||
          (vbits !== 0 && !(vbits & (vbits - 1)))
        )
      ) {
        return throwError.call(
          this,
          'only use one flag per alignment direction',
          cb
        );
      }

      const alignH = hbits >> 1; // 0, 1, 2
      const alignV = vbits >> 1; // 0, 1, 2

      const f = w / h > this.bitmap.width / this.bitmap.height
          ? h / this.bitmap.height
          : w / this.bitmap.width;

  },

  roundCorners({width, height, percent = 100}) {
    const roundedCorners = Buffer.from(`
    <svg>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${percent}" ry="${percent}" />
    </svg>`)

    const roundedCornerResizer = sharp()
    .resize(width, height)
    .overlayWith(roundedCorners, { cutout: true })
    // .png()

    return roundedCornerResizer
  }

}
