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
function shouldPixelBeColoured(x, y, properties, width, height, i, j, rows, columns) {
  // convert each jigsaw piece into a square 3 units wide and 3 tall
  var relX = 3*(x - (width/columns)*j)/(width/columns)
  var relY = 3*(y - (height/rows)*i)/(height/rows)
  // width and height are referring to the whole image and not the individual
  // jigsaw piece (width/height is the jigsaw piece's width)

  // by default, the pixel should be coloured
  var colourPixel = true

  // top left corner
  if (relX < 0 && relY < 1) {
    return false
  }
  if (relX < 1 && relY < 0) {
    return false
  }

  // bottom left corner
  if (relX < 0 && relY > 2) {
    return false
  }
  if (relX <1 && relY > 3) {
    return false
  }

  // bottom right corner
  if (relX > 2 && relY > 3) {
    return false
  }
  if (relX > 3 && relY > 2) {
    return false
  }

  // top right corner
  if (relX > 2 && relY < 0) {
    return false
  }
  if (relX > 3 && relY < 1) {
    return false
  }

  // This will hold the values of the tabFunction
  var t
  var minX
  var maxX
  var minY
  var maxY

  /**
  * Top tab out
  **/
  if (relX >= 1 && relX <= 2 && relY <= 0) {
    if (relY < -0.5) {
      return false
    }
    t = tabFunction.inverse(relY)

    minX = tabFunction.paramX(t[0])
    maxX = tabFunction.paramX(t[1])
    if (relX < minX || relX > maxX) {
      return false
    }
  }
  /**
  * Top tab in
  **/
  if (properties.top == -1 && relX >= 1 && relX <= 2 && relY >= 0 && relY <= 0.5) {

    t = tabFunction.inverse(-relY)

    minX = tabFunction.paramX(t[0])
    maxX = tabFunction.paramX(t[1])
    if (relX > minX && relX < maxX) {
      return false
    }
  }

  /**
  * Bottom tab out
  **/
  if (relX >= 1 && relX <= 2 && relY >= 3) {

    t = tabFunction.inverse(-relY+3)

    minX = tabFunction.paramX(t[0])
    maxX = tabFunction.paramX(t[1])
    if (relX < minX || relX > maxX) {
      return false
    }
  }
  /**
  * Bottom tab in
  **/
  if (properties.bottom == -1 && relX >= 1 && relX <= 2 && relY >= 2.5 && relY <= 3) {

    t = tabFunction.inverse(relY-3)

    minX = tabFunction.paramX(t[0])
    maxX = tabFunction.paramX(t[1])
    if (relX > minX && relX < maxX) {
      return false
    }
  }

  /**
  * Left tab out
  **/
  if (relX <= 0 && relY >= 1 && relY <= 2) {

    t = tabFunction.inverse(relX)

    minY = tabFunction.paramX(t[0])
    maxY = tabFunction.paramX(t[1])
    if (relY < minY || relY > maxY) {
      return false
    }
  }
  /**
  * Left tab in
  **/
  if (properties.left == -1 && relX >= 0 && relX <= 0.5 && relY >= 1 && relY <= 2) {

    t = tabFunction.inverse(-relX)

    minY = tabFunction.paramX(t[0])
    maxY = tabFunction.paramX(t[1])
    if (relY > minY && relY < maxY) {
      return false
    }
  }

  /**
  * Right tab out
  **/
  if (relX >= 3 && relY >= 1 && relY <= 2) {

    t = tabFunction.inverse(-relX+3)

    minY = tabFunction.paramX(t[0])
    maxY = tabFunction.paramX(t[1])
    if (relY < minY || relY > maxY) {
      return false
    }
  }
  /**
  * Right tab in
  **/
  if (properties.right == -1 && relX >= 2.5 && relX <= 3 && relY >= 1 && relY <= 2) {

    t = tabFunction.inverse(relX-3)

    minY = tabFunction.paramX(t[0])
    maxY = tabFunction.paramX(t[1])
    if (relY > minY && relY < maxY) {
      return false
    }
  }


  // return true
  return colourPixel
}

module.exports.shouldPixelBeColoured = shouldPixelBeColoured
