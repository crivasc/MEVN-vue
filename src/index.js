const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')


const app = express()
mongoose.connect('mongodb://localhost/mevn-database')
.then(db => console.log('DB conectada'))
.catch(err=>console.log(err))

//settings
app.set('port', process.env.PORT || 3000)

//middlewares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api/tasks', require('./routes/tasks'))

//static files
app.use(express.static(__dirname+'/public'))

//servidor a la escucha
app.listen(app.get('port'), ()=>{
    console.log('servidor en puerto', app.get('port'))
})