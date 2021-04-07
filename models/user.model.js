const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    phone : {
      type : String,
      required : true,
      unique: true
    },
    address : {
      type : String,
      required : true 
    },
    role :{
       type : String,
       required : true,
       default: "buyer"
    },
    verified: {
      type: Boolean,
      default: false,
    },
    wantToBeSeller: {
      type: Boolean,
      default: false,
    },
    typeAccount:{
      type: String,
      default: 'starter',

    },
    listedProduct: {
      type: Number,
      default: 0,
    },
    income : {
      type: Number,
      default: 0,
    }

    
  },
  {
    versionKey: false
}
);

const UsersList = mongoose.model("User", User);
module.exports = UsersList;
