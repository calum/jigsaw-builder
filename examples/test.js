var build = require('../main.js').build

// To run this test, add a .png image to the examples directory
build(8, './example.png', './jigsaw/', function (err) {
  if (err) {
    console.log('Finished with error: ')
    return console.log(err)
  }

  console.log('Success! Check the jigsaw/ directory for the pieces.')
  console.log('Open the index.html file to check it has worked. (image must be named "example.png" to work)')

})
