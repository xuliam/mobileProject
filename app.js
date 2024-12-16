const express = require('express');
const path = require('path');
const router = require('./router');
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express();
const port = 3000;


app.use('/public', express.static(path.join(__dirname, './public/')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.engine('html', require('express-art-template'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//配置session插件
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})