//基本設定用常數
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

//定義模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定根目錄路由
app.get('/', (req, res) => {
  res.render('index')
})

//設定伺服器啟動
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})