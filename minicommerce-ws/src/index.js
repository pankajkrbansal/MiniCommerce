const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./routing/routing');

app.use('/',router);

app.listen(1050,()=>{
    console.log("Server@1050");
})

module.exports = app;