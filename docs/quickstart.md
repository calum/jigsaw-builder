# Example web application

In this 5 minute tutorial you will create a 64 piece jigsaw and then see the jigsaw loaded into a canvas element in your browser.

## Clone the repo

```sh
git clone https://github.com/calum/jigsaw-builder.git
```

## Install dependencies
```sh
cd jigsaw-builder/

npm install
```

## Build a jigsaw
The following commands will create an (8 by 8) jigsaw from the `example.png` image.

!> You can use any image file. Even a URL to an image!

<img src="https://raw.githubusercontent.com/calum/jigsaw-builder/master/examples/example.png" width="200">

### Commands to build jigsaw
```
cd examples/

node test.js example.png 8 8
```

### Have a look at all your pieces

You should see all the jigsaw pieces in your `jigsaw/` directory.

<img src="https://raw.githubusercontent.com/calum/jigsaw-builder/master/examples/screenshot.png" width="600">

## View the jigsaw in your browser

Open the `index.html` file in your browser to see how it all fits together! _You might need to refresh the page to get the jigsaw to show._

You can now use these pieces on your website or app. Have fun!
