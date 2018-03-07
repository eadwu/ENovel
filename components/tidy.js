const fs = require('fs')

const htmltidy2 = require('htmltidy2')
const FileSystem = require('../helpers/fs')

const tidy = htmltidy2.createWorker({
  wrap: 0,
  indent: 0,
  'output-xhtml': true,
  'hide-comments': 'yes',
  'vertical-space': 'auto',
  'omit-optional-tags': 'yes'
})

class Tidy {
  /**
   * Converts the file `source` to XHTML in `destination` via `Streams`
   * @param {string} source - The file which contains the source code
   * @param {string} destination - The output file path
   * @return {Promise<undefined>} Promise which resolves when the stream is finished
   */
  static stream (source, destination) {
    return new Promise(resolve => {
      const input = fs.createReadStream(source)

      FileSystem.create(destination)
      input
        .pipe(tidy)
        .pipe(FileSystem.file)
        .on('finish', () => {
          resolve()
        })
    })
  }
}

module.exports = Tidy
