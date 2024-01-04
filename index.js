const express =require("express")
const app =express();
const User = require("./database");



app.set("view engine","ejs");
app.use(express.urlencoded({extended:false})) //it is a middle ware function in expressjs that is used to make use of encoding url request when it is set to false it uses the querystring library to parse the URL-encoded Data //we can use bodyparser library instead of that

app.get("/",async(req,res)=>{
    const users = await User.find({});//to retrive all the documents from database as array of objects
    // console.log(users);
    res.render("index",{
        title:"this is homepage", //sending this values as parameter to index.ejs
        users:users
    })
})

app.post("/register",async(req,res)=>{
    const {name,email,password}=req.body; //this contains this object of {name: 'Rohan',email: 'rohan342@gmail.com',password: '12345'} //values are user given
    // console.log(req.body);
    const newuser = new User({name,email,password});//this creates a mongodb document 
    // console.log(newuser)
    const usersave = await newuser.save(); //saving the document
    res.redirect("/");
})

app.get("/register",(req,res)=>{ //when we type at addressbar this register is refered
    res.render("register");
})

app.get("/edit/:id",async(req,res)=>{
    const {id} =req.params; //takes the parameter in our case id
    // console.log(req.params);
    const user = await User.findById({_id:id}); //find by id
    if(user==null){
        res.redirect("/");
    }else{
        res.render("edit",{
            user:user
        })
    }
})

app.post("/update/:id",async(req,res)=>{
    const {id} =req.params;
    const {name,email,password}=req.body;
    const updateuser = await User.findByIdAndUpdate({_id:id},
        {name,email,password},//new name,email and password with which it will be updated
        {new:true})//new:true will tell the mongodb that it has been updated and new document 
    console.log(updateuser);
    res.redirect("/");
})

app.get("/delete/:id",async(req,res)=>{
    const {id} =req.params;
const deleteuser =await User.findByIdAndDelete({_id:id});
res.redirect("/");
})







app.listen(5000,()=>{
    console.log("server listeninig on portno:5000");
})