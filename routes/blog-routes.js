
const express = require ('express');
const controller = require('../controllers/blog-controller')
const blogRouter =express.Router();

blogRouter.get ('/',controller.getAllBlogs);
blogRouter.post('/add',controller.addBlog );
blogRouter.put('/update/:id',controller.updateBlog );
blogRouter.get('/:id',controller.getById);
blogRouter.delete('/:id',controller. deleteBlog);
blogRouter.get('/user/:id',controller.getByUserId)

module.exports =blogRouter;