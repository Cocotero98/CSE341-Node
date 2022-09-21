const express = require('express')
const app = express()
const port = 3000

//Trying to connect
const connection = require('./db/connection')

app.use('/', require('./routes'))
// app.use('/contacts/', require('./routes/contacts'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// connection.dbConnect().catch(console.error);