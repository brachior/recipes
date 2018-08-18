const Model = require('./model')


exports.get = {
    one: async name => {
        const recipe = await Model.findOne({name})

        if (recipe) {
            return recipe.content
        }
        throw 'not found'
    },
    all: async () => {
        const recipes = await Model.find()

        return recipes.map(recipe => ({ name: recipe.name, content: recipe.content }))
    }
}

exports.create = async (name, content) => {
    const recipe = Model({ name, content })

    await recipe.validate()

    await recipe.save()
}

exports.update = async (name, content) => {
    await Model.update({ name }, { content })
}
