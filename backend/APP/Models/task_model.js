const mongoose = require("mongoose");

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);


const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    priorityLevel: {
      type: String,
      enum: ["Neutral", "High", "Urgent"],
      required: [true, "Please add a priority level"],
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
      default: null,
    },
    dueDate: {
      type: Date,
      default: null,
      // validate: {
      //   validator: function (value) {
      //     if (value === null) {
      //       return true;
      //     }
      //     const inputValue = new Date(value);
      //     const currentDate = new Date();
      //     currentDate.setHours(0, 0, 0, 0);

      //     return inputValue >= currentDate;
      //   },
      //   message: "Date must be the current date or in the future",
      // },
    },
    startedAt: {
      type: Date,
      default: "",
    },
    completedAt: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["Unassigned", "To do", "In progress", "Completed"],
      required: [true, "Status is required"],
    },
    isClaimed: {
      type: Boolean,
      default: false,
      required: [true, "Must be either claim or not, wont accept null"],
    },
  },
  {
    timestamps: true,
  }
);



const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
