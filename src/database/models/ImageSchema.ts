import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

const imageSchema = new Schema({
    path: String,
    metadata: Object

})

const ImageModel = mongoose.model('Images', imageSchema)

export default ImageModel