/* This is a [low-key] middleware for our webpack transpiler. */

const PORT = process.env.PORT || 8080;
const express = require('express');

const app = express();

app.use(express.static('dist')); // for such right here 

app.listen(PORT, () =>{
  console.log(
      `Client-side host listening on port ${PORT}.\n`
  );
})