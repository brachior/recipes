
const Database = require('../../services/database')

const Recipe = Database
    .create(
        'recipe',
        {
            name: { type: Database.Types.String },
            content: { type: Database.Types.String },
            images: [{
                name: { type: Database.Types.String },
                base64: { type: Database.Types.String }
            }]
        },
        {
            timestamps: false,
            versionKey: false
        },
        [
            { field: { name: 1 }, options: { unique: true }}
        ])

module.exports = Recipe
