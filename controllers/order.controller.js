
const Order = require('../models/order.model');


const validateOrder = async (req,res) =>{

        try {
                const { role } = req.admin;

                let id = req.params.id

                if (role == 'root' || role == 'admin') {

                    let order = await Order.findByIdAndUpdate(id,{shipped : true})  
                if (!order) {
                        return res.status(404).send({
                                message : 'order note found'
                        })                
                }  
                res.send({ message : 'order Shipped'});




                }else {
                    return res.status(403).json({
                        message: 'untheorized'
                      })
                }



                // if (role !== 'root') {
                //         return res.status(403).json({
                //             message: 'untheorized'
                //           })
                //     }
                
                // let sellersList = await User.find({wantToBeSeller: true})  
                // if (!sellersList) {
                //         return res.status(404).send({
                //                 message : 'sellers note found'
                //         })                
                // }  
                // res.send(sellersList);

            }
            catch (err) {
                console.error(err)
            }

}





const getAllOrders = async (req,res) =>{

        try {
                const { role } = req.admin;

                if (role == 'root' || role == 'admin') {

                        let orders = await Order.find({shipped: false});
                        if (!orders) {
                                return res.status(404).send({
                                        message : 'orders note found'
                                })                
                        }  
                        res.send(orders);
                     
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






module.exports = {validateOrder,getAllOrders}