const express = require('express');
var router = express.Router();
var { Category } = require('../models/category');


router.post('/add-category',(req, res) => {
    console.log(req.body);
    Category.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });
  
  router.get('/getcategory',(req, res) => {
    Category.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  
  router.get('/read-category/:id',(req, res) => {
    Category.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  
  
router.put('/update-category/:id',(req, res) => {
    Category.findByIdAndUpdate(req.params.id, {
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
  
  
  router.delete('/delete-category/:id',(req, res) => {
    Category.findByIdAndRemove(req.params.id, (error, data) => {
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