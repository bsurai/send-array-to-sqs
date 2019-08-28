const pako = require('pako')

module.exports.compress = (text) => {
  if (typeof text !== 'string') {
    throw new Error('Only strings should be passed to compress function.')
  }
  return pako.deflate(text, { to: 'string' })
}
