const express= require('express');
const { getAllJSDocTagsOfKind } = require('typescript');
const bodyParser= require("body-parser");
const Post= require('./models/post');

const app= express();
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
  console.log(post);
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
