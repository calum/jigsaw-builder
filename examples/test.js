var build = require('../').build

var Jimp = require("jimp")

var filename = process.argv[2]

if (!filename) {
  return console.log("You need to provide a filename. e.g. node test.js example.png")
}

console.log('Generating jigsaw puzzle for ' + filename)

var max_width = 1024
var max_height = 728

console.log('Re-sizing the image for better browser performance...')

// scale the image first
Jimp.read(filename, function (err, img) {
    if (err) throw err

    var width = img.bitmap.width
    var height = img.bitmap.height
    var scale = 1

    if (width*scale > max_width) {
      scale = max_width/width
    }
    if (height*scale > max_height) {
      scale = max_height/heigth
    }

    img.resize(width*scale, height*scale)
      .quality(60)
      .write("./example.jpg", function() {
        console.log('Building the jigsaw using jigdaw-builder...')
        run()
      })
});

/**
* This is where jigsaw-builder is used. The above functionality is only
* to reduce the image to fit in the browser window and improve performance.
*
* Using a game engine to show your jigsaw pieces may mean you don't have
* to worry about image size.
**/
function run() {
var options = {
  input: './example.jpg',
  output: './jigsaw/',
  size: 8
}

  // To run this test, add a .png image to the examples directory
  build(options, function (err) {
    if (err) {
      console.log('Finished with error: ')
      return console.log(err)
    }

    console.log('Success! Check the jigsaw/ directory for the pieces.')
    console.log('Open the index.html file to check it has worked.')
  })
}
