require("dotenv").config()
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const bcrypt = require('bcrypt');
const conn = require("./model/connection");
const cors = require("cors")
// const session = require("express-session");
const generateToken = require("./utils/jwtauth");
const Product = require("./model/product");
const User = require("./model/user");

conn()

// const sess = {
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {}
// }

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }))
// app.use(session(sess))




app.post("/upload", async(req, res)=>{
 try {
  let files = {}
  let image = req.files.image
  let audio = req.files.audio
  let imageName = req.files.image.name
  let audioName = req.files.audio.name

   if(audio.mimetype.startsWith("audio/")){
  let audioExt = `.${audioName.split(".").pop()}`
  let audioFileName = Number(new Date()).toString(36) + Math.floor((Math.random() + 1) * 10 * 6) + audioExt

  audioUploadPath = __dirname + '/../client/src/uploads/' + audioFileName

  audio.mv(audioUploadPath, (err)=>{
    if (!err)
     audio = audioFileName
     else
     audio = null
     console.log("File uploaded");

})

Object.assign(files, {audio: audioFileName})    
   }

   if(image.mimetype.startsWith("image/")){
let imageExt = `.${imageName.split(".").pop()}`
  let imageFileName = Number(new Date()).toString(36) + Math.floor((Math.random() + 1) * 10 * 6) + imageExt
 
  imageUploadPath = __dirname + '/../client/src/uploads/' + imageFileName

  image.mv(imageUploadPath, (err)=>{
    if (!err)
          image = imageFileName
          else
          image = null
         console.log("File uploaded");
  })

Object.assign(files, {image: imageFileName})    

   }
  
  
  res.status(200).json(files)
    
 } catch (error) {
  console.log(error.message)
  res.status(500).json(error.message)
 }
  
})

app.post("/addProduct", async(req, res)=>{

  try {
    let data = req.body
    let product = new Product(data)
    await product.save()
    res.status(200).send("Product successfully uploaded");

  } catch (error) {
    res.status(500).send(error.message)
  }


})

app.get("/products", async(req, res)=>{
  try {
    let result;
    if(req.query.cat){
      result = await Product.find({product_cat: req.query.cat})
      // result = await conn.execute(`SELECT * FROM products WHERE product_cat=?`, [req.query.cat]) 
    }else{
      result = await Product.find({})
    }
  
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error.message)
  }
    
})

app.get("/product/:id", async(req, res)=>{
  try {
  let id = req.params.id;
let product = await Product.findById(id);
  res.status(200).json(product)

  } catch (error) {
    console.log(error.message)
  }

})



app.post("/register", async(req, res)=>{
  try {
  const saltRounds = 10
    let {email_address} = req.body
    const existingUser = await User.findOne({email_address})
    if(!existingUser){
    let user = new User(req.body);
    bcrypt.hash(req.body.password, saltRounds, async(err, hash)=>{
    user.password = hash;
    await user.save()
  })

  res.status(200).json({
    firstname: user.first_name,
    lastname: user.last_name,
    token: generateToken(user)
  })
    }else{
      res.status(401).send("You are already signed up!")
    }
 
  } catch (error) {
    res.status(500).json(error.message)
  }
  
})

app.post("/login", async(req, res)=>{

  try {
  let { email_address, password } = req.body
  let user = await User.findOne({email_address})

  if(user && bcrypt.compare(password, user.password)){
    // req.session.userId = userData.id
    const {password, ...other} = user

    res.status(200).json({...other, token: generateToken(user)})

  }else{
    res.status(401).json("Wrong username or password")
  }   
  } catch (error) {
    res.status(500).json(error.message)
  }
})


app.post("/addToCart", async(req, res)=>{
  let cart = new CartItems(req.body)
  await cart.save()
})




const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
