const mongoose = require('mongoose');
const { Schema } = mongoose;
var Product = mongoose.model('Product',{
    product_id: {
        type: Number,
        required:true
        
    },
    product_name:{ type:String,
        required:true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
      },
    
     
});

module.exports = { Product};
