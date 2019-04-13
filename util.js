const fs = require('fs')
const { promisify } = require('util')

module.exports = {
    readFile: promisify(fs.readFile),
    writeFile: promisify(fs.writeFile),
    readdir: promisify(fs.readdir),
    stat: promisify(fs.stat),
    access: promisify(fs.access),
}
