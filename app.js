//基本設定用常數
const express = require('express')
const exphbs = require('express-handlebars')
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

// 列出全部 Record
app.get('/records', (req, res) => {
  res.send('列出所有 Record')
})
// 新增一筆 Record 頁面
app.get('/records/new', (req, res) => {
  res.send('新增 Record 頁面')
})
// 新增一筆  Record
app.post('/records', (req, res) => {
  res.send('建立 Record')
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