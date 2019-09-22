//基本設定用常數
const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require("handlebars")
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const app = express()


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/expenseRecord', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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

app.use(session({
  secret: 'show me my money',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use(flash())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(express.static('public'))
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))



//設定伺服器啟動
app.listen(process.env.PORT || 3000, () => {
  console.log(`Express app listening on port.`)
})