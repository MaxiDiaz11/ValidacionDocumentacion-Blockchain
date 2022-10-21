import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

//!IPFS

// import * as IPFS from "ipfs-core";

// const createNode = async () => {
//   const node = await IPFS.create();

//   const fileAdded = await node.add({
//     path: "test.txt",
//     content: "Hello IPFS!",
//   });

//   console.log("Added file:", fileAdded.path, fileAdded.cid);
// };


// createNode();
