import mongoose from 'mongoose'

const DocumentoSchema = mongoose.Schema({
    emailAlumno: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        default: "./",
    },
    hash: {
        type: String,
        default: "",
        required: true,
        unique: true
    },
    fechaHora: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('Documento', DocumentoSchema)