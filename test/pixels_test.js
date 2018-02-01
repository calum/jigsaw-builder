var pixels = require("../src/pixels")
var assert = require("assert")

/**
*  Function to test
**/
var shouldPixelBeColoured = pixels.shouldPixelBeColoured

describe("Pixel manipulation tests", function() {
  it("should identify a pixel to be left blank correctly", function() {
    var properties = {
      top: -1
    }
    var width = 250
    var height = 250
    var i = 2
    var j = 2
    var rows = 5
    var columns = 5

    // each piece is roughly 50 pixels by 50 pixels
    var x = 125
    var y = 105

    // (x, y) is a point within the inverted top tab so should be blank
    assert(!shouldPixelBeColoured(x, y, properties, width, height, i, j, rows, columns))
  })

  it("should identify a pixel to be coloured correctly", function() {
    var properties = {
      top: 1
    }
    var width = 250
    var height = 250
    var i = 2
    var j = 2
    var rows = 5
    var columns = 5

    // each piece is roughly 50 pixels by 50 pixels
    var x = 125
    var y = 95

    // (x, y) is a point within the inverted top tab so should be blank
    assert(shouldPixelBeColoured(x, y, properties, width, height, i, j, rows, columns))
  })
})
