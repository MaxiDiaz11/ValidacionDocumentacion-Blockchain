const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController')

//obtener constancia de alumno regular
router.get('/constancia', documentController.getConstanciaDeAlumnoRegular)

//obtener estado academico
router.get('/estadoAcademico', documentController.getEstadoAcademico)

module.exports = router;