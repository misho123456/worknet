const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static('../public/dist'))

app.get('*', (req, res) => res.redirect('/'))

app.listen(3000, () => console.log('started'))
