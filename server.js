//install packages, express, nodemon, mongodb, ejs
//set up server, set up port number
//set up middleware, ejs
// connect to database, get the connection string
// CRUD

const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT //? why env doesnt work for port

app.listen(PORT,function(){
    console.log(`listening to ${PORT}`)
})

const MongoClient = require('mongodb').MongoClient

let db,
    dbConnectionStr = process.env.mongodbConnectionStr,
    dbName = 'todolist'


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        //console.log(db)
    }).catch(error => console.error(error))
// MongoClient.connect(dbConnectionStr, {
//     useUnifiedTopology: true
// }, (err, client) => {
//     if (err) return console.error(err)
//     console.log('Connected to Database')
//     db = client.db('todolist')
// })



app.set('view engine', 'ejs')
app.use(express.static('public'))   //render css and main.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())



    //Read
    app.get('/',async (req, res) => {
        const item = await db.collection('items').find().toArray()
        res.render(__dirname + '/index.ejs',{items: item})  //render page
    })

    //Create
    app.post('/addItem', (req, res) => {
        db.collection('items').insertOne({ item: req.body.item, complete: false })
        .then(result => {
            console.log('Todo Added')
            //console.log(result)
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    

    app.delete('/deleteItem',(req,res) => {
        console.log(req.body)
        db.collection('items').deleteOne( { item: req.body.item})
        .then(result => {
            res.redirect('/')
            //res.json('delete')
        })
        .catch(error => console.error(error))
    })

    app.put('/markComplete', (req, res) => {
        console.log('mark complete')
        db.collection('items').findOneAndUpdate({ item: req.body.item},{
            $set:{
                complete: true
            }
        })
        .then(result => {
            res.redirect('/')
            //res.json('mark complete')
        })
        .catch(error => console.error(error))
    })

    app.put('/unComplete', (req, res) => {
        console.log('uncomplete')
        db.collection('items').findOneAndUpdate({ item: req.body.item }, {
            $set: {
                complete: false
            }
        })
        .then(result => {
            res.redirect('/')
            //res.json('uncomplete')
        })
        .catch(error => console.error(error))
    })




    





























// let db,
//     dbConnectionStr = 'mongodb+srv://todolist:todolist@cluster0.1r4hj.mongodb.net/todolist?retryWrites=true&w=majority',
//      dbName = 'todolist'    
//  code: 8000,  //codeName: 'AtlasError'?














