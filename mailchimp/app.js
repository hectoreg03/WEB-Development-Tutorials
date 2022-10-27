const express= require('express');
const app= express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https=require('https');

const apiKey="de2e12a51bfb3eee20899ef1949e2b07-us14";
const list_id="8c68d36d69";
mailchimp.setConfig({
  apiKey: "de2e12a51bfb3eee20899ef1949e2b07-us14",
  server: "us14"
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}


app.use(express.static("public"));

app.use(express.urlencoded({ extended:true }));
app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post('/',(req,res)=>{
    var fname= req.body.fName;
    var lname= req.body.lName;
    var email= req.body.email;
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log("escritqewro");
    
    var data={members: [{
      email_address:email, 
      status:"subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }]};
    var url= "https://us14.api.mailchimp.com/3.0/lists/"+list_id;
    options={method:"POST", auth:"Hector Eguiarte:"+apiKey};
    const mailRequest= https.request(url,options,(response)=>{
      console.log(response);
      //Copie la parte del response, no entendia las instrcciones
      if(response.statusCode === 200) {
        response.on("data", (data) => {
            var jsonResp = JSON.parse(data);
            if(jsonResp["error_count"] === 0) {
                res.render(__dirname + "/success.html");
            } else {
                res.render(__dirname + "/failure.html" );
                console.log(jsonResp.errors[0]["error_code"]);
                console.log(jsonResp.errors[0]["error"]);
            }
        });
        response.on("error", (e) => {
            res.render(__dirname + "/failure.html");
        });
    } else {
        res.render(__dirname + "/failure.html");
    }
    });
    mailRequest.write(JSON.stringify(data),()=>{});
    mailRequest.end();
    res.sendFile(__dirname+"/success.html");
});

app.post('/c',(req,res)=>{
  res.redirect("/");
});

app.listen(3000,()=>{
    console.log("listening to port 3000");
})


run();
