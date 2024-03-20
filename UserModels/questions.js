
// to store question in the mongodb 
const questionSchema = mongoose.Schema({
    userId:{
        type:String,
        
    },
    questionImage:{
        type:String
    },
    questionDescription:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
});


const questionModel = mongoose.model("Question Table",questionSchema);

module.exports = questionModel;