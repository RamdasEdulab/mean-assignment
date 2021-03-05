const mongoose = require('mongoose');
const { Schema } = mongoose;
var Category = mongoose.model('Category',{
    category_id: {
        type: Number,
        
    },
    category_name:{type:String,
        
    },
    products: [
        {
          type: Schema.Types.ObjectId,
          ref: 'products',
        },
      ],
    
     
});

module.exports = { Category};
