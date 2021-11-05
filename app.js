const express = require("express");
const bodyParse = require("body-parser");
const request = require("request");
const https=require("https");
const app = express();
app.use(express.static("public"));//have to create a folder. public/css. and put your styles in css and images folder in there
app.use(bodyParse.urlencoded({extended:true}));


app.get("/", function(req,res){

res.sendFile(__dirname+"/signup.html");
});
app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME: lastName
      }
    }
  ]
};
const jsonData =JSON.stringify(data);


const options = {
  method: "POST",
  
}

const request= https.request(url,options,function(response){

if (response.statusCode===200){
  res.sendFile(__dirname+"/success.html");
}else{
  res.sendFile(__dirname+"/failure.html");
}

  response.on("data", function(data){
    console.log(JSON.parse(data));

  });

});


request.write(jsonData);
request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT|| 3000, function(){
  console.log("server on 3000");
});

//7ba94ed2452166987f6aac65c5ceaffb-us20

//list id
//cc45ceb386
