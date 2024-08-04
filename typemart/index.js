"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("./products");
const productName = "fanny pack";
let shipping;
let taxPercent;
let taxTotal;
let total;
const shippingAddress = "789 Broadway, New York City, New York";
const product = products_1.default.filter((product) => product.name === productName)[0];
console.log(product);
if (product.preOrder === "true") {
    console.log("We will send you a message when your product is on its way.");
}
if (Number(product.price) > 25) {
    shipping = 0;
    console.log("We provide free shipping for this product");
}
else {
    shipping = 5;
}
if (shippingAddress.match("New York")) {
    taxPercent = 0.1;
}
else {
    taxPercent = 0.05;
}
taxTotal = Number(product.price) * taxPercent;
total = Number(product.price) + taxTotal + shipping;
console.log(`
Product:  ${product.name}
Address:  ${shippingAddress}
Price:    $${product.price}
Tax:      $${taxTotal.toFixed(2)}
Shipping: $${shipping.toFixed(2)}
Total:    $${total.toFixed(2)}
`);
