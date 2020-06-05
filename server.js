const express=require('express');
const app=express();
const cors=require('cors');
const knex =require('knex');
const bcrypt=require('bcrypt');
const saltRounds = 10;
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image')



const postgres=knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl:true,
   
}});




app.use(express.json());
app.use(cors());




app.get('/',(req,res)=>{  res.send('It is working') })


app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,bcrypt,postgres)})

app.post('/register', (req,res)=>{register.handleRegister(req,res,bcrypt,postgres,saltRounds)})


app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,postgres)});



app.put('/image',(req,res)=>{image.handleImage(req,res,postgres)});
app.post('/apiHandler',(req,res)=>{image.apiHandler(req,res)})

app.listen(process.env.PORT || 3006, ()=>{
    console.log(`App is running on ${process.env.PORT}`);
})

