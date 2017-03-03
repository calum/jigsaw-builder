var Jimp = require('jimp')
var fs = require('fs')

var asyncLoop = require('./src/async.js').asyncLoop

function build(size, imageLocation, destinationDir, callback) {

  // create the properties object
  var properties = generatePropertiesObj(size)

  // write the properties file
  fs.writeFile(
    destinationDir+'properties.json',
    JSON.stringify(properties,null,2),
    'utf-8'
  );

  // load the image
  Jimp.read(imageLocation, function (err, image) {
    if (err) callback(err)

    var width = image.bitmap.width
    var height = image.bitmap.height

    // Loop over each new image segment:
    var i = 0
    var j = 0
    asyncLoop(size, i, () => {
      asyncLoop(size, j, () => {

        var jigsawPiece = new Jimp(width/size, height/size, (jigsawPiece) => {
          // colour each pixel using the parametisation
          // set each image width and height depending on the properties file
          // add extra pixels to the width and heigh depending on where the tabs
          // are
        })

      }, () => {
        // executes when above is completed
      })
    }, () => {
      // executes when above is completed
    })
    callback(null)
  })
}

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

/**
* This function generates the properties object
* which is used to generate the jig-saw pieces
* and also saved to the same directory as the pieces.
*
* The propeties identifies type of tab each pieces
* has on each edge.
*
* The properties also give the relative coordinates of
* each piece.
**/
function generatePropertiesObj(size) {
  var properties = {}

  var i
  var j

  for (i=0; i<size; i++) {

    for (j=0; j<size; j++) {
      // initialise the object
      properties[''+i+j] = {}

      // Switch over the potential i values
      switch (i) {
        case (0):
          properties[''+i+j].top = 0
          properties[''+i+j].bottom = Math.round(Math.random())
          if (properties[''+i+j].bottom == 0)
            properties[''+i+j].bottom--
          break
        case (size-1):
          properties[''+i+j].top = -1*properties[''+(i-1)+j].bottom
          properties[''+i+j].bottom = 0
          break
        default:
          properties[''+i+j].top = -1*properties[''+(i-1)+j].bottom
          properties[''+i+j].bottom = Math.round(Math.random())
          if (properties[''+i+j].bottom == 0)
            properties[''+i+j].bottom--
          break
      }

      // switch over the potential j values
      switch (j) {
        case 0:
          properties[''+i+j].left = 0
          properties[''+i+j].right = Math.round(Math.random())
          if (properties[''+i+j].right == 0)
            properties[''+i+j].right--
          break
        case size-1:
          properties[''+i+j].left = -1*properties[''+i+(j-1)].right
          properties[''+i+j].right = 0
          break
        default:
          properties[''+i+j].left = -1*properties[''+i+(j-1)].right
          properties[''+i+j].right = Math.round(Math.random())
          if (properties[''+i+j].right == 0)
            properties[''+i+j].right--
          break
      }

      // set the relative coordinates
      var right = properties[''+i+j].right +1
      var left = properties[''+i+j].left +1
      var top = properties[''+i+j].top +1
      var bottom = properties[''+i+j].bottom +1

      right = (right == 1) ? 0 : right
      left = (left == 1) ? 0 : left
      top = (top == 1) ? 0 : top
      bottom = (bottom == 1) ? 0 : bottom

      // (j+0.5)/size is the real coordinate
      // but we need to adjust for the size of
      // the tabs which alter the dimensions of
      // the piece.
      properties[''+i+j].x = (j+0.5)/size + ((right - left)/2)/12
      properties[''+i+j].y = (i+0.5)/size + ((bottom - top)/2)/12

    }

  }

  return properties
}

module.exports.build = build
