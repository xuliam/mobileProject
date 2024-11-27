const mongoose = require('mongoose');

//連接數據庫
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/user');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const Schema = mongoose.Schema;

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