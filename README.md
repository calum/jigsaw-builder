[![Build Status](https://travis-ci.org/calum/jigsaw-builder.svg?branch=master)](https://travis-ci.org/calum/jigsaw-builder)

# Jigsaw Builder
This module is used to build a jigsaw from an image file. It was developed to be used in a jigsaw game.

If you need any help with getting your jigsaw built, you can either put an [issue on the GitHub page](https://github.com/calum/jigsaw-builder/issues) or email [calumforster@live.co.uk](calumforster@live.co.uk). I will be happy to help!

## Give it a quick try
In this 5 minute tutorial you will create a 64 piece jigsaw and then see the jigsaw loaded into a canvas element in your browser.
```sh
# clone the jigsaw-builder
$ git clone https://github.com/calum/jigsaw-builder.git
$ cd jigsaw-builder/

# install dependencies
$ npm install

# enter the examples folder
$ cd examples/

# run the test
$ node test.js example.png
```

This will create a jigsaw from the `example.png` image (you can use your own image if you want).

<img src="https://raw.githubusercontent.com/calum/jigsaw-builder/master/examples/example.png" width="200">

You should see this in your `jigsaw/` directory:

<img src="https://raw.githubusercontent.com/calum/jigsaw-builder/master/examples/screenshot.png" width="600">

Open the `index.html` file in your browser to see how it all fits together! _You might need to refresh the page to get the jigsaw to show._

You can now use these pieces on your website or app. Have fun!

## Documentation
```js
var jigsawBuilder = require('jigsaw-builder')

/**
* Build a 64 piece puzzle from penguin.png and output
* the pieces to ./assets/jigsaw/.
**/
jigsawBuilder.build(8, './assets/penguin.png', './assets/jigsaw/', function (err) => {
  if (err) {
    return console.error(err)
  }
  console.log('done!')
})
```

### Output
The `build()` function, when called with the first argument `n`, produces `n*n` jigsaw piece image files, and a `properties.json` file. The `properties.json` file stores the relative coordinates of each jig-saw piece. This is needed because the tabs of each jig-saw piece stick out slightly, meaning the jigsaw piece's actual centre is shifted away from where you'd want to place it.

The properties json file includes an overview section with details on the whol jigsaw.
```
// example from properties.json
"overview": {
  "height": 2832,
  "width": 6012,
  "horizontalPieces": 8,
  "verticalPieces": 8
}
```

The `properties.json` file also includes the relative coordinates for the top left of each jigsaw piece.
```
// piece 06 from properties.json. This piece has a tab sticking out the left and
// right sides. It also has a gap on its bottom for the insertion of another piece's
// tab.
"06": {
  "top": 0,
  "bottom": -1,
  "left": 1,
  "right": 1,
  "x": 0.8125,
  "y": 0.0625,
  "topLeftCorner": {
    "x": 0.7291666666666666,
    "y": 0
  }
}
```

### Function Used
To calculate the edges of the jig-saw pieces, this module uses the parametric equation
```
x = t + (1/4)sin(4pi*t),
y = (1/4)(cos(2pi*t)-1),
where 0 < t < 1.
```
More shapes and sizes will be added in future releases!

## Development
Feel free to contribute to the github project. Create issues and pull requests if you like. This package still has a long way to go! Thank you for any help.
