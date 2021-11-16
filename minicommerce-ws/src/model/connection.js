const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = "mongodb://localhost:27017/minniCommerceDB"

const productSchema = mongoose.Schema({
    prodId:{type:String,required:true,unique:true},
    title:{type:String,required:true,unique:true},
    desc:{type:String,required:true},
    img:{type:String,required:true},
    categories:{type:String,required:true},
    quantityAvailable:{type:Number,required:true,min:1},
    color:{type:String},
    price:{type:Number,required:true}
},{collection:"Product",timestamps:true})

const userSchema = mongoose.Schema({
    userName:{type:String,required:true,unique:true},
    userEmail:{type:String,required:true,unique:true},
    userPwd:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
},{collection:"User",timestamps:true})

const orderSchema = mongoose.Schema({
    userEmail:{type:String,required:true,unique:true},
    products:[
        {
            productId:{type:String,required:true},
            title:{type:String,required:true,unique:true},
            quantity:{type:Number,default:1},
            price:{type:Number,required:true}
        }
    ],
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Ordered"}
},{collection:"Order"},{timestamps:true})

const collection = {};

collection.getProductSchema = async()=>{
    try{
        let connection = await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
        let productModel = await connection.model("Product",productSchema);
        return productModel
    }catch(error){
        let err = new Error("Error in product schema setup");
        err.status = 500;
        throw err;
    }
}


collection.getOrderSchema = async()=>{
    try{
        let connection = await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
        let orderModel = await connection.model("Order",orderSchema)
        return orderModel;
    }catch(error){
        let err = new Error("Error in order schema setup");
        err.status = 500;
        throw err;
    }
}


collection.getUserSchema = async()=>{
    try{
        let connection = await mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true});
        let userModel = connection.model("User",userSchema);
        return userModel;
    }catch(error){
        let err = new Error("Error in user schema setup");
        err.status = 500;
        throw err;
    }
}

module.exports = collection;