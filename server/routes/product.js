const express = require('express');
var router = express.Router();
var { Product } = require('../models/product');
var { Category } = require('../models/category');
const product = require('../models/product');

router.post('/add-product',(req, res) => {
    console.log(req.body);
    Product.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });
  
  // router.get('/',(req, res) => {
  //   Product.find( {  limit: 5 }, function(error, data){
  //     if (error) {
  //       return next(error)
  //     } else {
  //       res.json(data)
  //     }
  //   })
  // })
  
  
router.get('/',function(req,res){
    var Pagenumber = parseInt(req.query.Pagenumber)
    var Pagesize = parseInt(req.query.Pagesize)
    var query = {}
    if(Pagenumber < 0 || Pagenumber === 0) {
          response = {"error" : true,"message" : "invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = Pagesize * (Pagenumber - 1)
    query.limit = 10
    var view_data=[];
    Product.find({}).populate('category_id', ['category_name']).exec(query,function(err,product){
      if(err){
        console.error(err);
      }else if(product!='' || product!=undefined || product!='undefined' || product!=null){
        product.forEach(function(products){
        view_data.push({
          category_name:products.category_id.category_name,
          product_name:products.product_name,
          product_id : products._id,
          category_id:products.category_id._id,
          
        })
    
      })
        res.json({
          status:200,
          data:view_data
          
        });
      }else{
        res.json({
          status:400
        });
      }
    });
    });
    

  router.get('/read-product/:id',(req, res) => {
    Product.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  
  
router.put('/update-product/:id',(req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Student successfully updated!')
      }
    })
  })
  
  
  router.delete('/delete-product/:id',(req, res) => {
    Product.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

  module.exports = router;