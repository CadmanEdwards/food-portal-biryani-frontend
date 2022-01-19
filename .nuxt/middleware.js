const middleware = {}

middleware['verify'] = require('..\\middleware\\verify.js')
middleware['verify'] = middleware['verify'].default || middleware['verify']

export default middleware
