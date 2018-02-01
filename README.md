<div align="center">
  <img src="https://github.com/calum/jigsaw-builder/raw/master/docs/assets/logo.png" alt="Jigsaw-Builder" height="200" />
</div>

<h1 align="center">
Jigsaw-Builder
</h1>

<div align="center">
  <a href="https://travis-ci.org/calum/jigsaw-builder">
    <img src="https://travis-ci.org/calum/jigsaw-builder.svg?branch=master" alt="Build Status" />
  </a>
  <a href="https://codecov.io/gh/calum/jigsaw-builder">
    <img src="https://codecov.io/gh/calum/jigsaw-builder/branch/master/graph/badge.svg" alt="Code Coverage" />
  </a>
  <a href="https://www.codacy.com/app/calumforster/jigsaw-builder?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=calum/jigsaw-builder&amp;utm_campaign=Badge_Grade">
    <img
      src="https://api.codacy.com/project/badge/Grade/e67ed250115a4db4b6ea44208a2b2e2f"
    />
  </a>
</div>

<div align="center">Build a jigsaw from an image! 🔨 </div>

<br />

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

# run the test ($ node test.js $input $rows $columns)
$ node test.js example.png 8 8
```

This will create an (8 by 8) jigsaw from the `example.png` image (you can use your own image if you want).

<img src="https://raw.githubusercontent.com/calum/jigsaw-builder/master/examples/example.png" width="200">

You should see this in your `jigsaw/` directory:

<img src="https://raw.githubusercontent.com/calum/jigsaw-builder/master/examples/screenshot.png" width="600">

Open the `index.html` file in your browser to see how it all fits together! _You might need to refresh the page to get the jigsaw to show._

You can now use these pieces on your website or app. Have fun!

## Documentation
### Example Usage
```js
var jigsaw = require("jigsaw-builder")

var options = {
  input: "./assets/penguin.png",
  output: "./assets/jigsaw/",
  rows: 8,
  columns: 8
}

/**
* Build a 64 piece (8 by 8) puzzle from penguin.png and output
* the pieces to ./assets/jigsaw/.
**/
jigsaw.build(options, function (err, properties) => {
  if (err) {
    return console.error(err)
  }
  // The properties json object is also written to
  // ./assets/jigsaw/properties.json
  console.log(properties)
  console.log("done!")
})
```

### Options
The `build()` function accepts an `options` object and a `callback` function which is called when the jigsaw has finished building. The `options` can contain the following fields:

| Option | Default | Description |
| :------ | :-------: | :----------- |
| `input`| Required| The image you want to build the jigsaw from. This can be either a filepath or a url |
| `output` | Current directory | The directory you want to output your jigsaw pieces and `properties.json` to. _Must end with `/`._ |
| `rows` | 5 | The number of rows you want the jigsaw to have. |
| `columns` | 5 | The number of columns you want the jigsaw to have. |
| `size` | 5 | This value overrides the `rows` and `columns` to make a jigsaw with equal rows and columns. |

_The only required field is `input`._

### Output
The `build()` function, produces `rows*columns` jigsaw piece image files, and a `properties.json` file. The `properties.json` file stores the relative coordinates of each jig-saw piece. This is needed because the tabs of each jig-saw piece stick out slightly, meaning the jigsaw piece's actual centre is shifted away from where you'd want to place it.

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
