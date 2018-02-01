var assert = require("assert")
var properties = require("../src/properties")

/**
* Functions to test
**/
var addRelativeCoords = properties._addRelativeCoords
var generateTabs = properties._generateTabs
var generatePropertiesObj = properties.generatePropertiesObj

describe("Properties File Tests", function() {
  it("should generate the correct relative coordinates for a jigsaw piece", function() {
    var piece = {
      "row": 1,
      "col": 1,
      "top": -1,
      "bottom": 1,
      "left": 0,
      "right": -1
    }

    var rows = 5
    var cols = 5

    var coordinates = addRelativeCoords(piece, rows, cols)

    assert.equal(coordinates.x, 1.5/5, "x coordinate incorrect.")
    assert.equal(coordinates.y, (1.5+(1/3))/5, "y coordinate incorrect.")
    assert.deepEqual(coordinates.topLeftCorner, {x: 1/5, y: 1/5}, "Top left cordner was incorrectly calculated.")
  })

  it("should generate the correct tabs on  middle piece", function() {
    var i = 3
    var j = 3
    var rows = 5
    var cols = 5
    // Pieces (2,3) and (3,2) need to be defined
    var properties = {
      "23": {
        bottom: 1 // tab down
      },
      "32": {
        right: -1 // tab left
      }
    }

    var piece = generateTabs(i, j, rows, cols, properties)

    // this piece must have a top tab and a left tab
    // bottom and right can be random
    assert.equal(piece.top, -1, "Piece generated did not have top inwards tab")
    assert.equal(piece.left, 1, "Piece generated did not have left outwards tab")
  })

  it("should generate a properties object with the correct number of elements", function() {
    var properties = generatePropertiesObj(5, 5)

    assert.equal(Object.keys(properties).length, 25, "Properties did not have correct number of elements")
  })

  it("should generate a properties object with no outwards tabs on the outside", function() {
    var properties = generatePropertiesObj(5, 5)

    for(var i=0; i<5; i++) {
      var top_row_piece = properties[""+0+i]
      var bottom_row_piece = properties[""+4+i]
      var right_col_piece = properties[""+i+4]
      var left_col_piece = properties[""+i+0]
      assert.equal(top_row_piece.top, 0, "Top row had a top tab")
      assert.equal(bottom_row_piece.bottom, 0, "Bottom row had a bottom tab")
      assert.equal(right_col_piece.right, 0, "Right col had a right tab")
      assert.equal(left_col_piece.left, 0, "Left col had a left tab")
    }
  })
})
