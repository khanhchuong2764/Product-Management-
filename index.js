const express = require('express')
const path = require('path');
const methodOverride = require('method-override')
const flash = require('express-flash')
const multer  = require('multer')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
require('dotenv').config()
const mongoose = require('mongoose');
const app = express()

const database = require("./config/database");

app.use(methodOverride('_method'))

// Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End Flash

// TimyMce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//End TimyMCE

app.use(bodyParser.urlencoded({ extended: false }))

const Router = require("./routes/client/index.router");
const RouterAdmin =require("./routes/admin/index.router");

const SystemConfig = require("./config/system");

const port = process.env.PORT

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

app.locals.prefixAdmin = SystemConfig.prefixAdmin;

Router(app);
RouterAdmin(app);

database.connect();

app.use(express.static(`${__dirname}/public`));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})