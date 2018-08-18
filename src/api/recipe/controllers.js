const { ServerError } = require('express-server-error')

const Recipe = require('../../models/recipe')


exports.get = (req, res) => {
    Recipe
        .get.one(req.params.name)
        .then(recipe => res.send(recipe))
        .catch(error => {
            console.error('Get recipe', error)
            if (error === 'not found') {
                res.handleServerError(new ServerError('This recipe does not exist', { status: 404 }))
            } else {
                res.handleServerError(new ServerError('Error when trying to retrieve recipe', { status: 400 }))
            }
        })
}

exports.save = (req, res) => {
    const file = req.files[0]
    const content = file.buffer.toString()

    Recipe
        .create(content.split('\n')[0], content)
        .then(() => res.send('recipe saved'))
        .catch(error => {
            console.error('Save recipe', error)
            res.handleServerError(new ServerError('Error when trying to save recipe', { status: 400 }))
        })
}

exports.update = (req, res) => {
    const file = req.files[0]
    const content = file.buffer.toString()

    Recipe
        .update(content.split('\n')[0], content)
        .then(() => res.send('recipe updated'))
        .catch(error => {
            console.error('Update recipe', error)
            res.handleServerError(new ServerError('Error when trying to save recipe', { status: 400 }))
        })
}
