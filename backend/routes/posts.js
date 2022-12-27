const express=require('express');
const router=express.Router();
const Post= require('../models/post');
//app.post
router.post("", (req,res,next)=>
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

router.get('',(req,res,next)=>
{ const pageSize= +req.query.pagesize;
  const currentPage= +req.query.page;
  const postQuery=Post.find();
  if(pageSize && currentPage){
    postQuery.skip(pageSize*(currentPage-1))
    .limit(pageSize);
  }
  postQuery
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

router.delete("/:id", (req,res,next)=>
{
  Post.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message:"Post Deleted"});
  });

});

//app.put
router.put("/:id", (req,res,next)=>{
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
router.get("/:id", (req,res,next)=>{
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
module.exports=router;
