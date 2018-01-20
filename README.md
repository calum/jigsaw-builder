# Jigsaw Builder
This module is used to build a jigsaw from an image file. It was developed to be used in a jigsaw game.

If you need any help with getting your jigsaw built, you can either put an [issue on the GitHub page](https://github.com/calum/jigsaw-builder/issues) or email [calumforster@live.co.uk](calumforster@live.co.uk). I would be happy to help!

## Give it a quick try
In this 5 minute tutorial you will create a 64 piece jigsaw and then see the jigsaw loaded into a canvas element in your browser.
```sh
# clone the jigsaw-builder
$ git clone https://github.com/CalumForsterDev/jigsaw-builder.git
$ cd jigsaw-builder/

# install dependencies
$ npm install

# enter the examples folder
$ cd examples/

# run the test
$ node test.js
```

This will create a jigsaw from the `example.png` image.

<img src="https://raw.githubusercontent.com/CalumForsterDev/jigsaw-builder/master/examples/example.png" width="200">

You should see this in your `jigsaw/` directory:

<img src="https://raw.githubusercontent.com/CalumForsterDev/jigsaw-builder/master/examples/screenshot.png" width="600">

Open the `index.html` file in your browser to see how it all fits together! _You might need to refresh the page to get the jigsaw to show._

You can now use these pieces on your website or app. Have fun!

## Documentation
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
jigsawBuilder.build(8, './assets/penguin.png', './assets/jigsaw/', function (err) => {
  if (err) {
    return console.error(err)
  }
  console.log('done!')
})
```

### Output
The `.build` function, when called with the first argument `n`, produces `n*n` image files and a `properties.json` file. The `properties.json` file stores the relative coordinates of each jig-saw piece. This is needed because the tabs of each jig-saw piece stick out slightly, meaning the jigsaw piece's actual centre is shifted away from where you'd want to place it.

The `properties.json` file stores to top left coordinate of each jigsaw piece.

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
