const User=require("../models/User");
const router=require("express").Router();
const bcrypt=require("bcrypt");


//UPDATE
router.put("/:id",async (req,res)=>{
    if(req.body.userId== req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);
            }catch(err){res.status(500).json(err)}
        }
        try{
            const user= await User.findByIdAndUpdate(req.params.id,{
                $set:req.body});
                res.status(200).json("Account has been updated!");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only update your account!")
    }


})

//DELETE
router.delete("/:id",async (req,res)=>{
    if(req.body.userId== req.params.id || req.body.isAdmin){
       
        try{
           await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account has been deleted!");
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only delete your account!")
    }
})
//GET 
router.get("/",async(req,res)=>{
    const userId=req.query.userId;
    const username=req.query.username;
    try{
        const user=userId? await User.findById(userId):
        await User.findOne({username:username});
        const {password,updatedAt,...other}=user._doc
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
})
//FOLLOW
router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const followedUser= await User.findById(req.params.id);
            const currentUser= await User.findById(req.body.userId);
            if(!followedUser.followers.includes(req.body.userId)){
                await followedUser.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{following:req.params.id}});
                res.status(200).json("User has been followed!");
            }else{
                res.status(403).json("you already follow this acccount!");

            }
        }catch(err){
            res.status(500).json(err);
        }

    }else{
        res.status(403).json("you can't follow yourself!");
    }
}) 
//UNFOLLOW
router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const followedUser= await User.findById(req.params.id);
            const currentUser= await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await followedUser.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{following:req.params.id}});
                res.status(200).json("User has been unfollowed!");
            }else{
                res.status(403).json("you don't follow this acccount!");

            }
        }catch(err){
            res.status(500).json(err);
        }

    }else{
        res.status(403).json("you can't unfollow yourself!");
    }
}) 

//get friends
router.get("/friends/:userId",async(req,res)=>{
    try{
        const user=await User.findById(req.params.userId);
        const friends= await Promise.all(
            user.following.map(friendId=>{
                return User.findById(friendId);
            })
        )
        let friendList=[];
        friends.map(friend=>{
            const{_id,username,profilePic}=friend;
            friendList.push({_id,username,profilePic});
        });
        res.status(200).json(friendList);
        
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports=router