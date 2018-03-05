/**
 * Array containing `RegExps` to scrap the author from the webpage
 * @type {Array<RegExp>}
 */
const AUTHOR = [/<h4>(.*?)<\/h4>/, /s/]
/**
 * Array containing `RegExps` to scrap the cover image from the webpage
 * @type {Array<RegExp>}
 */
const COVER = [/<div id="coverImg".*?url\((.*?)\).*?<\/div>/]
/**
 * Array containing `Strings` of the supported website hostnames
 * @type {Array<RegExp>}
 */
const HOST = ['http://gravitytales.com/']
/**
 * Array containing `RegExps` to match against the input html to do adjustments
 * @type {Array<RegExp>}
 */
const MATCH = [/((Chapter|Prologue)[\S\s]*?)</]
/**
 * Array containing `Strings` to get the default website path
 * @type {Array<RegExp>}
 */
const PATH = ['Novel/']
/**
 * Array containing `RegExps` to scrap the chapter content from the webpage
 * @type {Array<RegExp>}
 */
const REGEX = [/(<div id="chapterContent"([\S\s]+?)<\/div>)/]
/**
 * Array containing `Strings` to adjust output [x]html
 * @type {Array<string>}
 */
const REPLACE = ['<h2>$1</h2>']
/**
 * Dictionary that stores the index for the respective website(s)
 * @type {Object<string, number>}
 */
const SOURCE = {
  GRAVITY_TALES: 0
}
/**
 * Array containing `RegExps` to scrap the title from the webpage
 * @type {Array<RegExp>}
 */
const TITLE = [/<h3>(.*?)[\s]+<span.*?<\/h3>/]
/**
 * Array containing `RegExps` to scrap the translator from the webpage
 * @type {Array<RegExp>}
 */
const TRANSLATOR = [/<h4>(.*?)<\/h4>/]

module.exports = {
  AUTHOR,
  COVER,
  HOST,
  MATCH,
  PATH,
  REGEX,
  REPLACE,
  SOURCE,
  TITLE,
  TRANSLATOR
}
