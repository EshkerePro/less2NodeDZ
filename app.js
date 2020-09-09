const express = require('express');
const path = require('path');
const fs = require('fs');
const expressHandlebars = require('express-handlebars');

// fs.mkdir(path.join(process.cwd(), 'date'), (err => {
//     if (err) {
//     console.log(err)
// }
// }))

// fs.writeFile(path.join(process.cwd(), 'date', 'date.txt'), '', (err) => {
//     if (err) {
//         console.log(err)
//     }
// } )

const server = express();

server.use(express.urlencoded({exdends: true}))
server.use(express.json())

server.set('view engine', '.hbs')
server.engine('.hbs', expressHandlebars({
    defaultLayout: false
}))
server.set('views', path.join(process.cwd(), 'template'))

const wayToDate = path.join(process.cwd(), 'date', 'date.txt');
let userInfo;


server.get('/', (req, res) => {

    res.render('regist')
})

server.post('/req', (req, res) => {
    console.log(req.body)
     user = JSON.stringify(req.body)
 fs.readFile(wayToDate, (err, date) => {
     if (err) {
         console.log(err)
     }
     let point = date.toString()
     if (point != '') {
         fs.appendFile(wayToDate, ', ' + user, (err1) => {
             if (err1) {
                 console.log(err1)
             }
         })
     }
     else {
         fs.appendFile(wayToDate,   user, (err2) => {
             if (err2) {
                 console.log(err2)
             }
         })
     }
 })
    res.redirect('/users')
})

server.get('/users', (req, res) => {
    fs.readFile(wayToDate, (err, data) => {
            userInfo = JSON.parse(data.toString())
    })

    res.render('users', {userInfo})
})

server.get('/ex', (req, res) => {

    res.render('exit')
})


server.post('/exit', (req, res) => {
    if (userInfo.name == req.body.name) {
        res.redirect('/exitUser')
    }
    else {
        res.redirect('/')
    }
})

server.get('/exitUser', (req, res) => {
    res.render('accountUser', {userInfo})
})

server.listen(5001, (err) => {
    if (err) {
        console.log(err)
    }
    console.log('Port 5001 is WORKED!')
})
