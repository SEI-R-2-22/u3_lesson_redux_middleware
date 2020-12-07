module.exports = [
  require('body-parser').json(),
  require('body-parser').urlencoded({ extended: true }),
  require('cors')(),
  require('morgan')('dev')
]
