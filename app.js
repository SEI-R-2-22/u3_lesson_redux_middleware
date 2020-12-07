const dependencies = require('./middleware/dependencies')

class App {
  static port = process.env.PORT || 3001
  static app = require('express')()

  static build() {
    require('./middleware/dependencies').forEach((d) => this.app.use(d))
  }

  static routes() {
    this.app.use('/api', require('./routes'))
  }

  static listen() {
    this.build()
    this.routes()
    this.app.listen(this.port, () =>
      console.log(`Server Listening On Port: ${this.port}`)
    )
  }
}

App.listen()
