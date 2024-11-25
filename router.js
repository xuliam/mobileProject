const express = require('express');
const Product = require('./models/product');

const router = express.Router()


router.get('/', (req, res) => {
    res.render('index.html', {
      name : "zhangs"
    });
})
  
router.get('/login', (req, res) => {
      res.render('login.html', {
       
      });
})

router.get('/register', (req, res) => {
    res.render('register.html', {
     
    });
})

router.post('/users', async(req, res)=>{

})

router.get('/list', async(req, res)=>{
    data = await Product.find({})
    res.render('list.html', {
        products:data
    });

})


module.exports = router;