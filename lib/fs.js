const fs = require('fs')
const path = require('path')

let file

function mkdirp (filePath) {
  const pDirectory = path.dirname(filePath)

  if (fs.existsSync(pDirectory)) return true
  mkdirp(pDirectory)
  fs.mkdirSync(pDirectory)
}

class FileSystem {
  static get file () {
    return file
  }

  static create (filePath) {
    mkdirp(filePath)
    file = fs.createWriteStream(filePath, { flags: 'w' })
    return FileSystem
  }

  static write (blob) {
    file.write(blob)
    return FileSystem
  }
}

module.exports = FileSystem
