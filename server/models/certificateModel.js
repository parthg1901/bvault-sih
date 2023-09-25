const mongoose = require("mongoose")

const Schema = mongoose.Schema

const certificateSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    cid: {
        type: String,
        required: true
    },
    qr: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Certificate", certificateSchema)