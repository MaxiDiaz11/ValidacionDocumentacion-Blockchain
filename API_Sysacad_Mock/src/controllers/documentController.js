const fs = require('fs')

exports.getConstanciaDeAlumnoRegular = async (req, res) => {
    try {
        let pdfFile = fs.readFileSync('./src/documents/ConstanciaDeAlumnoRegular.pdf')
        res.contentType("application/pdf");
        res.send(pdfFile);
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor')
    }
}

//actualizar tarea
exports.getEstadoAcademico = async (req, res) => {
    try {
        let pdfFile = fs.readFileSync('./src/documents/EstadoAcadémico.pdf')
        res.contentType("application/pdf");
        res.send(pdfFile);
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor')
    }
}
