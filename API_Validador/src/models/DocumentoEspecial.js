const mongoose = require('mongoose')

const DocumentoEspecialSchema = mongoose.Schema({
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    idAlumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    hash: {
        type: String,
        default: null,
    },
    path: {
        type: String,
        default: './',
    }
})

module.exports = mongoose.model('DocumentoEspecial', DocumentoEspecialSchema)