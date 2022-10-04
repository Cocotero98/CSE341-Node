const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors());
app.use('/', require('./routes'));
process.on('uncaughtException', (error, source) => {
  console.log(process.stderr.fd, `Caught exception: ${error}, Exception origin: ${source}`);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
