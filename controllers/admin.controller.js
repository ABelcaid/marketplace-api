const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.model');
const jwt_decode = require('jwt-decode');
const { inputValidationSchema  } = require("./inputValidation");




 const addAdmin = async (req, res) => {

        try {

                let error = [];

        
                const { err } = inputValidationSchema.validate(req.body)
                if (err) {

                        

                        error.push(err.details[0].message);
                        return res.json({

                                error : error
                        }) 

                };


                const { role } = req.admin;

                if (role !== 'root') {
                        return res.status(403).json({
                            message: 'untheorized'
                          })
                    }
                   
                const existingAdmin = await Admin.findOne({email : req.body.email});


               

                if (existingAdmin) {

                        error.push('An account whit this email exist ');
                        return res.json({

                                error : error
                        }) 

                        // return res.status(400).json({
                        //         errorMessage : "An account whit this email exist "
                        // });
                        
                }

                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.body.password, salt)

                const newAdmin = new Admin({
        
                                name: req.body.name,
                                email: req.body.email,
                                phone: req.body.phone,
                                password: hashPassword,
                                role: req.body.role,
                                city: req.body.city,
                                
        
                });
                
                const saveAdmin = await newAdmin.save();

                res.json({message : 'Admin added'})

                

                
            }
            catch (err) {
                console.error(err);
                res.status(500).send();
            }
     
}





const loginAdmin = async (req, res) => {

        try {

                let error = [];

        
                const { err } = inputValidationSchema.validate(req.body)
                if (err) {

                        

                        error.push(err.details[0].message);
                        return res.json({

                                error : error
                        }) 

                };



                let email = req.body.email;
                let password = req.body.password;

                const admin = await Admin.findOne({ email: email })

                if (!admin) {

                        error.push('Admin note found');
                        return res.json({

                                error : error
                        }) 
                        // return res.status(404).send({
                        //         message : 'Admin note found'
                        // })

                        
                }

                if (!await bcrypt.compare(password, admin.password)) {

                        error.push('invalid credentials');
                        return res.json({

                                error : error
                        }) 
                //         return res.status(404).send({
                //                 message : 'invalid credentials '
                //         })  
                }


                const token = jwt.sign({id: admin._id, role : admin.role }, process.env.JWT_SECRET_KEY);

                res.cookie('jwt',token, {
                        httpOnly : true,
                        maxAge : 24 * 60 * 60 * 1000 //24h
                }); 

                res.send({
                        message : "login success",
                        role : admin.role,
                        first_login : admin.first_login,
                        adminName : admin.name
                })

            }
            catch (err) {
                    console.error(err)

            }

}






const loggedIn = async (req , res) =>{
        
  try {
        const token = req.cookies['jwt'];

        if (!token) return res.json({loggedIn : false});

        jwt.verify(token, process.env.JWT_SECRET_KEY);

        let decoded = await jwt_decode(token);
        let role = decoded.role;


        if(role == "admin" ||  role == "root"){

                res.send({
                        loggedIn : true,
                        role : role
                })
        }else{
                res.json({loggedIn : false})
        }

     

        


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





const updatePassword = async (req, res) =>{

        try {
                let decoded = await jwt_decode(req.cookies['jwt']);
                let id = decoded.id;
 
                let newPassword = req.body.password;

                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(newPassword, salt)


                const admin = await Admin.findByIdAndUpdate(id, {password :hashPassword, first_login : true },{ useFindAndModify: false })

                if (!admin) {
                        return res.status(404).send({
                                message : 'Admin note found'
                        })

                        
                }
                res.send({
                        message : "Password Updated ",
                })


          



            }
            catch (err) {
                    console.error(err)

            }

}




const getAllAdmin = async (req, res) => {

        try {
                const { role } = req.admin;

                if (role !== 'root') {
                        return res.status(403).json({
                            message: 'untheorized'
                          })
                    }
                
                let adminList = await Admin.find()  
                if (!adminList) {
                        return res.status(404).send({
                                message : 'Admin note found'
                        })                
                }  
                res.send(adminList);

            }
            catch (err) {
                console.error(err)
            }


}


const deleteAdmin = async (req ,res ) =>{

      const id = req.params.id

        try {
             


                const admin = await Admin.findByIdAndRemove(id,{ useFindAndModify: false })

                res.send({
                        message : "Admin deteted ",
                })


          



            }
            catch (err) {
                    console.error(err)

            }

}











module.exports = {
        addAdmin ,loginAdmin,getAllAdmin,logOut,loggedIn,updatePassword,deleteAdmin
};