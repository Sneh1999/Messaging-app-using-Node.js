 var express = require('express')
 var bodyParser = require('body-parser')
 var app = express()
 var http = require('http').Server(app)
 var io = require('socket.io')(http)
 var mongoose = require('mongoose')
 app.use(express.static(__dirname)); //becasue we are using static files
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:false})) //data from the browswer comes in urlencoded format
 
var dbUrl = 'mongodb://user:userone1@ds251002.mlab.com:51002/learning-node'
 
var Message = mongoose.model('Message',{
    name: String,
    message: String
})
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
     Message.find({},(err,messages) =>{
         res.send(messages);
     })
   
 })
app.post('/messages', (req, res) => {
    var message = new Message(req.body)

    message.save((err) =>{
        if (err)
            sendStatus(500)
      
        io.emit('message', req.body)
        res.sendStatus(200);
    })
   
})
io.on('connection',(socket) =>{
    console.log('user connected')
})

mongoose.connect(dbUrl,(err) =>{
    console.log('mongo db conn',err)
})
 http.listen(3000,() =>{
     console.log('server is listening on port 3000')
 }); 

