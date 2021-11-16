const connection = require('./connection');

const product = [
    {
        prodId:"P1001",
        title:"Gaming Laptop",
        desc:"Best gaming laptop in market.",
        img:"GamingLaptop.png",
        categories:"Laptop",
        quantityAvailable:"10",
        color:"Grey",
        price:40000
    },
    {
        prodId:"P1002",
        title:"Office Laptop",
        desc:"Best gaming laptop in market.",
        img:"OfficeLaptop.png",
        categories:"Laptop",
        quantityAvailable:"10",
        color:"Grey",
        price:40000
    },{
        prodId:"P1003",
        title:"Gaming Keyboard",
        desc:"Best gaming Keyboard in market.",
        img:"keyboard.png",
        categories:"keyboard",
        quantityAvailable:"10",
        color:"Grey",
        price:5000
    },{
        prodId:"P1004",
        title:"Gaming Mouse",
        desc:"Best gaming mouse in market.",
        img:"mouse.png",
        categories:"Mouse",
        quantityAvailable:"10",
        color:"Grey",
        price:2000
    }
]

const user = [
    {
        userName:"Jeff",
        userEmail:"jeff@gmail.com",
        userPwd:"jeff@1998",
        isAdmin:false   
    }
]


const order = [
    {
        userEmail:"jeff@gmail.com",
        products:[
            {
                productId:"P1001",
                title:"Gaming Laptop",
                quantity:1,
                price:40000
            }
        ],
        amount:40000,
        address:"Delhi India",
        status:"Ordered"
    }
]

const setup = {};

setup.setupDB = async()=>{
    const productModel = await connection.getProductSchema()
    await productModel.deleteMany();
    let seedProduct = await productModel.insertMany(product);


    const userModel = await connection.getUserSchema();
    await userModel.deleteMany();
    let userSeed = await userModel.insertMany(user);
 
    const orderModel = await connection.getOrderSchema();
    await orderModel.deleteMany();
    let seedOrder = await orderModel.insertMany(order);

    if(userSeed && seedProduct && seedOrder){
        return {message:"Database setup success"}
    }else{
        throw error;
    }
}


module.exports = setup;