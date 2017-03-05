var build = require('../main.js').build

build(2, './examples/linux.png', './examples/jigsaw/', function (err) {
  console.log('Finished with error: ' + err)
})
