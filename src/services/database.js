
const Mongoose = require('mongoose')


exports.init = async () => {
    Mongoose.Promise = Promise

    Mongoose.connection.on('connected', () => console.info('mongoose connection'))
    Mongoose.connection.on('error', err => console.error('mongoose connection error', err))
    Mongoose.connection.on('disconnected', () => console.info('mongoose disconnected'))

    process.on('SIGINT', () => {
        Mongoose.connection.removeAllListeners('disconnected')
        Mongoose.connection.close(() => {
            console.info('mongoose disconnected through app termination')

            process.exit(0)
        })
    })

    await Mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
}

exports.close = () => Mongoose.connection.close()

exports.create = (name, schema, options = {}, indexes = []) => {
    const mSchema = new Mongoose.Schema(schema, options)

    indexes.forEach(index => mSchema.index(index.field, index.options))

    return Mongoose.model(name, mSchema)
}

exports.Types = {
    Any: Mongoose.Schema.Types.Mixed,
    Boolean: Mongoose.Schema.Types.Boolean,
    Date: Mongoose.Schema.Types.Date,
    Number: Mongoose.Schema.Types.Number,
    Object: Mongoose.Schema.Types.Mixed,
    ObjectId: Mongoose.Schema.Types.ObjectId,
    String: Mongoose.Schema.Types.String,
    Array: {
        Any: [Mongoose.Schema.Types.Mixed],
        Boolean: [Mongoose.Schema.Types.Boolean],
        Date: [Mongoose.Schema.Types.Date],
        Number: [Mongoose.Schema.Types.Number],
        Object: [Mongoose.Schema.Types.Mixed],
        ObjectId: [Mongoose.Schema.Types.ObjectId],
        String: [Mongoose.Schema.Types.String]
    }
}
