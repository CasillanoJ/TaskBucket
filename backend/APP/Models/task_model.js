const { mongoose } = require("./con_db")


const TaskSchema = new mongoose.Schema({

  title:{
    type: String,
    required: [true, "Title is required"]
  },
  description:{

  },
  due_date:{
    type: Date,

  },
  startedAt:{
    type: Date,
  },
  completedAt:{
    type: Date,
  },
  status:{
    type: String,
    required: [true, "Status is required"]
  
  },
  priority_level:{
    type: String,
    required: [true, "Priority Level is required"]
  }

},{timestamps:true})

const Task = mongoose.model('Task',TaskSchema);

module.exports = Task
