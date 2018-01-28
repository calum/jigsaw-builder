var properties = require('../src/properties')

var assert = require('assert')

describe('Properties File Tests', function() {
  it('should generate the correct relative coordinates for a jigsaw piece', function() {
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

    var coordinates = properties._addRelativeCoords(piece, rows, cols)

    assert.equal(coordinates.x, 1.5/5, "x coordinate incorrect.")
    assert.equal(coordinates.y, (1.5+(1/3))/5, "y coordinate incorrect.")
    assert.deepEqual(coordinates.topLeftCorner, {x: 1/5, y: 1/5}, "Top left cordner was incorrectly calculated.")
  })

  xit('should generate the correct tabs on  middle piece', function() {

  })

  xit('should generate a properties object correctly', function() {

  })
})
