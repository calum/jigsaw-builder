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

  // load the image
  Jimp.read(imageLocation, function (err, image) {
    if (err) callback(err)

    var width = image.bitmap.width
    var height = image.bitmap.height

    // create the properties object
    var properties = generatePropertiesObj(size)
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
        var jigsawPiece = new Jimp(Math.ceil(widthOfPiece), Math.ceil(heightOfPiece), (err, jigsawPiece) => {

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
          jigsawPiece.write(destinationDir+''+i+j+'.png')
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
      callback(null)
    })
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
      properties[''+i+j].x = (j+0.5+(right-left)/6)/size
      properties[''+i+j].y = (i+0.5+(bottom-top)/6)/size

      properties[''+i+j].topLeftCorner = {
        x: (j-(left/12))/size,
        y: (i-(top/12))/size
      }

    }

  }

  return properties
}

/**
* This function tests whether or not
* the given pixel (x, y) should be coloured.
*
* i.e. checks if the pixel is within the boundary
* of the tab functions
*
* Returns true if the pixel is to be coloured
* and false if it should be left empty
**/
var tabFunction = {
  // This function at it's current form plots a top tab
  paramX: function(t) {
    var x = 1+t + (1/4)*Math.sin(4*Math.PI*t)
    return x
  },
  paramY: function(t) {
    var y = (1/4)*(Math.cos(2*Math.PI*t)-1)
    return y
  },
  inverse: function(y) {
    var t1 = (Math.acos((4*y)+1))/(2*Math.PI)
    var t2 = 1 - t1
    return [t1, t2]
  }
}
function shouldPixelBeColoured(x,y, properties, width, height, i, j, size) {
  /*
  var rightTab = (properties.right == 1) ? 1 : 0
  var leftTab = (properties.left == 1) ? 1 : 0
  var topTab = (properties.top == 1) ? 1 : 0
  var bottomTab = (properties.bottom == 1) ? 1 : 0
  */

  // convert each jigsaw piece into a square 3 units wide and 3 tall
  var relX = 3*(x - (width/size)*j)/(width/size)
  var relY = 3*(y - (height/size)*i)/(height/size)
  // width and height are referring to the whole image and not the individual
  // jigsaw piece (width/height is the jigsaw piece's width)

  // by default, the pixel should be coloured
  var colourPixel = true

  // top left corner
  if (relX < 0 && relY < 1) {
    return colourPixel = false
  }
  if (relX < 1 && relY < 0) {
    return colourPixel = false
  }

  // bottom left corner
  if (relX < 0 && relY > 2) {
    return colourPixel = false
  }
  if (relX <1 && relY > 3) {
    return colourPixel = false
  }

  // bottom right corner
  if (relX > 2 && relY > 3) {
    return colourPixel = false
  }
  if (relX > 3 && relY > 2) {
    return colourPixel = false
  }

  // top right corner
  if (relX > 2 && relY < 0) {
    return colourPixel = false
  }
  if (relX > 3 && relY < 1) {
    return colourPixel = false
  }

  /**
  * Top tab out
  **/
  if (relX >= 1 && relX <= 2 && relY <= 0) {
    if (relY < -0.5) {
      return colourPixel = false
    }
    var t = tabFunction.inverse(relY)

    var minX = tabFunction.paramX(t[0])
    var maxX = tabFunction.paramX(t[1])
    if (relX < minX || relX > maxX) {
      return colourPixel = false
    }
  }
  /**
  * Top tab in
  **/
  if (properties.top == -1 && relX >= 1 && relX <= 2 && relY >= 0 && relY <= 0.5) {

    var t = tabFunction.inverse(-relY)

    var minX = tabFunction.paramX(t[0])
    var maxX = tabFunction.paramX(t[1])
    if (relX > minX && relX < maxX) {
      return colourPixel = false
    }
  }

  /**
  * Bottom tab out
  **/
  if (relX >= 1 && relX <= 2 && relY >= 3) {

    var t = tabFunction.inverse(-relY+3)

    var minX = tabFunction.paramX(t[0])
    var maxX = tabFunction.paramX(t[1])
    if (relX < minX || relX > maxX) {
      return colourPixel = false
    }
  }
  /**
  * Bottom tab in
  **/
  if (properties.bottom == -1 && relX >= 1 && relX <= 2 && relY >= 2.5 && relY <= 3) {

    var t = tabFunction.inverse(relY-3)

    var minX = tabFunction.paramX(t[0])
    var maxX = tabFunction.paramX(t[1])
    if (relX > minX && relX < maxX) {
      return colourPixel = false
    }
  }

  /**
  * Left tab out
  **/
  if (relX <= 0 && relY >= 1 && relY <= 2) {

    var t = tabFunction.inverse(relX)

    var minY = tabFunction.paramX(t[0])
    var maxY = tabFunction.paramX(t[1])
    if (relY < minY || relY > maxY) {
      return colourPixel = false
    }
  }
  /**
  * Left tab in
  **/
  if (properties.left == -1 && relX >= 0 && relX <= 0.5 && relY >= 1 && relY <= 2) {

    var t = tabFunction.inverse(-relX)

    var minY = tabFunction.paramX(t[0])
    var maxY = tabFunction.paramX(t[1])
    if (relY > minY && relY < maxY) {
      return colourPixel = false
    }
  }

  /**
  * Right tab out
  **/
  if (relX >= 3 && relY >= 1 && relY <= 2) {

    var t = tabFunction.inverse(-relX+3)

    var minY = tabFunction.paramX(t[0])
    var maxY = tabFunction.paramX(t[1])
    if (relY < minY || relY > maxY) {
      return colourPixel = false
    }
  }
  /**
  * Right tab in
  **/
  if (properties.right == -1 && relX >= 2.5 && relX <= 3 && relY >= 1 && relY <= 2) {

    var t = tabFunction.inverse(relX-3)

    var minY = tabFunction.paramX(t[0])
    var maxY = tabFunction.paramX(t[1])
    if (relY > minY && relY < maxY) {
      return colourPixel = false
    }
  }


  // return true
  return colourPixel
}

module.exports.build = build
