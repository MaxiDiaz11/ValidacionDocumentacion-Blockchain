const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const { validationResult } = require('express-validator')

//crea una nueva tarea
exports.crearTarea = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        //extraer el proyecto y verificar si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto)
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        //verificar creador del proyecto
        if (existeProyecto.creador.toString() != req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' })
        }

        //creamos la tarea
        const tarea = new Tarea(req.body)
        await tarea.save()
        res.status(200).json({ msg: 'Tarea agregada correctamente' });

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor')
    }
}


exports.obtenerTareas = async (req, res) => {
    try {

        //extraer el proyecto y verificar si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto)
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        //verificar creador del proyecto
        if (existeProyecto.creador.toString() != req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' })
        }

        //obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        res.json({ tareas })

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor')
    }
}

//actualizar tarea
exports.actualizarTarea = async (req, res) => {
    try {
        //extraer el proyecto y verificar si existe
        const { proyecto, nombre, estado } = req.body;

        //si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id)
        if (!tarea) {
            return res.status(400).json({ msg: 'No existe la tarea' })
        }

        // const existeProyecto = await Proyecto.findById(proyecto)
        //revisar si el proyecto actual pertenece al usuario autenticado
        //verificar creador del proyecto
        if (existeProyecto.creador.toString() != req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' })
        }

        //crear un objeto con la nueva informacion
        const nuevaTarea = {};

        if (nombre) nuevaTarea.nombre = nombre
        if (estado) nuevaTarea.estado = estado

        //guardar la tarea
        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });

        res.json({ tarea })

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor')
    }
}

//elimina una tarea en base a un id

exports.eliminarTarea = async(req, res) =>{
    try {
        //extraer el proyecto y verificar si existe
        const { proyecto } = req.body;

        //si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id)
        if (!tarea) {
            return res.status(400).json({ msg: 'No existe la tarea' })
        }

        const existeProyecto = await Proyecto.findById(proyecto)
        //revisar si el proyecto actual pertenece al usuario autenticado
        //verificar creador del proyecto
        if (existeProyecto.creador.toString() != req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' })
        }

        //Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id})

        res.json({msg: 'Tarea eliminada'})

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en el servidor')
    }
}