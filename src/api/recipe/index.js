
const { Router } = require('express')
const Controllers = require('./controllers')

const router = Router()


/**
 * @api {get} /api/recipe Get a recipe
 * @apiDescription Get a recipe
 * @apiGroup Recipe
 * @apiVersion 1.0.0
 *
 */
router.get('/', Controllers.get)


module.exports = router
