// import express from "express";
// import * as IPFS from "ipfs-core";
// const app = express();
// const port = 3000;

// const createNode = async () => {
//   const response = await IPFS.create();
//   return response;
// };

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/create", (req, res) => {
//   res.send(createNode());
// });

// app.listen(port, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });

import * as IPFS from "ipfs-core";
import type { CID } from "multiformats/cid";


const createNode = async () => {
  const node = await IPFS.create();

  const fileAdded = await node.add({
    path: "test.txt",
    content: "Hello IPFS!",
  });

  console.log("Added file:", fileAdded.path, fileAdded.cid);
};

// const readFile = async (ipfs: IPFS, cid: CID): Promise<string> => {
//   const decoder = new TextDecoder();
//   let content = "";

//   for await (const chunk of ipfs.cat(cid)) {
//     content += decoder.decode(chunk, {
//       stream: true,
//     });
//   }

//   return content;
// };

createNode();
