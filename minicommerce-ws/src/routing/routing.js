const express = require('express');
// const { setupDB } = require('../model/setupDB');
const router = express.Router();
const setup = require('../model/setupDB');
const User = require('../model/User');
const service = require('../services/service')
const loginUser = require('../model/loginUser')


router.get('/setup',async(req,res,next)=>{
    try{
        let dbsetup = await setup.setupDB();
        res.json(dbsetup)
    }catch(error){
        next(error);
    }
});


router.post('/register',async(req,res,next)=>{
    try{
        let userDetails = new User(req.body);
        console.log(userDetails);
        let didRegister = await service.didRegister(userDetails);
        res.json("User Registerd with email id : "+didRegister[0].userEmail);
    }catch(err){
        next(err);
    }
})

router.post('/login',async(req,res,next)=>{
    try{
        let data = new loginUser(req.body);
        let loginResponse = await service.loginHandle(data);
        res.json("successfuly logged in with email id "+loginResponse.userEmail)
    }catch(error){
        next(error);
    }
})

router.get('/products',async(req,res,next)=>{
    try{
        let productsArray = await service.getAllProducts();
        res.json(productsArray);
    }catch(error){
        next(error);
    }
})

router.post('/addtocart/:userEmail',async(req,res,next)=>{
    try{
        let userEmail = req.params.userEmail;
        // console.log(userEmail);
        console.log(req.body);
        let updatedCart = await service.addToCart(req.body,userEmail);
        return updatedCart
    }catch(error){
        next(error)
    }
})

router.get('/viewcart/:email',async(req,res,next)=>{
    try{
        let email = req.params.email;
        let cartView = await service.viewCart(email);
        console.log("-----Cart-------");
        console.log(cartView);
        res.json(cartView)
    }catch(error){
        next(error);
    }
})

router.post('/checkout/:email',async(req,res,next)=>{
    try{
        let email = req.params.email;
        // console.log(req.body.address);
        let checkResponse = await service.checkOut(req.body,email);
        // console.log("-----------------------------------------------------------");
        // console.log(checkResponse);
        // return checkResponse
        res.json(checkResponse)
    }catch(error){
        next(error);
    }
})

module.exports = router;