module.exports = [
  require('express').json(),
  require('cors')(),
  require('morgan')('dev')
]
