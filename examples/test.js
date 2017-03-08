var build = require('../main.js').build

// To run this test, add a .png image to the examples directory
build(8, './examples/test.png', './examples/jigsaw/', function (err) {
  console.log('Finished with error: ')
  console.log(err)
})
