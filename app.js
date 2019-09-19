//基本設定用常數
const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require("handlebars")
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Record = require('./models/record')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const category2Icon = {
  "houseware": `<i class="fas fa-home"></i>`,
  "traffic": `<i class="fas fa-shuttle-van"></i>`,
  "entertainment": `<i class="fas fa-grin-beam"></i>`,
  "food": `<i class="fas fa-utensils"></i>`,
  "other": `<i class="fas fa-pen"></i>`
}

mongoose.connect('mongodb://localhost/expenseRecord', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


Handlebars.registerHelper('if_equal', function (item, expectedItem, options) {
  if (item === expectedItem) {
    return options.fn(this);
  }
  return options.inverse(this);
})

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))

//設定伺服器啟動
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})