const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const expressUpload=require('express-fileupload');

const port=9761;

app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(expressUpload());
app.get('/upload',(request,response)=>{
    response.render('index');
})
app.post('/upload',(request,response)=>{
   const imageFile=request.files.uimage;
   imageFile.mv(`${__dirname}/public/images/${imageFile.name}`);
    response.render('display',{title:imageFile.name,image:`${imageFile.name}`});
});
app.listen(port,(error)=>{
    if(error) throw error;
    console.log(`Server started at port ${port}`);

});
