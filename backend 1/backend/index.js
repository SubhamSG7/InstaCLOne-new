const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const path=require('path')
const fileUpload=require('express-fileupload')
const port=3030 ||process.env.PORT;
const{user}=require('./model/user')
const url="mongodb+srv://dsubham257sd:9832777363@cluster0.zltjwvy.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery',true);
mongoose.connect(url)
const app=express();
app.use(cors());
app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(fileUpload());


app.listen(port,()=>{
    console.log('we are listening at ',port)
})


app.post('/form',urlencodedParser,(req,res)=>{
    const{location,author,description}=req.body;
    const {image}=req.files;
    let date=new Date().toDateString();
    let likes=Math.floor(Math.random()*100);
    image.mv('./images/'+image.name, async (err)=>{
        if(err){
            res.json({message:err})
        }
        else{
            const users=new user({
                ...{location,author,description,date,likes},
                image:image.name
            })
            try{
                const response=await users.save();
                res.json({message:"Everything is Fine",response})
            }
            catch(e){
                res.json({message:'Something went wrong',response:e})
            }
        }
    })
})
app.get("/", (req,res)=>{
    res.send(`<h1>you are in</h1>`)
})
app.get('/data', async(req,res)=>{
    res.json({result:await user.find()})
})
app.get('/:fileName',async(req,res)=>{
  console.log(`./images/${req.params.fileName}`)
  res.sendFile(path.join(__dirname,`./images/${req.params.fileName}`))
})
