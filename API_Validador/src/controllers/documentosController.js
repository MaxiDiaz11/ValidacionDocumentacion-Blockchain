import * as Documento from '../models/Documento.js'
import * as IPFS from "ipfs-core";
import {concat} from 'uint8arrays'

var IPFS_Node = null

const agregarDocumentoBlockchain = async (req, res) => {
    try {
        //crear un nuevo documento
        console.log('Creando nuevo documento...')
        console.log('Info recibida: ',req.body)
        //const documento = new Documento(req.body);

        //guardar el creador via jwt
        //documento.creador = req.usuario.legajo
        

        // almacenar en blockchain
        console.log('Subiendo documento a la blockchain...')

        const hash = await addDocumentOnIPFS(req.body.fileName,req.body.fileContent)

        //documento.hash = hash

        console.log('Guardando documento...')
        
        //guardar el documento
        //await documento.save();


        res.status(200).json({ msg: 'documento creado correctamente', documento: hash })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

const obtenerDocumentoBlockchain = async (req,res) => {
try{
    console.log('Obteniendo documento de la blockchain CID:', req.query.cid)
    const documentFromBlockchain = await getNodeByCID(req.query.cid)
    console.log(documentFromBlockchain)
    res.status(200).send({msg:'Documento extraido exitosamente', document: documentFromBlockchain})
}catch(error){
    console.log(error);
    res.status(500).send('Hubo un error')
}

}

const getNodeByCID = async (path,cid) => {
    try{
        const node = await getIPFSNodeInstance()
        const document = await node.get(path,cid)
        for await (const file of IPFS.ls(cid)) {
            console.log(file.path)
        }
        return document
    }catch(error){
        console.log(error)
    }
}



const agregarFile = async (filename,fileContent) => {
    try{
          const node = await getIPFSNodeInstance()
          const fileAdded = await node.add({
            path: filename,
            content: fileContent,
        
          });
          console.log("Added file:", fileAdded.path, fileAdded.cid);
          return {
            path : fileAdded.path,
            cid: fileAdded.cid
          };
    }catch(error){
        console.log(error)
    }
  };

const addDocumentOnIPFS =async (fileName, fileContent) => {
    const cid = await agregarFile(fileName,fileContent)
    return cid;
}

const base64ToArrayBuffer = (base64) => {
    let buff = new Buffer(base64);
    let base64data = buff.toString('base64');
    return base64data
  }
  
const getIPFSNodeInstance = async() => {
    if( IPFS_Node != null){
        console.log("Retornando un viejo nodo")
        return IPFS_Node 
    }
    else{
        console.log("Creando un nuevo nodo")
        IPFS_Node =await IPFS.create()
        console.log(IPFS_Node.name)
    }
    return IPFS_Node
}

export  {agregarDocumentoBlockchain,obtenerDocumentoBlockchain};