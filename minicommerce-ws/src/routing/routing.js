const express = require('express');
const { setupDB } = require('../model/setupDB');
const router = express.Router();
const setup = require('../model/setupDB');


router.get('/setup',async(req,res,next)=>{
    try{
        let dbsetup = await setup.setupDB();
        res.json(dbsetup)
    }catch(error){
        next(error);
    }
});

module.exports = router;