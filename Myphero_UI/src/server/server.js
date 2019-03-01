const PORT = process.env.PORT || 8080;
const express = require('express');

const app = express();

app.use(express.static('dist'));

app.listen(PORT, () =>{
  console.log(
      `Client-side host listening on port ${PORT}.\n`
  );
})