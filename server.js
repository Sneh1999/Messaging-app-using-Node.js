 var express = require('express')
 var bodyParser = require('body-parser')
 var app = express()

 app.use(express.static(__dirname)); //becasue we are using static files
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:false})) //data from the browswer comes in urlencoded format
 var messages = [
     {
         name:'Tim',
         message:'Hi'
     },
     {
        name:'Jane',
        message:'Hello'
    }
 ]

 //goto localhost/messages
 app.get('/messages',(req,res)=>{
     res.send(messages);
 })
app.post('/messages', (req, res) => {
    messages.push(req.body)
    res.sendStatus(200);
})
 app.listen(3000,() =>{
     console.log('server is listening on port 3000')
 }); 

