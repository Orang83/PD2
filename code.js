var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('')

app.get("/",(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin" :'*'
    })
} ).listen(8080);

console.log("Listening on port 8080");
