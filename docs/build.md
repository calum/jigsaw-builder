# build(options, callback)

```js
var jigsaw = require("jigsaw-builder")

jigsaw.build(options, callback)
```

## Options
The `options` object accepts many different values, most of which are optional.

### Example

```js
var options = {
  input: "./assets/penguin.png",
  output: "./assets/jigsaw/",
  rows: 8,
  columns: 8
}
```

### input

* type: `String`
* required: `true`

Either a `filepath` to an image, or a `url` to an image.

### output

* type: `String`
* default: `./`

The `filepath` for the jigsaw pieces and [`properties.json`](#properties) to be saved.

### rows

* type: `Integer`
* default: `5`

The number of rows to split the image into.

### columns

* type: `Integer`
* default: `5`

The number of columns to split the image into.

## Callback

The `callback` function is called when `build()` has completed. It accepts an `err` and `properties` objects.

### err

* type: `Error`

An error is returned if something goes wrong. For instance, there could be a mistake in the [`input`](#input) filepath.

### properties

* type: `JSON Object`

The `properties` object contains information on each jigsaw piece, such as it's relative coordinates.

```js
{
  "overview": {
    "height": 2832,
    "width": 6012,
    "horizontalPieces": 8,
    "verticalPieces": 8
  },
  ...,
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
  },
  ...
}
```

#### Overview

Contains information about the entire jigsaw.

* `height`: The height of the image.
* `width`: The width of the image.
* `horizontalPieces`: The number of columns.
* `verticalPieces`: The number of rows.

#### Each piece

Each piece has a key to identify it's position in the jigsaw. i.e. `06` is the first row and 6th column. The `top`, `bottom`, `left`, and `right` fields represent which edges of the jigsaw piece have tabs.

* `top`: `+1` for top tab, `-1` for top inverted tab, `0` for no tab.
* `bottom`: `+1` for bottom tab, `-1` for bottom inverted tab, `0` for no tab.
* `left`: `+1` for left tab, `-1` for left inverted tab, `0` for no tab.
* `right`: `+1` for right tab, `-1` for right inverted tab, `0` for no tab.
* `x`: The relative `x` coordinate of the centre of this piece.
* `y`: The relative `y` coordinate of the centre of this piece.
* `topLeftCorner`: The relative `x` and `y` coordinates of the top left corner of this piece.

> `topLeftCorner` is useful in game engines that add sprites using the coordinates of their top left corner. e.g. Phaser.
