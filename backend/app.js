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
{ const posts=[
  {id:"1",
  title:"product name 1",
  content: "product code 1",
  startDate: "date 1",
  selectedValue:"value 1",
  price: 1,
  desc: "product description 1",
  selectedOrigin:"origin 1",
  favoriteSeason: "is best achieved 1"

},
{id:"2",
title:"product name 2",
content: "product code 2",
startDate: "date 2",
selectedValue:"value 2",
price: 2,
desc: "product description 2",
selectedOrigin:"origin 2",
favoriteSeason: "is best achieved 2"

}
];
  res.status(200).json(
    {
      message: "post fetched success",
      posts:posts
    }
  );

});
module.exports= app;
