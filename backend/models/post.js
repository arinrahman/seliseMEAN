const mongoose =require('mongoose');

const postSchema =mongoose.Schema({
  title:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  content:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  startDate:{
    type: Date,
    required: true

    },
  selectedValue:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  desc:{
    type: String,
    minlength: 3,
    maxlength: 250,
    required: false
  },
  selectedOrigin:{
    type: String,
    required: true
  },
  favoriteSeason:{
    type: String,
    required: false
  },
  imageURL:{
    type: String,
    required: false
  },
  quantity:{
    type: Number,
    required: false
  }
});

module.exports= mongoose.model('Post', postSchema);
