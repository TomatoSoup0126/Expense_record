const express = require('express')
const router = express.Router()
const Record = require('../models/record')


// 新增一筆 Record 頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增一筆  Record
router.post('/', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    let time = record.date
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    if (month < 10) {
      month = "0" + month
    }
    let day = time.getDate()
    let date = `${year}-${month}-${day}`

    return res.render('edit', { record: record, date: date })
  })
})

// 修改 Record
router.put('/:id', (req, res) => {

  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name
    record.date = req.body.date
    record.category = req.body.category
    record.amount = req.body.amount
    record.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 刪除 Record
router.delete('/:id/delete', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})



module.exports = router