const Ads = require('../models/ads.model');






 const addAds = async (req, res) => {


        try {


            const { role } = req.admin;

            if (role == 'root' || role == 'admin') {

                const newAds = new Ads({
        
                    description: req.body.description,
                    image: req.body.image,
                    
                 
                });
    
                const saveAds = await newAds.save();

    

                    res.json({message : ' SuccessFully added'});

            }else{


                return res.status(403).json({
                    message: 'untheorized'
                  })

            }
                

           


            }
            catch (err) {
                console.error(err);
                res.status(500).send();
            }
     
}







const getAds = async (req,res) =>{

        try {
                
            let adsList = await Ads.findOne();
            if (!adsList) {
                    return res.status(404).send({
                            message : 'Ads note found'
                    })                
            }  
            res.send(adsList);

                        

            }
            catch (err) {
                console.error(err)
            }


}





const deleteAds= async (req ,res ) =>{

        const id = req.params.id
  
          try {

                const { role } = req.admin;

                if (role == 'root' || role == 'admin') {

                        const ads = await Ads.findByIdAndRemove(id,{ useFindAndModify: false });

  
                        res.send({
                                message : "Ads  deleted ",
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
  


module.exports = {addAds,getAds,deleteAds}