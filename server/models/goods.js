var mongoose = require('mongoose')
var Schema = mongoose.Schema;
//表模型
var productSchema = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "productImage": String,
    "productNum": String,
    "checked": String
})
module.exports = mongoose.model('Good', productSchema); //Good自动加s  关联goods  或者第三个参数写goods