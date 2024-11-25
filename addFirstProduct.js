const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//1. 連結數據庫
mongoose.connect('mongodb://localhost/product');

//2. 設計文檔結構
const productSchema = new Schema({
	code: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
    categroy: {
		type: String,
		required: true
	},
    note: {
		type: String,
	}
});

  //3. 將文檔結構發佈為模型
  /* 
  mongoose.model方法就是用來將一個架構發佈為model
  第一個參數：傳入一個大寫單數名詞，表示數據庫名稱；mongoose會自動會講大寫名詞的字符串生成小寫複數的集合
            例如這裡會把User 編成users的集合名稱
  第二個參數：架構Schema
  */
  var Product = mongoose.model('Product', productSchema);

  //4. 有了模型模型構造函數，就可以可以使用這個構造函數對users集合進行crud
  var addProduct = new Product({
    code: 11,
    name: "iphone14 pro",
    price: 6801,
    categroy: "电子",
    note:"全新"
  })

   addProduct.save().then(()=>console.log(addProduct));


//   async function run() {
//     // 4. Connect to MongoDB
//     await connect('mongodb://127.0.0.1:27017/test');
  
//     const user = new User({
//       name: 'Bill',
//       email: 'bill@initech.com',
//       avatar: 'https://i.imgur.com/dM7Thhn.png'
//     });
//     await user.save();
  
//     console.log(user.email); // 'bill@initech.com'
//   }
  