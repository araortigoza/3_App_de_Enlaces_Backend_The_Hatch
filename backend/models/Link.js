const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function (tags) {
        return tags.every(tag => tag.length <= 20);
      },
      message: 'Cada tag debe tener maximo 20 caracteres'
    }
  },
  votes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Link', linkSchema);