const express=require('express');
const app=express();
const cors=require('cors');
const knex =require('knex');
const bcrypt=require('bcrypt');
const saltRounds = 10;



const postgres=knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Rahul@1402',
    database : 'FaceDetector'
}});




app.use(express.json());
app.use(cors());




app.get('/',(req,res)=>{
    res.send(database.users);
})


app.post('/signin',(req,res)=>{
   postgres.select('email','hash').from('login')
   .where('email','=',req.body.email)
   .then(data=>{
    const isValid=bcrypt.compareSync(req.body.password, data[0].hash);
    if(isValid){
        return postgres.select('*').from('users')
        .where('email','=',req.body.email)
        .then(user=>{
            res.json(user[0])
        })
        .catch(err=> res.status(400).json('Unable to connect'))
       
    }
    else{
        res.status(400).json('Enter valid email and password')
    }
   })
   .catch(err=>res.status(400).json("wrong user"))
    
   
})

app.post('/register',(req,res)=>{
    const { email, password,name }=req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    postgres.transaction(trx=>{
        trx.insert({
            hash: hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginemail=>{
            return  trx('users')
            .returning('*')
            .insert({
                email:loginemail[0],
                name:name,
                joined:new Date()
         
            }).then(response=>{
             res.json(response[0]);
            })
            
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>res.status(400).json("Unable to register"))
    

})


app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    postgres.select('*').from('users').where({
        id:id
    }).then(user=>{
        if(user.length){
            res.json(user[0]);
        }
        else{
            res.status(400).json('Not found')
        }
       
    })
    .catch(err=>response.status(400).json('Error getting user'))
    
});



app.put('/image',(req,res)=>{
    const {id}=req.body;
    postgres('users')
  .where('id', '=', id)
  .increment('entries',1)
  .returning('entries')
  .then(entry=>{
      res.json(entry[0])
  })
  .catch(err=>res.status(400).json('Unable to connect'))
    

})

app.listen(3006, ()=>{
    console.log('App is running on Port 3006');
})

