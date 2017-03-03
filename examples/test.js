var build = require('../main.js').build

build(8, './example/cat.png', './examples/', function (err) {
  console.log(err)
})
