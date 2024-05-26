const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    image1:{
        data:Buffer,
        contentType:String,
    },
    alt1:{
        type:String,
        require:true,
    },
    image2:{
        data:Buffer,
        contentType:String,
    },
    alt2:{
        type:String,
        require:true,
    },
    image3:{
        data:Buffer,
        contentType:String,
    },
    alt3:{
        type:String,
        require:true,
    },
    image4:{
        data:Buffer,
        contentType:String,
    },
    alt4:{
        type:String,
        require:true,
    }
},{timestamps:true})

module.exports = mongoose.model("Banner", bannerSchema);