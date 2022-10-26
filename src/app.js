import * as IPFS from "ipfs-core";
import express from "express";


const app = express();
const port = 3000;

app.post("/uploadfile", async (req, res) => {
    
    const cid = await createNode(req.fileName,req.fileContent)

    res.send(cid);
});

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
