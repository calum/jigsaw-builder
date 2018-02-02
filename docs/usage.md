# Usage

## Install
```
npm install --save jigsaw-builder
```


## Example
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
jigsaw.build(options, function (err, properties) {
  if (err) {
    return console.error(err)
  }
  // The properties json object is also written to
  // ./assets/jigsaw/properties.json
  console.log(properties)
  console.log("done!")
})
```

## Options
The `build()` function accepts an `options` object and a `callback` function which is called when the jigsaw has finished building. The `options` can contain the following fields:

| Option | Default | Description |
| :------ | :-------: | :----------- |
| `input`| Required| The image you want to build the jigsaw from. This can be either a filepath or a url. |
| `output` | Current directory | The directory you want to output your jigsaw pieces and `properties.json` to. _Must end with '/'._ |
| `rows` | 5 | The number of rows you want the jigsaw to have. |
| `columns` | 5 | The number of columns you want the jigsaw to have. |
| `size` | 5 | This value overrides the `rows` and `columns` to make a jigsaw with equal rows and columns. |

_The only required field is `input`._

## Output
The `build()` function, produces `rows*columns` jigsaw piece image files, and a `properties.json` file. The `properties.json` file stores the relative coordinates of each jig-saw piece. This is needed because the tabs of each jig-saw piece stick out slightly, meaning the jigsaw piece's actual centre is shifted away from where you'd want to place it.

The properties json file includes an overview section with details on the whole jigsaw.
```js
// example from properties.json
"overview": {
  "height": 2832,
  "width": 6012,
  "horizontalPieces": 8,
  "verticalPieces": 8
}
```

The `properties.json` file also includes the relative coordinates for the top left of each jigsaw piece.
```js
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
