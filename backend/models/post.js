const mongoose =require('mongoose');

const postSchema =mongoose.Schema({
  title:{type: String, required: true},
  content:{type: String, required: true},
  startDate:{type: Date, required: true},
  selectedValue:{type: String, required: true},
  price:{type: Number, required: true},
  desc:{type: String},
  selectedOrigin:{type: String, required: true},
  favoriteSeason:{type: String, required: true},
  imageURL:{type: String, required: true},
  quantity:{type: Number, required: true}
});

module.exports= mongoose.model('Post', postSchema);
