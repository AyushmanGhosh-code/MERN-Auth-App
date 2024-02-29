const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async(req,res) => {
   try{
       const{name,email,password} = req.body;

       if(!name || !email || !password)
       {
        return res.status(400).json({
            success:false,
            message:'Please fill out all the details'
        })
       }

       const existingUser = await User.findOne({email});

       if(existingUser)
       {
        return res.status(401).json({
            success:false,
            message:"User already registered"
        })
       }

       let hashed;
       hashed = await bcrypt.hash(password,10);

       const user = await User.create({name,email,password:hashed})

       res.status(200).json({
        success:true,
        response:user,
        message:'Entry created successfully'
       })
   }catch(err){
       res.status(500).json({
        message:'Registration failed',
        success:false
       })
   }
}

exports.login = async(req,res) => {
    try{
        const{email,password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"Please fill out all the details"
            })
        }

        let user = await User.findOne({email});

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:'User not registered'
            })
        }

        const payload = {
            email:user.email,
            id:user._id
        }

        let token;

        if(await bcrypt.compare(password,user.password))
        {
            token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h'
            });
        

        user = user.toObject();
        user.token = token;
        user.password = undefined;
        console.log(user);

        res.status(200).json(
           { 
            success:true,
            user,
            token,
            message:'Logged in successfully'
           }
        )
        }

    }catch(err){
         res.status(500).json({
            success:false,
            message:'Login Issue',
            error:err.message
         })
    }
}