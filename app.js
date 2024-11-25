
const express = require('express');
const path = require('path');
const router = require('./router');

// getting-started.js
// const mongoose = require('mongoose');
// const db = 'mongodb://127.0.0.1:27017/'

// import Product from './models/product.js';

const app = express();
const port = 3000;


// async function main() {
//   await mongoose.connect(db);
//     console.log('mongodb connected...')

//     const newProduct = new Product({
//         id: 1,
//         name: 'iphone 14',
//         price:5010,
//         category: "Electronics"
//     });

//     await newProduct.save();
//     console.log('product saved: ', newProduct);
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// main().catch(err => console.log(err));


app.use('/public', express.static(path.join(__dirname, './public/')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));

app.engine('html', require('express-art-template'));



app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})