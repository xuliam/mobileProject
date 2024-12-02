const express = require('express');
const axios = require('axios');
const Product = require('./models/product');
const User = require('./models/user');

const router = express.Router()

const url = 'https://www.1823.gov.hk/common/ical/tc.json';


router.get('/', (req, res) => {
    res.render('index.html', {
       user: req.session.user
    });
})

router.get('/logout', (req, res) =>{
    req.session.user = null;
    res.redirect('/');
})

// ___________________________________________
 //login 渲染 
router.get('/login', (req, res) => {
      res.render('login.html');
})

router.post('/login', async(req, res) =>{
    let body = req.body
    try{
        const existingUser = await User.findOne({
            email: body.email,
            password: body.password
        });
        if (!existingUser){
            return res.status(200).json({
                err_code: 1,
                message:'Email or Password is invali&*()_'
            })
        }
        req.session.user = existingUser

        return res.status(201).json({
            err_code: 0,
            message:'ok ^_^'
        })
        
    }catch(error){
        return res.status(500).json({
            err_code: 500,
            message:error.message
        })
    }
})


//渲染register页面
router.get('/register', (req, res) => {
    res.render('register.html', {     
    });
})


router.post('/register', async (req, res) => {
    const { email, nickname } = req.body; // 使用解构赋值提取 email 和 nickname

    try {
        const existingUser = await User.findOne({
            $or: [
                { email },
                { nickname }
            ]
        });

        if (existingUser) {
            return res.status(200).json({
                err_code: 1, // 返回成功为 false，因为邮箱或暱稱已存在
                message: "邮箱或暱稱已存在"
            });
        }

        const newUser = new User(req.body); // 修正这里要保存用户而不是产品
        await newUser.save(); // 使用 await 保存用户

        req.session.user = newUser;

        return res.status(201).json({
            err_code: 0,
            message: '注册成功'
        });
    } catch (error) {
        console.error(error); // 日志记录错误
        return res.status(500).json({
            err_code: 500,
            message: '服务器错误'
        });
    }
});

//_____________________________________________________

router.get('/list', async(req, res) => {
    
    data = await Product.find({})
    res.render('list.html', {
        user: req.session.user,
        products:data
    });
})

//渲染加载页面
router.get('/list/new', function(req, res){
    res.render('new.html');
})


router.post('/list/new', async(req, res)=>{
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
// holiday api______________________________________________________
async function getHoliday(url) {
    try {
      const response = await axios.get(url);  
      const data = response.data;
      let events = [];

        data.vcalendar.forEach(calendarItem => {
            calendarItem.vevent.forEach(veventItem => {
                events.push({
                    summary: veventItem.summary,
                    dtstart: veventItem.dtstart[0]
                });
            })
        })
        console.log(events);
        return events;
    } catch (error) {
        console.error(error);
        return [];
      }
    }


router.get('/info', async(req, res)=>{
    
    
        // function getToday(){
        //     var datetime = new Date();
        //     // console.log(datetime.toISOString().slice(0,10));
        //     console.log(datetime);
        //     return datetime;
        // }
        const events = await getHoliday(url)
    res.render('info.html', {events: events} );
});


module.exports = router;