const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require("path")
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', (req,res) => {
    res.render('index.html')
})


app.listen(8080, () => {
    console.log('listening on port 8080')
})