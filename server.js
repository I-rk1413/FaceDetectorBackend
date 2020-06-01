const express=require('express');
const app=express();
const cors=require('cors');


app.use(express.json());
app.use(cors());
const database={
    users:[
        {
            id:'123',
            name:'rahul',
            email:'rahul@gmail.com',
            password:'cookies',
            entries:0,
            joined: new Date()
        },
        {
            id:'1234',
            name:'jihn',
            email:'jihn@.gmail.com',
            password:'bomm',
            entries:0,
            joined: new Date()
        }
    ]
}

app.get('/',(req,res)=>{
    res.send(database.users);
})


app.post('/signin',(req,res)=>{
   
    if(req.body.email === database.users[0].email && req.body.password===database.users[0].password){
        res.json(database.users[0])
    }
    else{
        
        res.status(400).json("OOps Wrong user");
    }
   
})

app.post('/register',(req,res)=>{
    const { email, password,name }=req.body;
    database.users.push({
        
            id:'125',
            name:name,
            email:email,
            password:password,
            entries:0,
            joined: new Date()
        
    })
    res.json(database.users[database.users.length-1])

})


app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    let found=false;
    database.users.forEach(users=>{
        if(users.id===id){
            found=true;
            return res.json(users);
        }
      
    })
    if(!found){
        res.status(404).json('No such user');
    }
});



app.put('/image',(req,res)=>{
    const {id}=req.body;
    let found=false;
    database.users.forEach(users=>{
        if(users.id===id){
            found=true;
            users.entries++;
            return res.json(users.entries);
        }
      
    })
    if(!found){
        res.status(404).json('No such user');
    }

})

app.listen(3006, ()=>{
    console.log('App is running on Port 3006');
})

