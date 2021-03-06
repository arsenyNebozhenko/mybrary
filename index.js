if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, useUnifiedTopology: true 
})
const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('Connected to mongoose...'))

app.use('/', require('./routes/index'))

app.use('/authors', require('./routes/authors'))

app.listen(process.env.PORT || 3000)
