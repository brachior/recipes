
const { Router } = require('express')
const Controllers = require('./controllers')

const router = Router()


/**
 * @api {get} /api/recipes Get all recipes
 * @apiDescription Get all recipes
 * @apiGroup Recipes
 * @apiVersion 1.0.0
 *
 */
router.get('/', Controllers.get)


module.exports = router
