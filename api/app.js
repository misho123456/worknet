const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const vacancies = require('./routes/vacancies')
const users = require('./routes/users')
const libs = require('./routes/libs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static('../public/dist'))

app.use(vacancies.baseUrl, vacancies.router)
app.use(users.baseUrl, users.router)
app.use(libs.baseUrl, libs.router)

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

app.get('*', (req, res) => res.redirect('/'))

app.listen(3000, () => console.log('started'))
