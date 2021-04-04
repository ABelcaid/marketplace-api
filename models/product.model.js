const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      
    },
    description: {
      type: String,
      required: true,
    },
    image : {
      type : String,
      required : true,
    },
    category: { 
        type: String, 
        required: true
    },
    id_seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    selled: {
        type: Boolean,
        default: false,
    }
  },
  {
    versionKey: false
}
);

const ProductList = mongoose.model("Product", Product);
module.exports = ProductList;
