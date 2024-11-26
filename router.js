const express = require('express');
const Product = require('./models/product');

const router = express.Router()


router.get('/', (req, res) => {
    res.render('index.html', {
      name : "不重要 不重要"
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
//渲染编辑
router.get('/list/edit', async(req, res)=>{
    data = await Product.findById(req.query.id.replace(/"/g, ''));
    res.render('edit.html',{
        product: data
    })
})

//编辑
router.post('/list/edit', async(req, res)=>{
    try{
        let productId = req.body.id.replace(/"/g, '')
        await Product.findByIdAndUpdate(productId, req.body)
    }catch(e){
        console.error('错误¥%……&*', e);
    }finally{
        res.redirect('/list')
    }
    
})

router.get('/list/delete', async(req, res)=>{
    await Product.findByIdAndDelete(req.query.id.replace(/"/g, ''))
    res.redirect('/list')
})


module.exports = router;