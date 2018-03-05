const Constants = require('../lib/constants')
const { COVER, MATCH, REGEX, REPLACE, TITLE, TRANSLATOR } = Constants

/**
 * @typedef {Object} Metadata
 * @property {string} translator - The translator's username
 * @property {string} cover - The URL to the cover image
 * @property {string} title - The title of the novel
 */

class Parser {
  /**
   * Filter out any unnecessary information from input `blob`
   * @param {Array<string>} blob - The output from `http.REQUEST`
   * @param {Object<string, any>} param1 - Options
   * @param {number} param1.source - Integer from `SOURCE` that represents the novel's hosting site
   * @return {string | boolean} Returns false when no matches are found, otherwise returns the match
   */
  static parse (blob, { source }) {
    const fixedBlob = Array.isArray(blob) ? blob.join('') : blob
    const matches = fixedBlob.match(REGEX[source])
    return matches
      ? matches[1]
        .replace(MATCH[source], REPLACE[source])
        .replace(/id=("chapterContent")/g, 'class=$1')
        .replace(/style=".*?"/g, '')
      : false
  }
  /**
   * Retrieve metadata by scraping HTML
   * @param {Array<string>} blob - The output from `http.REQUEST`
   * @param {Object<string, any>} param1 - Options
   * @param {number} param1.source - Integer from `SOURCE` that represents the novel's hosting site
   * @return {Metadata} Object containing the novel metadata
   */
  static retrieveMetadata (blob, { source }) {
    const fixedBlob = Array.isArray(blob) ? blob.join('') : blob
    const translator = fixedBlob.match(TRANSLATOR[source])[1]
    const cover = fixedBlob.match(COVER[source])[1]
    const title = fixedBlob.match(TITLE[source])[1]

    return {
      translator,
      cover,
      title
    }
  }
}

module.exports = Parser
