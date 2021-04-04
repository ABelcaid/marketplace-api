const Product = require('../models/product.model');
const User = require('../models/user.model');





 const addProduct = async (req, res) => {

    let error = [];

        try {
                const { role,id } = req.user;

             

                if (role !== 'seller') {
                        return res.status(403).json({
                            message: 'untheorized'
                          })
                }

      


                // -----------------check account type before list the product

                   let userAccount = await User.findById(id);

                    let typeAccount = userAccount.typeAccount;
                   
                    let listedProduct = userAccount.listedProduct;
     

                    if (typeAccount == 'starter') {

                        if (listedProduct >= 10 ) {

                           

                            error.push('If you want to seller more ,pls upgrade your acoount ');
                            return res.json({
                                    error : error
                            }) 
                            
                        }

                    }
                    if (typeAccount == 'pro'){

                        if (listedProduct >= 50 ) {

                            error.push('If you want to seller more ,pls upgrade your acoount ');
                            return res.json({
                                    error : error
                            }) 
                            
                        }

                        
                    }



                const newProduct = new Product({
        
                                name: req.body.name,
                                price: req.body.price,
                                image: req.body.image,
                                description: req.body.description,
                                category : req.body.category,
                                id_seller : id
                });
                
                const saveProduct = await newProduct.save();
                const editNumOfProductListed = await User.findByIdAndUpdate(id,{listedProduct : listedProduct+1})

                res.json({message : "product added "});

                

                
            }
            catch (err) {
                res.json(err)
            }
     
}

const sellerProducts = async(req,res) => {

    try {
        const { role,id } = req.user;

     

        if (role !== 'seller') {
                return res.status(403).json({
                    message: 'untheorized'
                  })
        }

        const products = await Product.find({ id_seller: id },{ selled: false })

        if (!products) {

            return res.json({
                error : "You have no product yet "
            }) 

                
        }

        res.send(products);
           



        

        
    }
    catch (err) {
        res.json(err)
    }
     
    
}


// -------------get product py category -----------

const productByCategory = async(req,res)=>{

    try {

        const category = req.params.category;
        const length = req.params.length;

   

      
        

        const products = await Product.find({ category: category },{ selled: false }).limit(parseInt(length));

        if (!products) {

            return res.json({
                error : "You have no product yet "
            }) 

                
        }

        res.send(products);


        
    } catch (err) {
        res.json(err)
        
    }

    

}



// -------------get product py category -----------

const productById= async(req,res)=>{

    try {

        const id = req.params.id;
        

   

      
        

        const products = await Product.findById(id,{ selled: false });

        if (!products) {

            return res.json({
                error : "You have no product yet "
            }) 

                
        }

        res.send(products);


        
    } catch (err) {
        res.json(err)
        
    }

    

}







module.exports = {
    addProduct,sellerProducts,productByCategory,productById
};