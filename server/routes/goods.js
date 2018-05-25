 
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Goods=require('../models/goods');

mongoose.connect('mongodb://127.0.0.1/dumall')
// mongoose.connect('mongodb://root:123456@193.112.74.53:27017')
mongoose.connection.on("connected",function(){
    console.log("MongoDB connected success.")
})
mongoose.connection.on("error",function(){
    console.log("MongoDB connected fail.")
})
mongoose.connection.on("disconnected",function(){
    console.log("MongoDB connected disconnected.")
})
 
router.get('/', function(req, res, next) {
    let page=parseInt(req.param('page'));
    let pageSize=parseInt(req.param('pageSize'));
    let sort=req.param('sort');
    let params={};
    let skip=(page-1)*pageSize;
    let goodsModel=Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({
        'salePrice':sort
    })
    goodsModel.exec(function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }
        else{
            console.log(doc);
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    }) 
  });


module.exports = router;