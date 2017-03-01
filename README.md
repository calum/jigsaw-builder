# Jig-Saw Builder
This module is used to build a jig-saw from an image file.

### Note
This project is still in development

## Example Usage
```js
var jigsawBuilder = require('jigsaw-builder')

/**
* The first argument is the jig-saw size
* i.e. a value of 8 will create an
* 8 by 8 jig-saw (64 piece).
* The second argument is the image
* you want to convert into jig-saw pieces.
* The third argument is the destination
* directory for the individual jig-saw
* files to be output to.
* The fourth argument is the callback.
**/
jigsawBuilder.build(8, './assets/cat.png', './assets/jigsaw/cat/', function (err) => {
  if (err) {
    console.error(err)
  }
})
```

## Output
The `.build` function, when called with the first argument `n`, produces `n*n` image files and a `properties.json` file. The `properties.json` file stores the actual coordinates of each jig-saw piece. This is needed because the tabs of each jig-saw piece stick out slightly and alter the size of the image size.

## Function Used
To calculate the edges of the jig-saw pieces, this module uses the parametric equation
```
x = t + (1/4)sin(4pi*t),
y = (1/4)(cos(2pi*t)-1),
where 0 < t < 1.
```
