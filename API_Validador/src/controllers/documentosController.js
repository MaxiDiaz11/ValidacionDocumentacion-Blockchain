import * as Documento from '../models/Documento.js'
import * as IPFS from "ipfs-core";
import formidable from 'formidable';
import fs from 'fs'
import nodeMailer from 'nodemailer'
import * as dotenv from 'dotenv'
import QRCode from 'qrcode'

dotenv.config({ path: 'variables.env' })

var IPFS_Node = null

const agregarDocumentoBlockchain = async (req, res) => {
    try {
        
        const form = formidable({multiples:true})
        await form.parse(req, async(err, fields, files) => {
            console.log("Files: ",files)
            console.log("Fields: ",fields)
            if (err) {
              next(err);
              return;
            }
            const pdfFinal = files.pdf
            console.log(pdfFinal.filepath)
            const pdfContent = fs.readFileSync(pdfFinal.filepath)
            const pdfPath = fields.legajo + '-' + fields.constancia
            console.log('Creando nuevo documento...')
            console.log('Contenido del pdf',pdfContent)
            const documento = new Documento.default();
            documento.emailAlumno = fields.emailAlumno
            documento.path = pdfPath+'.pdf'
            //guardar el creador via jwt
            //documento.creador = req.usuario.legajo
            
            
            // almacenar en blockchain
            console.log('Subiendo documento a la blockchain...')
            
            const hash = await addDocumentOnIPFS(pdfPath,pdfContent)
            
            //documento.hash = hash
            documento.hash = hash.cid
            
            console.log('Guardando documento...')
            
            //guardar el documento
            try{
                await documento.save();
            }catch(error){
                console.log("Documento ya almacenado en la  blockchain")
                console.log("Enviando correo electronico")
                sendEmail(fields.constancia,hash.cid,fields.emailAlumno)
                res.status(200).send({msg:'Documento ya almacenado en la blockchain'})
                return;
            }
    
            console.log("Enviando correo electronico")
            sendEmail(fields.constancia,hash.cid,fields.emailAlumno)
            res.status(200).json({ msg: 'Documento autenticado en la blockchain correctamente', documento: hash })
        })
       
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
    if(documentFromBlockchain.length > 0)
        res.status(200).send({msg:'Documento extraido exitosamente',urlIPFS:` https://ipfs.io/ipfs/${req.query.cid}`, document: documentFromBlockchain})
    else
        res.status(500).send({msg:'El hash ingresado no coincide con ningun documento de la universidad'})
}catch(error){
    console.log(error);
    res.status(500).send('Hubo un error')
}
}

const getNodeByCID = async (cid) => {
    try{
        const document = await Documento.default.find({hash:cid});
        return document;
    }catch(error){
        console.log(error)
    }
}

const sendEmail = async (tipoConstancia,cid,emailAlumno) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const qr = await generateQRCode(`https://ipfs.io/ipfs/${cid}`)
    const htmlTemplate = ` <style>
    .center {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 50%;
    }
        </style>
        <div class="center" style="align-items: center;">
            <img src="cid:utnlogo" 
            style=" display: block;
                    margin-left: auto;
                    margin-right: auto;"
            width="150" alt="" srcset="">
            <p>Su ${tipoConstancia} fue generada exitosamente</p>
            <p>Hash:<b>${cid}</b></p>
            <p>Link para visualizar el documento: https://ipfs.io/ipfs/${cid}</p>
            <img src=${qr}>
        </div>`
    let mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: emailAlumno, // list of receivers
        subject: 'Documentacion Universitaria', // Subject line
        attachDataUrls: true,
        attachments: [{
            filename: 'UTN_logo.jpg',
            path: process.env.UTN_LOGO_PATH,
            cid: 'utnlogo' //same cid value as in the html img src
        }],
        html: htmlTemplate // html body
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
    });
}

const generateQRCode = async (url) => {

    let img = await QRCode.toDataURL(url);
    return img;
}

const agregarFile = async (filename,fileContent) => {
    try{
          const node = await getIPFSNodeInstance()
          const fileAdded = await node.add({
            path: `${filename}.pdf`,
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

  const convertToBuffer = async (file) => {
    // Convert file to buffer so that it can be uploaded to IPFS
    const buffer = await Buffer.from(file);
    console.log("Buffer: ",buffer)
    return buffer
  };
  
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