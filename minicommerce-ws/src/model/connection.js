const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = "mongodb://localhost:27017/minniCommerceDB"

const productSchema = mongoose.Schema({
    prodId:{type:String,required:true,unique:true},
    title:{type:String,required:true,unique:true},
    desc:{type:String,required:true},
    img:{type:String,required:true},
    categories:{type:String},
    quantityAvailable:{type:Number,min:1},
    color:{type:String},
    price:{type:Number,required:true}
},{collection:"Product",timestamps:true})

const userSchema = mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    userName:{type:String,required:true,unique:true},
    userEmail:{type:String,required:true,unique:true},
    userPwd:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
},{collection:"User",timestamps:true})

const orderSchema = mongoose.Schema({
    orderId:{type:String,required:true,unique:true},
    userEmail:{type:String,required:true,unique:true},
    products:[
        {
            prodId:{type:String,required:true},
            title:{type:String,required:true},
            desc:{type:String,required:true},
            img:{type:String,required:true},
            categories:{type:String,required:true},
            quantityAvailable:{type:Number,},
            color:{type:String},
            price:{type:Number,required:true}
        }
    ],
    amount:{type:Number,required:true,default:0},
    address:{type:Object,required:true,default:""},
    status:{type:String}
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