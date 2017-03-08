var build = require('../main.js').build

// To run this test, add a .png image to the examples directory
build(8, '../examples/penguin.png', '../examples/penguin_puzzle/', function (err) {
  console.log('Finished with error: ')
  console.log(err)
})
