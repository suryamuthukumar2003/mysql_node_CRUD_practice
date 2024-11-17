const express=require("express");
const exphbs=require('express-handlebars');
const bodyParser=require("body-parser");

require('dotenv').config();


const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// static files
app.use(express.static("public"));


// template engine
const handlebars=exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");

// MYSQL

// const conn=mysql.createPool({
//     connectionLimit:10,
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASS,
//     database:process.env.DB_NAME
// })

// // check db connection

// conn.getConnection((err,connection)=>{
//     if(err){
//         throw err
//     }
//     console.log("connection success");
// })

// // router
// app.get('/',(req,res)=>{
//     res.render("home");
// });

const routes=require('./server/routes/student');
app.use('/',routes);

app.listen(8000,()=>{
    console.log("Listening Port : 8000");
})