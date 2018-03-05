const fs = require('fs')
const { spawn } = require('child_process')

const FileSystem = require('../helpers/fs')
class Tidy {
  /**
   * Converts HTML code to XHTML code
   * @param {string} source - The file which contains the source code
   * @return {Promise<string>} Promise which when resolved successfully contains the transposed code
   */
  static convert (source) {
    const input = fs.readFileSync(source, { encoding: 'utf8' })
    const options = this.defaultOptions

    return new Promise((resolve, reject) => {
      const proc = spawn(this.command, options)
      let data = ''

      proc.on('error', reject)
      proc.stdout.on('data', chunk => {
        data += chunk.toString()
      })
      proc.stdout.on('end', () => {
        resolve(data)
      })
      proc.stdout.on('error', reject)
      proc.stdin.write(input)
      proc.stdin.end()
    })
  }
  /**
   * Converts the file `source` to XHTML in `destination` via `Streams`
   * @param {string} source - The file which contains the source code
   * @param {string} destination - The output file path
   * @return {Promise<undefined>} Promise which resolves when the stream is finished
   */
  static stream (source, destination) {
    return new Promise(resolve => {
      const input = fs.createReadStream(source)
      const proc = spawn(this.command, this.defaultOptions)

      FileSystem.create(destination)
      input.pipe(proc.stdin)
      proc.stdout.pipe(FileSystem.file).on('finish', () => {
        resolve()
      })
    })
  }
}

Tidy.command = 'tidy'
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
