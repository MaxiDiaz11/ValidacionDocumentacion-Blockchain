import mongoose from 'mongoose'

const DocumentoSchema = mongoose.Schema({
    idAlumno: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    path: {
        type: String,
        default: "./",
    },
    hash: {
        type: String,
        default: null,
        required: true
    },
    fechaHora: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('Documento', DocumentoSchema)