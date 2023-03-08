
const express = require("express")
const mongoose = require('mongoose');
const blogRouter = require("./routes/blog-routes");

const router = require("./routes/user-routes")

const app = express();

app.use(express.json())

app.use('/api/user',router);
app.use('/api/blog',blogRouter)



mongoose.connect('mongodb+srv://jesil:AklH5FGVyE0ZfXoi@cluster0.qqxqzk4.mongodb.net/blog?retryWrites=true&w=majority')
.then(()=>app.listen(5001))
.then(()=>console.log('Connected toDatabase'))
.catch((err)=>console.log(err));






