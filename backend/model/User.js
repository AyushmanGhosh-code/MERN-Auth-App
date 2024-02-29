const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true
    },

    password:{
        type:String,
        required:true
    }
})

userSchema.post('save',async(doc) => {
 try{
    console.log(doc);

    const transporter = nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      auth:{
          user:process.env.MAIL_USER,
          pass:process.env.MAIL_PASS
      }
    })

    const info = transporter.sendMail({
        from:'DevHolic',
        to:doc.email,
        subject:'Registration Successful',
        text:'Thank you for registering at MERN Auth App',
        html:`<p>Welcome to MERN Auth App ${doc.name}.</p>`
    })

    console.log(info)
 }catch(err){
  console.log('Error Found');
  console.error(err);
 }
})

module.exports = mongoose.model('userSchema',userSchema);