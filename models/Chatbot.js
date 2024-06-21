const mongoose = require('mongoose');

const chatbotSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
});

const Chatbot = mongoose.model('Chatbot', chatbotSchema);

module.exports = Chatbot;