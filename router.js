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

//渲染加载页面
router.get('/list/new', function(req, res){
    res.render('new.html');
})


router.post('/list/new', async(req, res)=>{
    console.log(req.body);
    try{
        await new Product(req.body).save();
    }catch(e){
        console.error('保存產品失敗:', e);
    }finally{
        res.redirect('/list');
    }
})


module.exports = router;