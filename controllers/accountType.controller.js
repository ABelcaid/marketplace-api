const stripe = require("stripe")("sk_test_51IcsGEHRH7LB9NYW3CaYsOua2SJjefBSHOJkvNVRFObmrNIlPgrOeGzwga2SQs6uZggdT3gNIGbZhFSvwlfWoKM600mN4jpvlk");
const { v4: uuidv4 } = require('uuid');

const User = require('../models/user.model');


const UpgradeAccount = async (req,res)=>{

    const { id } = req.user;

    

  let error;
  let status;
  try {


    const  product = req.body.product;
    const token = req.body.token;



    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.type}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";





    // ------------chage product status to selled ---------------------

    let newAccount = await User.findByIdAndUpdate(id,{typeAccount: product.type});






     

  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });


}

module.exports={
     UpgradeAccount 

}