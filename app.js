//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
     const firstName = req.body.fName;
     const lastName = req.body.lName;
     const email = req.body.email;

     const data ={
       members :[
         {
           email_address: email,
           status: "subscribed",
           merge_fields:{
             FNAME: firstName,
             LNAME: lastName
           }
         }
       ]
     };

     const jsonData = JSON.stringify(data);

     const url = "https://us14.api.mailchimp.com/3.0/lists/a8bf02361b";

     const options = {
       method: "POST",
       auth:"Tikam1:f764e3381693357e0c668a3db958d77c-us14"
     }

     const request = https.request(url,options,function(response){

           if(response.statusCode === 200){
             //res.send("Successfully subscribed!");
             res.sendFile(__dirname + "/success.html");
           }else{
             //res.send("There was an error with signing up, please try agian!");
             res.sendFile(__dirname + "/failure.html");
           }

           response.on("data",function(data){
             console.log(JSON.parse(data));
           })
     })

     request.write(jsonData);
     request.end();
});

app.post("/failure",function(req,res){
      res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000.");
});

// API KEY
// f764e3381693357e0c668a3db958d77c-us14

// List Id
// a8bf02361b
