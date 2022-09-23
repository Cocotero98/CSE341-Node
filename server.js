const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

// const cors = require('cors');

//Trying to connect
const connection = require('./db/connection')

// app.use(cors())

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
app.use('/', require('./routes'))
// app.use('/contacts/', require('./routes/contacts'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// connection.dbConnect().catch(console.error);