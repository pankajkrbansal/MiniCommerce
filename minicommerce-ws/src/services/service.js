const model = require('../model/model');
let user = {};

user.didRegister = async(userData)=>{
    let usrRegister = await model.didRegister(userData);
    console.log(usrRegister);
    if(usrRegister){
        return usrRegister
    }else{
        let err = new Error("Failed to register user");
        err.status = 500;
        throw err;
    }
}

user.loginHandle = async(loginData)=>{
    let modelResponse = await model.loginHandle(loginData);
    if(modelResponse){
        return modelResponse
    }else{
        let err = new Error("Failed to login");
        err.status = 500;
        throw err;
    }
}

user.getAllProducts = async()=>{
    let productsArray = await model.getAllProducts();
    if(productsArray.length>0){
        return productsArray;
    }else{
        let err = new Error("Product Catalogue is empty");
        err.status = 501
        throw err;
    }
}

user.addToCart = async(productItems,userEmail) =>{
    let updatedCart = await model.addToCart(productItems,userEmail);
    if(updatedCart){
        return updatedCart;
    }else{  
        let err = new Error("Failed to add to cart");
        err.status = 500;
        throw err;
    }
}


user.viewCart = async(email)=>{
    let cartView = await model.viewCart(email);
    if(cartView){
        return  cartView
    }else{
        let err = new Error("Failed to fetch cart");
        err.status = 500;
        throw err;
    }
}

user.checkOut = async(data,email)=>{
    let res = await model.checkOut(data,email);
    console.log("res = "+res);
    if(res){
        return res;
    }else{
        let err = new Error("Failed to log address");
        err.status = 500;
        throw err;
    }
}

module.exports = user;