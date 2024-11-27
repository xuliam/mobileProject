const mongoose = require('mongoose');

//連接數據庫
// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/user');
// }

mongoose.connect('mongodb://localhost:27017/user');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true
  }
 
});

module.exports = mongoose.model('User', userSchema)