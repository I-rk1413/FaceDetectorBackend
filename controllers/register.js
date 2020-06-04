const handleRegister=(req,res,bcrypt,postgres,saltRounds)=>{
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
    

}

module.exports={
    handleRegister:handleRegister
}