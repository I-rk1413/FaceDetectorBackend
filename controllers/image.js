
const Clarifai =require ('clarifai');

const app = new Clarifai.App({
    apiKey: '65630fcbe6a1433881006f22888aa3a9'
   });

const apiHandler=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(response=>res.json(response))
    .catch(err=>console.log(err))}

const handleImage=(req,res,postgres)=>{
    const {id}=req.body;
    postgres('users')
  .where('id', '=', id)
  .increment('entries',1)
  .returning('entries')
  .then(entry=>{
      res.json(entry[0])
  })
  .catch(err=>res.status(400).json('Unable to connect'))
    

}

module.exports={
    handleImage:handleImage,
    apiHandler:apiHandler}
