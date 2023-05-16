const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    author:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    date:{
        type:String
    },
    likes:{
        type:Number
    }
})
module.exports={user:mongoose.model('InstaUser',userSchema)}