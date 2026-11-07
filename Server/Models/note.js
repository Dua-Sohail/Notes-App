const mongoose = require('mongoose');
const newSchema = new mongoose.Schema(
    {
        title:{
            type : String ,
            required : true ,
            trim : true
        },
        content:{
            type : String,
            default: "",
        },
    },
        { timestamps: true }
);

module.exports=mongoose.model('Note:', newSchema);