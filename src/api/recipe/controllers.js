const { markdown } = require("markdown")
const { ServerError } = require('express-server-error')

const Recipe = require('../../models/recipe')


exports.get = {
    markdown: (req, res) => {
        Recipe
            .get.one(req.params.name)
            .then(recipe => res.send(recipe.content))
            .catch(error => {
                console.error('Get recipe', error)
                if (error === 'not found') {
                    res.handleServerError(new ServerError('This recipe does not exist', { status: 404 }))
                } else {
                    res.handleServerError(new ServerError('Error when trying to retrieve recipe', { status: 400 }))
                }
            })
    },
    html: (req, res) => {
        Recipe
            .get.one(req.params.name)
            .then(recipe => {
                const final = recipe.images.reduce((html, image) => {
                    const regex = new RegExp(`${image.name}`, 'g')
                    return html.replace(regex, image.base64)
                }, markdown.toHTML(recipe.content))

                res.send(template(final))
            })
            .catch(error => {
                console.error('Get recipe', error)
                if (error === 'not found') {
                    res.handleServerError(new ServerError('This recipe does not exist', { status: 404 }))
                } else {
                    res.handleServerError(new ServerError('Error when trying to retrieve recipe', { status: 400 }))
                }
            })
    }
}

exports.save = (req, res) => {
    const recipe = req.params.recipe
    const content = req.body && req.body.content

    Recipe
        .create(recipe, content)
        .then(() => res.send('recipe saved'))
        .catch(error => {
            console.error('Save recipe', error)
            res.handleServerError(new ServerError('Error when trying to save recipe', { status: 400 }))
        })
}

exports.upload = (req, res) => {
    const name = req.params.recipe
    const imageName = req.params.name
    const file = req.files.find(recipe => recipe.originalname === imageName)

    Recipe
        .get.one(name)
        .then(recipe => {
            const base64 = `data:image/png;base64,${file.buffer.toString('base64')}`
            const index = recipe.images.findIndex(image => image.name === imageName)

            if (index === -1) {
                recipe.images.push({ name: imageName, base64 })
            } else {
                recipe.images[index].base64 = base64
            }

            return recipe.save()
        })
        .then(() => {
            res.send('File uploaded')
        })
        .catch(error => {
            console.error('Upload file', error)
            res.handleServerError(new ServerError(error.message, { status: 400 }))
        })
}

exports.update = (req, res) => {
    const recipe = req.params.recipe
    const content = req.body.content

    Recipe
        .update(recipe, content)
        .then(() => res.send('recipe updated'))
        .catch(error => {
            console.error('Update recipe', error)
            res.handleServerError(new ServerError('Error when trying to save recipe', { status: 400 }))
        })
}


/** private **/

function template(data) {
    // noinspection CssInvalidPropertyValue
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8">
        <style>
            body {
                width: 50%;
                margin: auto;
                counter-reset: mega-step, mini-step;
            }
            img {
                width: 80%;
                display: block;
                margin: 0 auto;
            }
            h1 {
                text-align: center;
            }
            h3 {
                counter-increment: mega-step;
                font-style: italic;
            }
            h3:before {
                content: counter(mega-step, upper-roman)'. ';
                font-style: normal;
            }
            hr {
                margin: 1.2em 0;
            }
        </style>
        </head>
        <body>
            <div>
                ${data}
            </div>
        </body>
    </html>`
}
