const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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
                expiresIn:'1h'
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

exports.forgotPassword = async(req,res) => {
        try{
            const {email} = req.body;

        const user = await User.findOne({email:email});
        
        if(!user)
        {
            res.status(401).json({
                success:false,
                message:'User does not exist'
            })
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'2h'
        })

        var transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        const sendMail = transporter.sendMail({
            from:'DevHolic',
            to:email,
            subject:'Reset Password',
            text:`Reset Your Password: http://localhost:5173/reset-password/${user._id}/${token}`,
        })

        console.log(sendMail);

        res.status(200).json({
            success:true,
            sendMail,
            message:'Link generated'
        })
        }catch(err){
                res.status(500).json({
                    success:false,
                    message:err.message
                })
        }
}

exports.resetPassword = async(req,res) => {
    try{
        const{id,token} = req.params;
        const{password} = req.body;

        if(!password)
        {
            return res.status(400).json({
                success:false,
                message:'Details missing'
            })
        }

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET);

        if(!verifyToken)
        {
            return res.status(403).json({
                success:false,
                message:'Token not verified'
            })
        }

        const hashed = await bcrypt.hash(password,10);

        const user = await User.findByIdAndUpdate({_id:id},{password:hashed},{new:true});

        res.status(200).json({
            success:true,
            data:user,
            message:"Password updated successfully"
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}