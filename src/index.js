
const BodyParser = require('body-parser')
const Cors = require('cors')
const Express = require('express')

const Database = require('./services/database')


const server = Express()

Database
    .init()
    .then(() => {

        server.use(BodyParser.json({ limit: '50mb' }))
        server.use(BodyParser.urlencoded({ limit: '50mb', extended: true }))
        server.use(Cors())
        server.use(require('./api'))

        server
            .listen(process.env.PORT, () => {
                console.info(`server starts on port ${process.env.PORT}`)
            })
            .on('error', error => {
                console.error(`server error:\n`, error)
                process.exit(1)
            })
    })
