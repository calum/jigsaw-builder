var Jimp = require('jimp')
var fs = require('fs')

var asyncLoop = require('./async.js').asyncLoop
var generatePropertiesObj = require('./properties').generatePropertiesObj
var shouldPixelBeColoured = require('./pixels').shouldPixelBeColoured

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

  // make sure the destination directory exists
  fs.mkdir(destinationDir, function() {
    // ignore any errors here
  })

  // load the image
  Jimp.read(imageLocation, function (err, image) {
    if (err) callback(err)

    var width = image.bitmap.width
    var height = image.bitmap.height

    // create the properties object
    var properties = generatePropertiesObj(size, size)
    properties.overview = {
      height: height,
      width: width,
      horizontalPieces: size,
      verticalPieces: size
    }

    // write the properties file
    fs.writeFile(
      destinationDir+'properties.json',
      JSON.stringify(properties,null,2),
      'utf-8'
    );

    // create an array of promises to fulfill when all the pieces
    // are finished being saved
    var promises = []

    // Loop over each new image segment:
    asyncLoop(size, 0, (i, next) => {
      asyncLoop(size, 0, (j, next) => {

        // determine the types of tabs for this piece:
        // ( -1 means inner tab, +1 means outer tab, 0 means no tab)
        var right = properties[''+i+j].right
        var left = properties[''+i+j].left
        var top = properties[''+i+j].top
        var bottom = properties[''+i+j].bottom

        // Determine which tabs are sticking out
        var rightTab = (right == 1) ? 1 : 0
        var leftTab = (left == 1) ? 1 : 0
        var topTab = (top == 1) ? 1 : 0
        var bottomTab = (bottom == 1) ? 1 : 0

        // Add 1/6th the relative size for each tab that sticks out
        var widthOfPiece = ((width/size)*(1+((rightTab+leftTab)/6)))
        var heightOfPiece = ((height/size)*(1+((topTab+bottomTab)/6)))

        // Create the jig-saw piece
        new Jimp(Math.ceil(widthOfPiece), Math.ceil(heightOfPiece), (err, jigsawPiece) => {

          if (err) {
            return next(err)
          }

          // colour each pixel using the parametisation
          var x
          var y
          for (x = 0; x < widthOfPiece; x++) {
            for (y =0; y < heightOfPiece; y++) {

              var pixelX = x + (width/size)*j - leftTab*(width/size)/6
              var pixelY = y + (height/size)*i - topTab*(height/size)/6
              if (shouldPixelBeColoured(pixelX, pixelY, properties[''+i+j], width, height, i, j, size)) {
                try {
                  jigsawPiece.setPixelColor(image.getPixelColor( Math.floor(pixelX), Math.floor(pixelY)), x, y)
                } catch (err) {
                  console.log('image.getPixelColor( '+pixelX+', '+pixelY+')')
                  console.log('piece: '+i+j)
                  console.log('(x,y) = ('+x+', '+y+')')
                  console.log('width and height: '+width+', '+height)
                  return next(err)
                }
              }

            }
          }

          // Save these piece to file:
          var promise = new Promise(function(done) {
            jigsawPiece.write(destinationDir+''+i+j+'.png', () => {
              done()
            })
          })

          promises.push(promise)
          next()
        })

      }, (err) => {
        // executes when above is completed
        if (err) return callback(err)
        next()
      })
    }, (err) => {
      // executes when above is completed
      if (err) callback(err)

      // wait for the promises to complete:
      Promise.all(promises).then(() => {
        callback(null)
      })
    })
  })
}

module.exports.build = build
