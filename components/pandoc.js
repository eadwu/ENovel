const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const FileSystem = require('../helpers/fs')

class Pandoc {
  /**
   * Converts the file `source` to EPUB in `destination` via `Streams`
   * @param {string} source - The file which contains the source code
   * @param {string} destination - The output file path
   * @return {Promise<undefined>} Promise which resolves when the stream is finished
   */
  static stream (source, destination) {
    const options = [...Pandoc.defaultOptions]

    options.push('--epub-cover-image', path.resolve(path.dirname(source), 'cover.jpg'))
    options.push('--epub-metadata', path.resolve(path.dirname(source), 'metadata.xml'))

    return new Promise(resolve => {
      const input = fs.createReadStream(source)
      const proc = spawn(Pandoc.command, options)

      FileSystem.create(destination)
      input.pipe(proc.stdin)
      proc.stdout.pipe(FileSystem.file).on('finish', () => {
        resolve()
      })
    })
  }
}

Pandoc.command = path.resolve(__dirname, '..', 'bin', 'pandoc')
Pandoc.defaultOptions = [
  '-f',
  'html-native_divs',
  '-t',
  'epub3',
  '--quiet',
  '--toc',
  '--toc-depth=2',
  '--css',
  path.resolve(__dirname, '..', 'assets', 'css', 'epub.css'),
  '--epub-embed-font',
  path.resolve(__dirname, '..', 'assets', 'fonts', 'Arvo-*.ttf'),
  '--epub-chapter-level=2'
]

module.exports = Pandoc
