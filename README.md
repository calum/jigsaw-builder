<div align="center">
  <a href="https://calum.github.io/jigsaw-builder">
    <img src="https://github.com/calum/jigsaw-builder/raw/master/docs/assets/logo.png" alt="Jigsaw-Builder" height="200" />
  </a>
</div>

<h1 align="center" href="https://calum.github.io/jigsaw-builder">
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

> View the documentation at [https://calum.github.io/jigsaw-builder](https://calum.github.io/jigsaw-builder).

If you need any help with getting your jigsaw built, you can either put an [issue on the GitHub page](https://github.com/calum/jigsaw-builder/issues) or email [calumforster@live.co.uk](calumforster@live.co.uk). I will be happy to help!

## Install

```
npm install --save jigsaw-builder
```

## Example Usage

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

## Try the example html jigsaw

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


## Development
Feel free to contribute to the github project. Create issues and pull requests if you like. This package still has a long way to go! Thank you for any help.
