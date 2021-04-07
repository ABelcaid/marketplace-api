const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const Order = new Schema(
  {
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    ShippingAddress:{

        type: String,
        required: true,
    },
    shipped: {
      type: Boolean,
      default: false,
      
    },
    price: {
      type: Number,
      required: true,
    }
  },
  {
    versionKey: false
}
);

const OrderList = mongoose.model("Order", Order);
module.exports = OrderList;
