var build = require('../main.js').build

build(8, './examples/test.png', './examples/jigsaw/', function (err) {
  console.log(err)
})
