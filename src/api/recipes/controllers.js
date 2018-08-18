const { ServerError } = require('express-server-error')

const Recipe = require('../../models/recipe')


exports.get = (req, res) => {
    Recipe
        .get.all()
        .then(recipes => res.send(recipes))
        .catch(error => {
            console.error('Get recipes', error)
            res.handleServerError(new ServerError('Error when trying to retrieve recipes', { status: 400 }))
        })
}
