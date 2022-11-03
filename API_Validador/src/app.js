import * as IPFS from "ipfs-core";
import express from "express";

const app = express();
const port = 3000;

app.get("/uploadfile",async (req, res) => {
    
    console.log("Body:",req.body)
    const contentToBytes = base64ToArrayBuffer(req.body.fileContent)
    const cid = await createNode(req.fileName,contentToBytes)

    res.send(cid);
});


const base64ToArrayBuffer = (base64) => {
  let buff = new Buffer(base64);
  let base64data = buff.toString('base64');
  return base64data
}


app.get("/validate", async (req,res) => {



})


app.listen(port, () => {
return console.log(`Express is listening at http://localhost:${port}`);
});



const createNode = async (filename,fileContent) => {
  const node = await IPFS.create();

  const fileAdded = await node.add({
    path: filename,
    content: fileContent,

  });
  console.log("Added file:", fileAdded.path, fileAdded.cid);
  return fileAdded.cid;
};

