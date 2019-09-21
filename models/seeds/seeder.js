const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Record = require('../record')
const User = require('../user')

const recordList = require('./Record.json')
const userList = require('./User.json')

mongoose.connect('mongodb://localhost/expenseRecord', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')
  for (let i = 0; i < userList.results.length; i++) {
    const newUser = new User({
      name: userList.results[i].name,
      email: userList.results[i].email,
      password: userList.results[i].password
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash

        newUser.save().then(users => {
          for (var j = i * 5; j < (i * 5) + 5; j++) {
            Record.create({
              userId: users._id,
              name: recordList.results[j].name,
              category: recordList.results[j].category,
              amount: recordList.results[j].amount,
              date: recordList.results[j].date
            })
          }
        }).catch(err => {
          console.log(err)
        })
      })
    })

  }
  console.log('Created seed!')
})

