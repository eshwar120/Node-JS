const {Schema , model, default: mongoose} = require('mongoose');

const postModel = new Schema ({
    title : {type : String , required : true},
    body : {type : String , required : true},
    image : {type : String , required : true},
    author : {type : mongoose.Schema.Types.ObjectId , ref: 'User' , required : true}
})

module.exports = model('post' , postModel);