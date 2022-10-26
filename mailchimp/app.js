const express= require('express');
const app= express();
const mailchimp = require("@mailchimp/mailchimp_marketing");

const apiKey="97a6cef27db1492e133cb9b5da4bb21a-us14";
const list_id="8c68d36d69";
mailchimp.setConfig({
  apiKey: "97a6cef27db1492e133cb9b5da4bb21a-us14",
  server: "us14",
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
  var url= "https://us14.api.mailchimp.com/3.0/lists/"+list_id;
}


app.use(express.static("public"));

app.use(express.urlencoded({ extended:true }));
app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post('/',(req,res)=>{
    var fname= req.body.fName;
    var lname= req.body.lName;
    var email= req.body.email;
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log("escritqewro");
    res.sendFile(__dirname+"/success.html");
})

app.listen(3000,()=>{
    console.log("listening to port 3000");
})


run();
