const { default: mongoose } = require('mongoose');
const blogModel = require('../models/Blog');
const userModel = require ("../models/user");




module.exports = {
    getAllBlogs : async(re,res,next)=>{
       
        let blogs;
        try{
           
            blogs =  await blogModel.find();
        } catch(err) {
            console.log(err);
        }
        if(!blogs){
            return res.status(404).json({message:"No Blogs found"})
        }
        return res.status(200).json({blogs})
        
    },

    addBlog : async(req,res,next)=>{ 
        
        const {title,description,image,user} = req.body
        let existingUser ;
        try {
            existingUser = await userModel.findById(user);

        } catch (err) {
            return console.log(err);
        }
        if(!existingUser) {
            return res.status(400).json({message:'Unable to Find User By this Id'})
        }
      
        const blog = new blogModel({
            title,
            description,
            image,
            user,
        });

        try{
         const session = await mongoose.startSession();
         session.startTransaction();
         await  blog.save({session});
         existingUser.blogs.push(blog);
         await existingUser.save({session})
         await session.commitTransaction();
        } catch (err) {
            return console.log(err);
            return res.status(500).json({message: "err"})
        }
        return res.status(200).json({blog})

    },



    updateBlog : async(req,res,next) => {
        const {title,description} = req.body;
        const blogId = req.params.id;
        let blog;
        
        try{
             blog = await blogModel.findByIdAndUpdate(blogId,{
                title,
                description
            })
    
        } catch (err) {
            return console.log('err');
        }

        if(!blog) {
            return res.status(500).json ({message: "Unable to update the Blog"})
        }

        return res.status(200).json({blog});

    },

    getById : async (req,res,next) =>{ 
        const Id =req.params.id ;
        let blog;
        try{
            blog = await blogModel.findById(Id);

        } catch (err) {
            return console.log(err);
        }
        if(!blog) {
          
            return res.status(404).json({message:'No Blog Found'})
        }

         return res.status(200).json({blog})


    },

    deleteBlog: async (req,res,next) => {
        const Id = req.params.id;

        let blog;

        try {

            blog = await blogModel.findByIdAndRemove(Id).populate('user');
            await blog.user.blogs.pull(blog);
            await blog.user.save();

        } catch (err) {
           console.log(err);
        }
        if(!blog) {
            return res.status(500).json({message:"Unable to Delete" })
        }

         return res.status(200).json({message:"Successfully Deleted"})

    },

    getByUserId : async (req,res,next) => {
        const userId = req.params.id;
        let userBlogs;
        try {
            userBlogs = await userModel.findById(userId).populate("blogs"); 

        } catch (err) {
            return console.log(err);
        }

        if(!userBlogs) {
            return res.status(404).json({message:"No Blog Found"})
        }
        return res.status(200).json({blogs:userBlogs})
         

    }

        


}