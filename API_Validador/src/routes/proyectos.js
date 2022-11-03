const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

//Crea proyectos
//api/proyectos
router.post('/', auth, [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], proyectosController.crearProyecto)

//obtener todos los proyectos
router.get('/', auth, proyectosController.obtenerProyectos)

//actualizar proyecto via ID
router.put('/:id', auth, [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], proyectosController.actualizarProyecto)

//eliminar un proyecto
router.delete('/:id', auth, proyectosController.eliminarProyecto)

module.exports = router;