const handleProfile=(req,res,postgres)=>{
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
    
}

module.exports={
    handleProfile:handleProfile
}