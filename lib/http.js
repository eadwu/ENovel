const http = require('http')
const https = require('https')
const querystring = require('querystring')
const url = require('url')

class HTTP {
  static GET (address, data, headers, encoding) {
    return HTTP.REQUEST(address, 'GET', encoding, headers, data)
  }

  static POST (address, data, headers, encoding) {
    return HTTP.REQUEST(address, 'POST', encoding, headers, data)
  }
  /**
   * Performs a custom http(s) request with limited configuration
   * @param {string} address - The destination to direct the request to
   * @param {string} method - The http(s) request method
   * @param {string=} encoding utf8 - The character encoding for the data
   * @param {Object<string, any>=} headers {} - Headers for the http(s) request
   * @param {Object<string, any>|string} data - The data for POST request(s), the string should be formatted in
   * `application/x-www-form-urlencoded`
   * @return {Promise<string>} Promise for synchronous request
   */
  static REQUEST (address, method, encoding = 'utf8', headers = {}, data) {
    const { hostname, pathname, protocol, search } = url.parse(address)
    const params =
      search && !data ? search : data && typeof data === 'string' ? data : `?${querystring.stringify(data)}`
    const path = method === 'POST' ? pathname : `${pathname}${params}`

    return new Promise((resolve, reject) => {
      const options = {
        hostname,
        path,
        method,
        headers,
        protocol
      }

      function cb (response) {
        let output = []

        if (response.statusCode === 404) resolve(response.statusCode)
        if (encoding) response.setEncoding(encoding)
        response.on('data', chunk => {
          output.push(chunk)
        })
        response.on('end', () => {
          resolve(output)
        })
      }

      const request = protocol === 'http:' ? http.request(options, cb) : https.request(options, cb)

      if (method === 'POST' && params) {
        request.write(params)
      }

      request.on('error', err => {
        reject(err)
      })
      request.end()
    })
  }
}

module.exports = HTTP
