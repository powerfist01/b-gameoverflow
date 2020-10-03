const express = require("express")

const app = express()

app.get("/",function(req,res,next){
    res.json({
        status_code : "200",
        message: "Server is running :)"
    })
})

app.listen(3000,function(err){
    if(err){
        console.log("Error in running the server :(");
    }
    console.log("Running the server on port 3000");
})