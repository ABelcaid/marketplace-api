const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt_decode = require('jwt-decode');


const {sendMail} = require('./sendMail');





 const register = async (req, res) => {

        let error = [];

        try {
                
     
                const existingUser = await User.findOne({email : req.body.email});

                if (existingUser) {

                        error.push('An account whit this email exist');
                        return res.json({

                                error : error
                        }) 

                     
                        
                }

                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(req.body.password, salt)

                const newUser = new User({
        
                                name: req.body.name,
                                email: req.body.email,
                                phone: req.body.phone,
                                password: hashPassword,
                                address: req.body.address,
                                
        
                });
                
                const saveUser = await newUser.save();

                // const userWithoutPassword = {password ...saveUser}

                res.json({message : ' SuccessFully registred'});



        // ----------------------send email validation -------------------------------


               const token = jwt.sign({name: req.body.name, email : req.body.email}, process.env.JWT_SECRET_KEY);

                let subject = "Email verification";
                let text = "Email verification";
                let output;
                output = `
                <h2>Please click on below link to activate your account</h2>
                <p>http://localhost:3000/validateAccount/${token}</p>`;

                sendMail(req.body.email,subject,text,output);
                // ----------------------send email validation -------------------------------
                
            }
            catch (err) {
                console.error(err);
                res.status(500).send();
            }
     
}



// -----------------activateAccount----------

const activateAccount = async (req,res)=>{

        const token = req.params.token;

        jwt.verify(token, process.env.JWT_SECRET_KEY);

        let decoded = await jwt_decode(token);
        let email = decoded.email;

         await User.findOneAndUpdate({ email: email },{verified : true});

         res.json({
                 message : "ok"
         });


}




const login = async (req, res) => {
         let error = [];

        try {
                let email = req.body.email;
                let password = req.body.password;

                const user = await User.findOne({ email: email })

                if (!user) {
                        error.push('User note found')
                        return res.json({
                                error : error
                        })

                        
                }

                if (!await bcrypt.compare(password, user.password)) {

                        error.push('invalid credentials ');
                        return res.json({
                                error : error
                        })  
                }

                if(!user.verified){
                        error.push('Please confirm your email to login ');
                        return res.json({

                                error : error
                        })  
                }

                // -------------we need alose to check if the user account is valid 
                // |
                // |                 code here
                // |


                const token = jwt.sign({id: user._id, role : user.role }, process.env.JWT_SECRET_KEY);

                res.cookie('jwt',token, {
                        httpOnly : true,
                        maxAge : 24 * 60 * 60 * 1000 //24h
                }); 

                res.json({
                        message : "login success",
                        userName : user.name
                })

            }
            catch (err) {
                    res.json(err)

            }

}





const getNumListedProduct = async (req, res) =>{

        try {
                const { role,id } = req.user;

             

                if (role !== 'seller') {
                        return res.status(403).json({
                            message: 'untheorized'
                          })
                }


                let userAccount = await User.findById(id);

                res.status(200).json(userAccount.listedProduct)

               
                 
                
        } catch (err) {
                res.json(err)
                
        }

}






const loggedInUser = async (req , res) =>{
        
  try {
        const token = req.cookies['jwt'];

        if (!token) return res.json({loggedIn : false});

        jwt.verify(token, process.env.JWT_SECRET_KEY);

        let decoded = await jwt_decode(token);
        let role = decoded.role;


        

        if(role == "seller" ||  role == "buyer"){

                res.send({
                        loggedIn : true,
                        role : role
                })
        }

     

        res.json({loggedIn : false})
 




  } catch (error) {
    res.json({loggedIn : false})
  }

}




const logOut = (req, res) => {

        res.cookie('jwt',"", {
                httpOnly : true,
                maxAge : 0 
        }); 

        res.send();
}



const becomeSeller = async (req, res) => {

        try {

                const token = req.cookies['jwt'];
                let decoded = await jwt_decode(token);
                let id = decoded.id;
                

               

               sellerUser = await User.findByIdAndUpdate(id,{ wantToBeSeller : true });

               res.json({message : 'We send your requet to the admin !'});


              
                

            }
            catch (err) {
                console.error(err)
            }


}


const makeItSeller = async (req,res) =>{

        try {

                let id = req.params.id
                

                let seller = {
                        role: 'seller',
                        wantToBeSeller : false
                }

               sellerUser = await User.findByIdAndUpdate(id,seller);

               res.send({message : 'the user has become a seller'});

               let subject = "Congratulations you are a seller";
               let text = "Congratulations you are a seller";
               let output;
               output = `
               <h2>congratulations you are a seller</h2>
               <p>Have a good day !</p>`;

               sendMail(sellerUser.email,subject,text,output);
              
                

            }
            catch (err) {
                console.error(err)
            }

}

const wantToBeSellerList = async (req,res) =>{

        try {
                const { role } = req.user;

                if (role !== 'root') {
                        return res.status(403).json({
                            message: 'untheorized'
                          })
                    }
                
                let sellersList = await User.find({wantToBeSeller: true})  
                if (!sellersList) {
                        return res.status(404).send({
                                message : 'sellers note found'
                        })                
                }  
                res.send(sellersList);

            }
            catch (err) {
                console.error(err)
            }

}


module.exports = {register, login,activateAccount,loggedInUser,logOut,becomeSeller,wantToBeSellerList,makeItSeller,getNumListedProduct}