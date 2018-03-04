const fs = require('fs')
const path = require('path')

let file

/**
 * Creates the missing directories to `filePath` if they don't already exist
 * @param {string} filePath - The path to the file
 */
function mkdirp (filePath) {
  const pDirectory = path.dirname(filePath)

  if (fs.existsSync(pDirectory)) return true
  mkdirp(pDirectory)
  fs.mkdirSync(pDirectory)
}

class FileSystem {
  /**
   * Gets the `WriteStream` create from `FileSystem.create`
   * @return {WriteStream} - The Stream created from `fs.createWriteStream`
   */
  static get file () {
    return file
  }

  /**
   * Creates a `WriteStream` to the `filePath`
   * @param {string} filePath - The path to the file
   * @return {FileSystem} - The `FileSystem` object
   */
  static create (filePath) {
    mkdirp(filePath)
    file = fs.createWriteStream(filePath, { flags: 'w' })
    return FileSystem
  }

  /**
   * Appends data to the file
   * @param {string} blob - The data to append to the file
   * @return {FileSystem} - The `FileSystem` object
   */
  static write (blob) {
    file.write(blob)
    return FileSystem
  }
}

module.exports = FileSystem
