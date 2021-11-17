let connection = require('./connection')

let model = {};

const generateId = async()=>{
    let empData = await connection.getUserSchema();
    let eids = await empData.distinct('userId');
    let maxEid = Math.max(...eids);
    console.log(maxEid);
    return maxEid+1;
}


model.didRegister = async(usrObj)=>{
    let usrSchema =await connection.getUserSchema();
    let findUsr = await usrSchema.findOne({userEmail:usrObj.userEmail})
    console.log(findUsr);
    if(findUsr){
        let err = new Error("User already exists");
        err.status = 400;
        throw err;
    }
    usrObj.userId = await generateId();
    let didReg =await usrSchema.insertMany(usrObj)
    if(didReg){
        // console.log(didReg);
        return didReg;
    }else{
        return null;
    }
}

model.loginHandle = async(loginData)=>{
    let userSchema = await connection.getUserSchema();
    let emailFound = await userSchema.findOne({userEmail:loginData.userEmail});
    if(emailFound){
        return emailFound
    }else{
        let err = new Error("Register before login");
        err.status  = 400;
        throw err;
    }
}

model.getAllProducts = async()=>{
    let products = await connection.getProductSchema();
    let productsArray = await products.find();
    if(productsArray.length>0){
        return productsArray;
    }else{
        return null;
    }
}

model.checkAvailability = async(productItem)=>{

}

model.addToCart = async(productItem,userEmail)=>{
    console.log("----Model------");
    // console.log(productItem);
    // console.log("MODEl = "+userEmail);
    let cartCollection = await connection.getOrderSchema();
    let cartOfUser = await cartCollection.findOne({userEmail:userEmail});

    if(!cartOfUser){
        let cartObj = {}
        cartObj.userEmail = userEmail;
        cartObj.products = []
        cartObj.products.push(productItem);
        console.log("--------OBJ-----------");
        console.log(cartObj);
        let cartCreated = await cartCollection.create(cartObj);
        if(cartCreated){
            // console.log("----IF--------");
            // console.log(cartCreated);
            return cartCreated;
        }else{
            return null;
        }
    }else{
        let newProductList = cartOfUser.products.push(productItem);
        let updatedCart = await cartCollection.update({userEmail:userEmail},{$push:{products:productItem}})
        console.log("-------ELSE--------");
        console.log(cartOfUser);
        return cartOfUser;
    }
// =======================================================================
    //     let cartCollection = await connection.getOrderSchema();
//     console.log(cartCollection);
//     let cartOfUser = await cartCollection.findOne({userEmail:userEmail});
   
//    if(cartOfUser){

//    }else{
//        let newCartObj = {};
//        newCartObj.products = [productItem];
//        newCartObj.userEmail = userEmail;
//        newCartObj.amount = productItem.price;
//        let newCart = await connection.getOrderSchema();
//        let isAdded = await newCart.create(newCartObj);
//        if(isAdded){
//            return newCartObj
//        }else{
//            return null;
//        }
//    }
   
   
   
   
    // let oldAmount = cartOfUser.amount;

    // console.log(cartOfUser);

    // let cartPush = await cartOfUser.updateOne({},{
    //     $push:{
    //         products:productItem
    //     }
    // })
    // if(cartPush.nModified == 1){
    //     return cartOfUser
    // }else{
    //     console.log("Error");
    // }
    // let isProductPresent = await cartOfUser.findOne({"products.productId":productItem.productId});
    // if(isProductPresent){
    //     // update already present product in cart
    //     let isAvailable = this.checkAvailability(productItem);
    //     if(!isAvailable){
    //         let err = new Error("Product is out of stock");
    //         err.status = 500;
    //         throw err;
    //     }else{
    //         let updateProduct = await cartOfUser.updateOne({userEmail:userEmail},
    //             {"products.quantity":{
    //                 $inc:1
    //             }}
    //             );
    //             if(updateProduct.nModified == 1){
    //                 let updateCost = await cartOfUser.updateOne({userEmail:userEmail},{
    //                     amount:{
    //                         $inc:productItem.price
    //                     }
    //                 })
    //                 if(updateCost.nModified == 1){
    //                     return await cartOfUser.findOne({userEmail:userEmail});
    //                 }   
    //             }
    //     }
    // }else{
    //     //push fresh product
        
    // }
}

module.exports = model;