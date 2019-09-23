const express = require('express')
const router = express.Router()
const Record = require('../models/record')

const { authenticated } = require('../config/auth')

const category2Icon = {
  "houseware": `<i class="fas fa-home"></i>`,
  "traffic": `<i class="fas fa-shuttle-van"></i>`,
  "entertainment": `<i class="fas fa-grin-beam"></i>`,
  "food": `<i class="fas fa-utensils"></i>`,
  "other": `<i class="fas fa-pen"></i>`
}

const category2chinese = {
  "houseware": "居家業務",
  "traffic": "交通出行",
  "entertainment": "休閒娛樂",
  "food": "餐飲食品",
  "other": "其他"
}

const month2chinese = {
  '1': '一月',
  '2': '二月',
  '3': '三月',
  '4': '四月',
  '5': '五月',
  '6': '六月',
  '7': '七月',
  '8': '八月',
  '9': '九月',
  '10': '十月',
  '11': '十一月',
  '12': '十二月'
}

const monthRange = {
  "1": {
    $gte: new Date('2019-01-01'),
    $lte: new Date('2019-01-31')
  },
  "2": {
    $gte: new Date('2019-02-01'),
    $lte: new Date('2019-02-28')
  },
  "3": {
    $gte: new Date('2019-03-01'),
    $lte: new Date('2019-03-31')
  },
  "4": {
    $gte: new Date('2019-04-01'),
    $lte: new Date('2019-04-30')
  },
  "5": {
    $gte: new Date('2019-05-01'),
    $lte: new Date('2019-05-31')
  },
  "6": {
    $gte: new Date('2019-06-01'),
    $lte: new Date('2019-06-30')
  },
  "7": {
    $gte: new Date('2019-07-01'),
    $lte: new Date('2019-07-31')
  },
  "8": {
    $gte: new Date('2019-08-01'),
    $lte: new Date('2019-08-31')
  },
  "9": {
    $gte: new Date('2019-09-01'),
    $lte: new Date('2019-09-30')
  },
  "10": {
    $gte: new Date('2019-10-01'),
    $lte: new Date('2019-10-31')
  },
  "11": {
    $gte: new Date('2019-11-01'),
    $lte: new Date('2019-11-30')
  },
  "12": {
    $gte: new Date('2019-12-01'),
    $lte: new Date('2019-12-31')
  },
}




router.get('/', authenticated, (req, res) => {
  let user = req.user
  let category = req.query.category
  let categoryQuery = req.query.category
  let month = req.query.month
  let monthQuery = req.query.month
  let duoQuery = ''
  let filterObject = { userId: req.user._id }


  if (req.query.category) {
    filterObject.category = category
  }
  if (req.query.month) {
    filterObject.date = monthRange[month]
  }

  if (req.query.category && req.query.month) {
    duoQuery = `${month2chinese[month]} ＆ ${category2chinese[category]} 的`
  }


  Record.find(filterObject)
    .sort({ date: 'desc' })
    .exec((err, records) => {
      if (err) return console.error(err)
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
        record.formatDate = record.date.toJSON().split('T')[0]
        record.icon = category2Icon[record.category]
      })
      return res.render('index', {
        records: records,
        totalAmount: totalAmount,
        user: user,
        category: category2chinese[category],
        month: month2chinese[month],
        categoryQuery: categoryQuery,
        monthQuery: monthQuery,
        duoQuery: duoQuery
      })
    })
})

module.exports = router