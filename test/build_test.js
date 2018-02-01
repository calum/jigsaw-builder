var jigsawBuilder = require("../")
var path = require("path")
var fs = require("fs")

/**
* Function to test
**/
var build = jigsawBuilder.build

describe("Jigsaw-Builder tests", function() {
  this.timeout(3000)

  var src = path.join(__dirname, "test_data/example.png")
  var dest = path.join(__dirname, "test_data/results/")

  it("should output the correct number of jigsaw pieces", function(done) {
    var options = {
      input: src,
      output: dest,
      size: 5
    }
    build(options, function(err) {
      if (err) done(err)

      fs.readdir(dest, function(err, files) {
        if (err) done(err)

        if (files.length == 26) done()
        else done(new Error("Incorrect number of files found: "+files.length))

      })
    })
  })

  it("should output a properties.json file", function(done) {
    var options = {
      input: src,
      output: dest,
      size: 5
    }
    build(options, function(err) {
      if (err) done(err)

      fs.readdir(dest, function(err, files) {
        if (err) done(err)

        if (files.indexOf("properties.json") > -1) done()
        else done(new Error("Could not find properties.json file"))
      })
    })
  })
})
