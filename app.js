//基本設定用常數
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record')
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/expenseRecord', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(bodyParser.urlencoded({ extended: true }))

//定義模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定根目錄路由
app.get('/', (req, res) => {
  Record.find((err, records) => {
    if (err) return console.error(err)
    let totalAmount = 0
    records.forEach(record => {
      totalAmount += record.amount
    })
    return res.render('index', { records: records, totalAmount: totalAmount })
  })
})

// 新增一筆 Record 頁面
app.get('/records/new', (req, res) => {
  return res.render('new')
})


// 新增一筆  Record
app.post('/records', (req, res) => {
  const record = new Record({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
  })

  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})


// 修改 Record 頁面
app.get('/records/:id/edit', (req, res) => {
  res.send('修改 Record 頁面')
})
// 修改 Record
app.post('/records/:id/edit', (req, res) => {
  res.send('修改 Record')
})
// 刪除 Record
app.post('/records/:id/delete', (req, res) => {
  res.send('刪除 Record')
})



//設定伺服器啟動
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})