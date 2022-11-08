const mongoose = require("mongoose");

const AdministradorSchema = mongoose.Schema({
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
    rol: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Administrador', AdministradorSchema)