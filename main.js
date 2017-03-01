var Jimp = require('jimp')

function createImage() {
  var image = new Jimp(256,256, (err, image) => {
    if (err)
      return console.error(err)

    var i
    var j
    for (i=0; i<256; i++) {
      for (j=0; j<256; j++) {
        image.setPixelColor(Jimp.rgbaToInt(i%255,j%255,(i+j)%255,255), i, j)
      }
    }

    image.write('./examples/test.png')
  })
}

function createOutline() {
  var image = new Jimp(256,256, (err, image) => {
    if (err)
      return console.error(err)

    var i
    var j
    for (i=0; i<256; i++) {
      for (j=0; j<256; j++) {
        image.setPixelColor(Jimp.rgbaToInt(i%255,j%255,(i+j)%255,255), i, j)
      }
    }

    image.write('./examples/test.png')
  })
}

function generatePropertiesFile() {
  var properties = {}

  var i
  var j
  for (i=0; i<16; i++) {
    for (j=0; j<16; j++) {
      properties[''+i+j]["top"] = 1
      properties[''+i+j]["bottom"] = 1
      properties[''+i+j]["left"] = 1
      properties[''+i+j]["right"] = 1
      properties[''+i+j]["coord"] = 1
    }
  }
}
