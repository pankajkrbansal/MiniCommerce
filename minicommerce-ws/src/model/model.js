let connection = require("./connection");

let model = {};

const generateId = async () => {
  let empData = await connection.getUserSchema();
  let eids = await empData.distinct("userId");
  let maxEid = Math.max(...eids);
  console.log(maxEid);
  return maxEid + 1;
};

const generateOrderId = async () => {
  let empData = await connection.getOrderSchema();
  let eids = await empData.distinct("orderId");
  let oid = "";
  eids.map((id) => {
    oid = id.substr(1);
  });
  let bId = parseInt(oid);
  let oId = "O" + (bId + 1);
  return oId;
};

model.didRegister = async (usrObj) => {
  let usrSchema = await connection.getUserSchema();
  let findUsr = await usrSchema.findOne({ userEmail: usrObj.userEmail });
  console.log(findUsr);
  if (findUsr) {
    let err = new Error("User already exists");
    err.status = 400;
    throw err;
  }
  usrObj.userId = await generateId();
  let didReg = await usrSchema.insertMany(usrObj);
  if (didReg) {
    // console.log(didReg);
    return didReg;
  } else {
    return null;
  }
};

model.loginHandle = async (loginData) => {
  let userSchema = await connection.getUserSchema();
  let emailFound = await userSchema.findOne({ userEmail: loginData.userEmail });
  if (emailFound) {
    return emailFound;
  } else {
    let err = new Error("Register before login");
    err.status = 400;
    throw err;
  }
};

model.getAllProducts = async () => {
  let products = await connection.getProductSchema();
  let productsArray = await products.find();
  if (productsArray.length > 0) {
    return productsArray;
  } else {
    return null;
  }
};

const checkAvailability = async (productItem) => {
  let product = await connection.getProductSchema();
  let item = await product.findOne({ prodId: productItem.prodId });
  console.log("item quantitty= " + item.quantityAvailable);
  if (item.quantityAvailable >= 1) {
    let updatedQuantity = await product.updateOne(
      { prodId: productItem.prodId },
      { $inc: { quantityAvailable: -1 } }
    );

    if (updatedQuantity.nModified == 1) {
      return true;
    } else {
      let err = new Error("Product out of stock. Try after some time.");
      err.status = 500;
      throw err;
    }
  }
};

model.addToCart = async (productItem, userEmail) => {
  let cartCollection = await connection.getOrderSchema();
  let cartOfUser = await cartCollection.findOne({ userEmail: userEmail });
  let available = await checkAvailability(productItem);
  console.log("Avaibalr = "+available);
  if (!cartOfUser) {
    let cartObj = {};
    cartObj.orderId = await generateOrderId();
    cartObj.userEmail = userEmail;
    cartObj.products = [];
    cartObj.products.push(productItem);
    // console.log(cartObj);
    let cartCreated = await cartCollection.create(cartObj);
    if (cartCreated) {
      // console.log(cartCreated);
      getAmount(userEmail);
      return cartCreated;
    } else {
      return null;
    }
  } else {
    let newProductList = cartOfUser.products.push(productItem);
    let updatedCart = await cartCollection.updateOne(
      { userEmail: userEmail },
      { $push: { products: productItem } }
    );
    getAmount(userEmail);
    return await cartCollection.findOne({ userEmail: userEmail });
  }
  // calculate amount for cart
  // getAmount();
};

const getAmount = async (userEmail) => {
  let cart = await connection.getOrderSchema();
  let cartUser = await cart.findOne({ userEmail: userEmail });
  let prodArray = cartUser.products;
  let amt = 0;
  prodArray.map((eachProd) => {
    amt = eachProd.price + amt;
  });
  await cart.updateOne({ userEmail: userEmail }, { $set: { amount: amt } });
};

model.viewCart = async (email) => {
  let cart = await connection.getOrderSchema();
  let userCart = await cart.findOne({ userEmail: email });
  if (userCart.products.length > 0) {
    return userCart;
  } else {
    return null;
  }
};

model.checkOut = async (add, email) => {
  console.log(add);
  let cart = await connection.getOrderSchema();
  let userCart = await cart.updateOne(
    { userEmail: email },
    { $set: { address: add } }
  );
  // console.log("------------ChecckOut----------------");
  // console.log(userCart);
  // let order = await connection.getOrderSchema();
  let userOrder = await cart.find({ userEmail: email });
  // console.log("userOredr === "+userOrder);
  if (userCart.modifiedCount == 1) {
    // console.log(userOrder.orderId);
    return userOrder[0].orderId;
  } else {
    return null;
  }
};

module.exports = model;
