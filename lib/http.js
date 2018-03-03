const http = require('http')
const querystring = require('querystring')
const url = require('url')

class HTTP {
  static GET (address, data, headers) {
    return HTTP.REQUEST(address, 'GET', headers, data)
  }

  static POST (address, data, headers) {
    return HTTP.REQUEST(address, 'POST', headers, data)
  }
  /**
   * HTTP.REQUEST(address, method[, headers])
   * Performs a custom http request with limited configuration.
   * @param  {string}          address    - The destination to direct the
   * request to.
   * @param  {string}          method     - The http request method.
   * @param  {Object=}         headers {} - Headers for the http request.
   * @param  {Object|string}   data       - The data for POST request(s). The
   * string should be formatted in `application/x-www-form-urlencoded`.
   * @return {Promise<string>}            - Promise for synchronous request.
   */
  static REQUEST (address, method, headers = {}, data) {
    const { hostname, pathname, protocol, search } = url.parse(address)
    const params =
      search && !data
        ? search
        : data && typeof data === 'string'
          ? data
          : `?${querystring.stringify(data)}`
    const path = method === 'POST' ? pathname : `${pathname}${params}`

    return new Promise((resolve, reject) => {
      const request = http.request(
        {
          hostname,
          path,
          method,
          headers,
          protocol
        },
        response => {
          let output = []

          response.setEncoding('utf8')
          response.on('data', chunk => {
            output.push(chunk)
          })
          response.on('end', () => {
            resolve(output)
          })
        }
      )

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
