const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const DelevryMan = new Schema(
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
    phone : {
      type : String,
      required : true,
      unique: true
    }

    
  },
  {
    versionKey: false
}
);

const DelevryManList = mongoose.model("DelevryMan", DelevryMan);
module.exports = DelevryManList;
