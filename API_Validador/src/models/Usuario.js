const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        default: null,
        required: true
    },
    legajo: {
        type: Number,
        default: 0,
        required: true
    }
})

module.exports = mongoose.model('Usuario', UsuarioSchema)