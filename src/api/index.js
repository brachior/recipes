
const AppRoot = require('app-root-path');
const { Router } = require('express')
const { handleServerErrors } = require('express-server-error')
const ExpressEndPoints = require('express-list-endpoints')


const router = Router()
const basename = '/api'


router.use('/', handleServerErrors())
router.use(basename + '/recipe', require('./recipe'))
router.use(basename + '/recipes', require('./recipes'))

endpoints(router, '/')

module.exports = router


/** private **/

function endpoints(server, route) {
    const endPoints = ExpressEndPoints(server)
    const info = require(AppRoot + '/package')

    server.get(route, (req, res) => {
        res.json({
            version: info.version,
            author: info.author,
            routes: endPoints
        })
    })

}
