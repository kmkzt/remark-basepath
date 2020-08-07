# remark-basepath

[![npm version](https://img.shields.io/npm/v/remark-basepath/latest.svg)](https://www.npmjs.com/package/remark-basepath) [![npm download](https://img.shields.io/npm/dm/remark-basepath.svg)](https://www.npmjs.com/package/remark-basepath)

`remark` plugin to convert the base path of image and link.

## Install

```
# npm install remark-basepath
# or
yarn add remark-basepath
```

## Use

This is example code.

```js
const remark = require('remark')
const basepath = require('remark-basepath')

const markdown = `
## Image
![example image](./example.jpg)

## Link
[src](./src)
`

remark()
  .use(basepath, {
      basePath: 'https://github.com/kmkzt/remark-basepath/tree/master'
      baseImagePath: 'https://raw.githubusercontent.com/kmkzt/remark-basepath/master'
  })
  .process(markdown, (err, file) => {
    if (err) throw err
    console.log(String(file))
  })

// ## Image
// ![./aaa.jpg](https://raw.githubusercontent.com/kmkzt/remark-basepath/master/aaa.jpg)
// 
// ## Link
// [./bbb](https://github.com/kmkzt/remark-basepath/tree/master/bbb)
```
