//const express = require('express');
import express from 'express';
const router = express.Router();
import * as documentosController from '../controllers/documentosController.js'
//const auth = require('../middleware/auth')
//import { check } from 'express-validator'

//Crea documentos
//api/documentos
     router.post('/validar', documentosController.agregarDocumentoBlockchain)
     router.get('/get',documentosController.obtenerDocumentoBlockchain)
     export default router;