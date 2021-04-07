const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const Ads = new Schema(
  {
    
    description: {
      type: String,
 
    },
    image: {
      type: String,
    }
    
  },
  {
    versionKey: false
}
);

const AdsList = mongoose.model("Ads", Ads);
module.exports = AdsList;
