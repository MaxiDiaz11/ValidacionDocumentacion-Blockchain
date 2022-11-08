const fs = require('fs')
const pdf2base64 = require('pdf-to-base64');

exports.getConstanciaDeAlumnoRegular = async (req, res) => {
    try {
        // pdf2base64('./src/documents/ConstanciaDeAlumnoRegular.pdf')
        // .then(
        //     (response) => {
        //         console.log(response); //cGF0aC90by9maWxlLmpwZw==
        //         res.send({pdfToBase64: response});
        //     }
        // )
        // .catch(
        //     (error) => {
        //         console.log(error); //Exepection error....
        //     }
        // )
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
        // pdf2base64('./src/documents/EstadoAcadémico.pdf')
        // .then(
        //     (response) => {
        //         console.log(response); //cGF0aC90by9maWxlLmpwZw==
        //         res.send({pdfToBase64: response});
        //     }
        // )
        // .catch(
        //     (error) => {
        //         console.log(error); //Exepection error....
        //     }
        // )
        let pdfFile = fs.readFileSync('./src/documents/EstadoAcadémico.pdf')
        res.contentType("application/pdf");
        res.send(pdfFile);
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor')
    }
}
