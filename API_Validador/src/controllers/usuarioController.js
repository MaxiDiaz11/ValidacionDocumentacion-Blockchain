const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    //extraer legajo y password
    const { legajo, nombre, token } = req.body;

    try {
        //Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ legajo })

        if (usuario) {
            
            return res.status(400).json({ msg: 'El usuario ya existe' })
        }
        //crea nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt)

        //crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        //firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

            res.status(200).json({ msg: 'Usuario creado correctamente', token })
        })


        //guardar usuario
        await usuario.save();

        //mensaje de confirmacion
        console.log("usuario guardado")

    } catch (error) {
        console.log(error)
        res.status(400).send("Hubo un error")
    }
}