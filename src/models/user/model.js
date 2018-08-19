
const Database = require('../../services/database')

const Recipe = Database
    .create(
        'user',
        {
            name: { type: Database.Types.String },
        },
        {
            timestamps: false,
            versionKey: false
        },
        [
            { field: { name: 1 }, options: { unique: true }}
        ])

module.exports = Recipe
