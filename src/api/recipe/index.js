
const { Router } = require('express')
const Multer = require('multer')
const storage = Multer.memoryStorage()
const Upload = Multer({ storage: storage })

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
router.get('/:name/md', Controllers.get.markdown)

/**
 * @api {get} /api/recipe/:name/html Get a recipe
 * @apiDescription Get a recipe
 * @apiGroup Recipe
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name  Recipe's name
 *
 */
router.get('/:name/html', Controllers.get.html)

/**
 * @api {put} /api/recipe Save a recipe
 * @apiDescription Save a recipe
 * @apiGroup Recipe
 * @apiVersion 1.0.0
 *
 */
router.put('/:recipe', Controllers.save)

/**
 * @api {post} /api/recipe Upload an image
 * @apiDescription Upload an image
 * @apiGroup Recipe
 * @apiVersion 1.0.0
 *
 */
router.post('/:recipe/upload/:name', Upload.any(), Controllers.upload)

/**
 * @api {post} /api/recipe Update a recipe
 * @apiDescription Update a recipe
 * @apiGroup Recipe
 * @apiVersion 1.0.0
 *
 */
router.post('/:recipe', Controllers.update)


module.exports = router
