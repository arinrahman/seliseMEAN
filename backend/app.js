const express= require('express');
const bodyParser= require("body-parser");
const mongoose=require("mongoose");
const Post= require('./models/post');
mongoose.set('strictQuery', false)
// NTwBp3y1DjoJrgME
const app= express();
mongoose.connect("mongodb+srv://arinrahman:hellokitty29@cluster0.vhdsqie.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>
{
  console.log("Connected to data base!")
})
.catch(()=>{
  console.log("Connection failed.");

});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");

  next();
});

app.post("/api/posts", (req,res,next)=>
{
  const post= new Post({
    title: req.body.title,
    content: req.body.content,
    startDate: req.body.startDate,
    selectedValue: req.body.selectedValue,
    price: req.body.price,
    desc: req.body.desc,
    selectedOrigin: req.body.selectedOrigin,
    favoriteSeason: req.body.favoriteSeason


  });
  post.save();
  res.status(201).json({
    message:"post added succesfully"


  });
});

app.get('/api/posts',(req,res,next)=>
{ 
  res.status(200).json(
    {
      message: "post fetched success",
      posts:posts
    }
  );

});
module.exports= app;
