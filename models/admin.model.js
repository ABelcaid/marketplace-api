const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const Admin = new Schema(
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
    city : {
      type : String,
      required : true 
    },
    role :{
       type : String,
       required : true
    },
    first_login :{
      type : Boolean,
      default : false
   },
    
  },
  {
    versionKey: false
}
);

const AdminsList = mongoose.model("Admin", Admin);
module.exports = AdminsList;
