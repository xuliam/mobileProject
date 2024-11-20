const mongoose = require('mongoose');

//連接數據庫
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: number,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: string,
    required: true
  }
 
});

module.exports = mongoose.model('User', userSchema)