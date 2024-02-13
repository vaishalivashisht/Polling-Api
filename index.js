const express = require('express');
const app = express();
const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use('/', require('./routes/'))

app.listen(8000, (err)=>{
    if(err){
        console.log("Error Connecting to Server!");
        return
    }

    console.log("Successfully Connected to Server! 8000");
})