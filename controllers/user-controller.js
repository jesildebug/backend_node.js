const express = require('express');
const userModel = require ("../models/user");
const bcrypt = require ('bcryptjs');
 
module.exports = {

   
    getAllUser :async(req,res,next) => {
     
      let users;
      try{
         users = await userModel.find()
      } catch(err){
         console.log(err);
      }
      if(!users){
         return res.status(404).json({message: "No  Users Found" })
      }
      return  res.status(200).json({ users });
   },
   
      signup : async(req,res,next)=>{
      const {name,email,password} = req.body;
      
      let existingUser; 
      
      try{
         existingUser = await userModel.findOne({email})
         
      }catch(err){
         console.log(err);
      }
      if(existingUser){
         return res.status(400).json({message: "User Already Exists!"})
      }
      const  hashedPassword = bcrypt.hashSync(password)
      
      const user = new userModel({
         name,
         email,
         password: hashedPassword,
         blogs:[]
      });
      
      try{
         await user.save()
         
      }catch(err){
         console.log(err);
      }
      return res.status(201).json({user})
   },

   login: async(req,res,next)=>{
   const { email,password} = req.body;
   let existingUser ;
   try {
      existingUser =  await userModel.findOne({ email });

   }catch (err) {
     return  console.log(err);

   } if (existingUser){
      return res
      .status(404)
      .json({ message: "Couldnt Find User By This Email"})
   }
   const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password());
   if(!isPasswordCorrect){
      return res.status(400).json({message:"Incorrect Password"})
   }
   return res.status(200).json({message:"login successful"})

   }
   
   
   
   
}
