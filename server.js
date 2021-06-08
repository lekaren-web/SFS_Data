const {db} = require('./server/db')
const express = require('express')
const app = express()
const PORT = 8080

const path = require('path')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', require('./server/api')) 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}) 
db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    app.listen(PORT, () => console.log(`Running on port ${PORT}`))
  })