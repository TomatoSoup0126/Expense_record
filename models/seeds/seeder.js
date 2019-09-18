const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/expenseRecord', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  for (var i = 0; i < 10; i++) {
    Record.create({
      name: 'name-' + i,
      category: 'category' + i,
      amount: i,
    })
  }

  console.log('done')
})