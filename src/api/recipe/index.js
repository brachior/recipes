
const { Router } = require('express')
const multer = require('multer')
// const Upload = multer({ dest: 'uploads/' })
const storage = multer.memoryStorage()
const Upload = multer({ storage: storage })

const Controllers = require('./controllers')

const router = Router()


/**
 * @api {get} /api/recipe/:name Get a recipe
 * @apiDescription Get a recipe
 * @apiGroup Recipe
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name  Recipe's name
 *
 */
router.get('/:name', Controllers.get)

/**
 * @api {put} /api/recipe Save a recipe
 * @apiDescription Save a recipe
 * @apiGroup Recipe
 * @apiVersion 1.0.0
 *
 */
router.put('/', Upload.any(), Controllers.save)

/**
 * @api {post} /api/recipe Update a recipe
 * @apiDescription Update a recipe
 * @apiGroup Recipe
 * @apiVersion 1.0.0
 *
 */
router.post('/', Upload.any(), Controllers.update)


module.exports = router
