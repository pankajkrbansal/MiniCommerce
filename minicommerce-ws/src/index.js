const express = require('express');
const cors = require('cors');
const app = express();
const errorLogger = require('./utilities/errorLogger');
const requestLogger = require('./utilities/requestLogger');
const router = require('./routing/routing');

app.use(cors());

app.use(express.json());

app.use(requestLogger);
app.use('/',router);
app.use(errorLogger);

app.listen(1050,()=>{
    console.log("Server@1050");
})

module.exports = app;