const mongoose = require('mongoose') ;

mongoose.connect('mongodb://localhost:27017/product');

const { Schema } = mongoose;

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
    quantity: {
		type: Number,
		required: true
	},
    note: {
		type: String
	}
});

//发布数据模型
module.exports = mongoose.model('Product', productSchema);
//导出数据模型（里面是构造函数）；



// const schema = new mongoose.Schema({ name: String, size: String });
// const Tank = mongoose.model('Tank', schema);