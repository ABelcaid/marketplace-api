const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const DeliveryMan = require('../models/deliveryMan.model');






 const addDeliveryMan = async (req, res) => {

        let error = [];

        try {
                
     
                const existingDeliveryMan = await DeliveryMan.findOne({email : req.body.email});

                if (existingDeliveryMan) {

                        error.push('A Delivery Man whit this email exist');
                        return res.json({

                                error : error
                        }) 

                     
                        
                }


                const newDeliveryMan = new DeliveryMan({
        
                                name: req.body.name,
                                email: req.body.email,
                                phone: req.body.phone,
                             
                                
        
                });
                
                const saveDeliveryMan = await newDeliveryMan.save();

                

                res.json({message : ' SuccessFully added'});


            }
            catch (err) {
                console.error(err);
                res.status(500).send();
            }
     
}







const getAllDeliveryMan = async (req,res) =>{

        try {
                const { role } = req.admin;

                if (role == 'root' || role == 'admin') {

                        let deliveryManList = await DeliveryMan.find();
                        if (!deliveryManList) {
                                return res.status(404).send({
                                        message : 'delivery Man note found'
                                })                
                        }  
                        res.send(deliveryManList);
                     
                    }
                    else{

                        return res.status(403).json({
                                message: 'untheorized'
                              })
                    }

                        
                    
                
          

            }
            catch (err) {
                console.error(err)
            }


}





const deleteDeliveryMan= async (req ,res ) =>{

        const id = req.params.id
  
          try {

                const { role } = req.admin;

                if (role == 'root' || role == 'admin') {

                        const deliveryMan = await DeliveryMan.findByIdAndRemove(id,{ useFindAndModify: false });

  
                        res.send({
                                message : "Delivery Man deteted ",
                        })


                } else{

                        return res.status(403).json({
                                message: 'untheorized'
                              })
                    }
               
  
  
                  
  
  
            
  
  
  
              }
              catch (err) {
                      console.error(err)
  
              }
  
  }
  


module.exports = {addDeliveryMan,getAllDeliveryMan,deleteDeliveryMan}