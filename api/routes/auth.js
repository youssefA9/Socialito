const router=require("express").Router();
const User= require("../models/User");
const bcrypt=require("bcrypt");

//Register
router.post("/register",async (req,res)=>{
    try{
     //   const salt= await bcrypt.genSalt(10);
     //   const hashedPassword=await bcrypt.hash(req.body.password,salt);
        
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        });
        
        const user=await newUser.save();
        res.status(200).json(user);


    }catch(err){
        res.status(500).json(err);
    }
});
//Login
router.post("/login",async (req,res)=>{
    try{
        //invalid email
        const user= await User.findOne({email:req.body.email});
        !user&&res.status(404).json("User not found!");

        
        //invalid password
        const realPassword =req.body.password===user.password?true:false;
        !realPassword&&res.status(400).json("Wrong Password!")
        
        //correct credintals

        res.status(200).json(user); 


    }catch(err){
        res.status(500).json(err);
    }

});

module.exports=router