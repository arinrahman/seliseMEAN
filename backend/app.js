const express= require('express');
const bodyParser= require("body-parser");
const mongoose=require("mongoose");
const Post= require('./models/post');
mongoose.set('strictQuery', false)
const app= express();
mongoose.connect("mongodb+srv://arinrahman:hellokitty29@cluster0.vhdsqie.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>
{
  console.log("Connected to data base!")
})
.catch(()=>{
  console.log("Connection failed.");

});

// app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});


//app.post
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
    favoriteSeason: req.body.favoriteSeason,
    imageURL: req.body.imageURL,
    quantity: req.body.quantity

  });
  post.save(),then(result=>{res.status(201).json({
    message:"post added succesfully",
    postId:createdPost._id
  });
});
});

//app.get

app.get('/api/posts',(req,res,next)=>
{ Post.find()
  .then(documents=>{

    res.status(200).json(
      {
        message: "post fetched success",
        posts:documents
      }
    );

  });
});

//app.delete

app.delete("/api/posts/:id", (req,res,next)=>
{
  Post.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message:"Post Deleted"});
  });

});

//app.put
app.put("/api/posts/:id", (req,res,next)=>{
  const post=new Post({
    _id: req.body.id,
    title:req.body.title,
    content: req.body.content,
    selectedValue: req.body.selectedValue,
    startDate: req.body.startDate,
    selectedOrigin: req.body.selectedOrigin,
    price: req.body.price,
    desc: req.body.desc,
    favoriteSeason: req.body.favoriteSeason,
    imageURL: req.body.imageURL,
    quantity: req.body.quantity
  });
  Post.updateOne({_id: req.params.id},post).then(result=>
    {
      console.log(result);
      res.status(200).json({message:"Update succesfull!"});
    })
});

//app.get
app.get("/api/posts/:id", (req,res,next)=>{
  Post.findById(req.params.id).then(
    post=>{
      if(post){
        res.status(200).json(post);
      }
      else{
        res.status(404).json({
          message:'Post not found!'
        });
      }
    }
  )
});

//end
module.exports= app;
