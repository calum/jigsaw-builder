var Jimp = require('jimp')
var fs = require('fs')

var asyncLoop = require('./src/async.js').asyncLoop

/**
* This is the main method used to generate
* jig-saws.
*
* The parametisation used to create the jig-saw tabs is as follows:
*   x = t + (1/4)sin(4pi*t),
*   y = (1/4)(cos(2pi*t)-1),
*   where 0 < t < 1.
*
* Parameters:
*   - size:
*       the number of desired pieces (e.g. a size of 8 generates an 8*8 jigsaw)
*   - imageLocation:
*       the location of the desired image (e.g. './cats/funnyCat.png')
*   - destinationDir:
*       the location where the jig-saw and properties are stored
*   - callback:
*       the function to be called upon completion
**/
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
    asyncLoop(size, 0, (i, next) => {
      asyncLoop(size, 0, (j, next) => {

        // Determine if this piece has tabs sticking out
        var rightTab = (properties[''+i+j].right == 1) ? 1 : 0
        var leftTab = (properties[''+i+j].left == 1) ? 1 : 0
        var topTab = (properties[''+i+j].top == 1) ? 1 : 0
        var bottomTab = (properties[''+i+j].bottom == 1) ? 1 : 0

        // Add 1/6th the relative size for each tab that sticks out
        var widthOfPiece = Math.round((width/size)*(1+((rightTab+leftTab)/6)))
        var heightOfPiece = Math.round((height/size)*(1+((topTab+bottomTab)/6)))

        // Create the jig-saw piece
        var jigsawPiece = new Jimp(widthOfPiece, heightOfPiece, (err, jigsawPiece) => {

          if (err) {
            return next(err)
          }

          // colour each pixel using the parametisation
          var x
          var y
          for (x = 0; x < widthOfPiece; x++) {
            for (y =0; y < heightOfPiece; y++) {

              jigsawPiece.setPixelColor(image.getPixelColor(x, y), x, y)

            }
          }

          // Save these piece to file:
          jigsawPiece.write(destinationDir+''+i+j+'.png')
          next()
        })

      }, (err) => {
        // executes when above is completed
        if (err) next(err)
        next()
      })
    }, (err) => {
      // executes when above is completed
      if (err) callback(err)
      callback(null)
    })
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
