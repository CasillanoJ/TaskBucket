const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: null
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Task",
    default: null,
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt:{
    type: Date,
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
