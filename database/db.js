
const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const User = mongoose.model('User',userSchema);
module.exports={User};

// mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
// var db=mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log("DB Connected")
// });
// app.post('/sign_up',(req,res)=>{
//     var name=req.body.name
//     var email=req.body.email
//     var phoneNumber=req.body.phoneNumber
//     var password=req.body.password

//     console.log(name);
//     console.log(email);
//     console.log(phoneNumber);
//     console.log(password);

//     var data={
//         "name":name,
//         "email":email,
//         "phone-number":phoneNumber,
//         "password":password
//     }
//     db.collection('user').insertOne(data,(err,collection)=>{
//         if(!err)
//             console.log("Record inserted successfully")
//         else
//             throw err;
//     })
//     return res.render("signup_success")
// })
