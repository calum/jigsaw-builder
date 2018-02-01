/**
* This function generates the properties object
* which is used to generate the jig-saw pieces
* and also saved to the same directory as the pieces.
*
* The propeties identifies the type of tabs each piece
* has on each edge.
*
* The properties also give the relative coordinates of
* each piece.
**/
function generatePropertiesObj(rows, cols) {
  var properties = {}

  var i
  var j

  for (i=0; i<rows; i++) {

    for (j=0; j<cols; j++) {

      // initialise the object
      properties[""+i+j] = generateTabs(i, j, rows, cols, properties)

      // add the coordinates
      properties[""+i+j] = addRelativeCoords(properties[""+i+j], rows, cols)

    }

  }

  return properties
}

/**
* This function will generate the tab information
* for each jigsaw piece.
**/
function generateTabs(i, j, rows, cols, properties) {
  var piece = {
    row: i,
    col: j
  }

  // Switch over the potential i values
  switch (i) {
    case (0):
      // This is a top row
      piece.top = 0
      piece.bottom = Math.round(Math.random())
      if (piece.bottom == 0)
        piece.bottom--
      break
    case (rows-1):
      // This is a bottom row
      piece.top = -1*properties[""+(i-1)+j].bottom
      piece.bottom = 0
      break
    default:
      piece.top = -1*properties[""+(i-1)+j].bottom
      piece.bottom = Math.round(Math.random())
      if (piece.bottom == 0)
        piece.bottom--
      break
  }

  // switch over the potential j values
  switch (j) {
    case 0:
      // Leftmost column
      piece.left = 0
      piece.right = Math.round(Math.random())
      if (piece.right == 0)
        piece.right--
      break
    case cols-1:
      // rightmost column
      piece.left = -1*properties[""+i+(j-1)].right
      piece.right = 0
      break
    default:
      piece.left = -1*properties[""+i+(j-1)].right
      piece.right = Math.round(Math.random())
      if (piece.right == 0)
        piece.right--
      break
  }

  return piece
}

/**
* Function to add coordinates onto the properties file
* for each jigsaw piece. The relative coordinates are used
* to place the pieces into their correct positions.
*
* The coordinates are adjusted depending on which sides
* of the piece have a tab.
**/
function addRelativeCoords(piece, rows, cols) {

  // piece.DIRECTION is either +1 or -1
  var right = piece.right +1
  var left = piece.left +1
  var top = piece.top +1
  var bottom = piece.bottom +1

  // if tab is outwards, then direction = 2.
  // if tab is inwards, then direction = 0.
  // if no tab, then direction = 0.
  right = (right == 1) ? 0 : right
  left = (left == 1) ? 0 : left
  top = (top == 1) ? 0 : top
  bottom = (bottom == 1) ? 0 : bottom

  // (j+0.5)/size is the real coordinate
  // but we need to adjust for the size of
  // the tabs which alter the dimensions of
  // the piece.
  piece.x = (piece.col+0.5+(right-left)/6)/cols
  piece.y = (piece.row+0.5+(bottom-top)/6)/rows

  piece.topLeftCorner = {
    x: (piece.col-(left/12))/cols,
    y: (piece.row-(top/12))/rows
  }

  return piece
}

module.exports = {
  generatePropertiesObj: generatePropertiesObj,

  // For testing
  _generateTabs: generateTabs,
  _addRelativeCoords: addRelativeCoords
}
