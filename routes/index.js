const fs = require('fs')

const Router = require('express').Router()

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    let router = require(`${__dirname}/${file}`)
    Router.use(`/${router.path}`, router.Router)
  })
module.exports = Router
