if(process.env.NODE_ENV !== "production"){
  require('dotenv').config({path:'github/.env'})
}

/* connect express */
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const dotenv = require ("dotenv")

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))

require('dotenv').config();
const mongoose = require('mongoose')
mongoose
    .connect(process.env.DATABASE_URL,{useUnifiedTopology:true,useNewUrlParser:true})
    .then((res)=>{
        console.log('Connected to database');
        //console.log(res.data);
    })
    .catch((err)=>{
        console.log("Encountered error...");
        console.log("error : "+err);
    });

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
