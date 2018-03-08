const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const FileSystem = require('../helpers/fs')
class Tidy {
  /**
   * Converts the file `source` to XHTML in `destination` via `Streams`
   * @param {string} source - The file which contains the source code
   * @param {string} destination - The output file path
   * @return {Promise<undefined>} Promise which resolves when the stream is finished
   */
  static stream (source, destination) {
    const options = [...Tidy.defaultOptions]
    return new Promise(resolve => {
      const input = fs.createReadStream(source)
      const proc = spawn(Tidy.command, options)

      FileSystem.create(destination)
      input.pipe(proc.stdin)
      proc.stdout.pipe(FileSystem.file).on('finish', () => {
        resolve()
      })
    })
  }
}

Tidy.command = path.resolve(__dirname, '..', 'bin', 'tidy')
Tidy.defaultOptions = [
  '--indent',
  '0',
  '--wrap',
  '0',
  '--hide-comments',
  'yes',
  '--omit-optional-tags',
  'yes',
  '--vertical-space',
  'auto',
  '-asxhtml'
]

module.exports = Tidy
