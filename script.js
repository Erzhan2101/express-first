// const http = require('http')
// // модуль http это основное модуль для создание бекенда чтобы работат с API
//
// const url = "localhost"
// const port = 8000 // бекенд работает в порте 8000
//
// //при оброботке запросе на сервер функция приниемает два аргумента request (req) , response (res)
// // reg - это обект который приходит от клиетнта на сервер
// // res - это ответ от сервера на клиент
// const server = http.createServer((req, res) => {
// if (req.url === '/users'){ // делаем запрос на users
//     res.write('отдам всех пользователем')
// }
// if(req.url === '/catalog'){ // делаем запрос на catalog
//     res.write('отдам весь каталог')
// }
//     res.end()
// })
//
// server.listen(port, url, () => {
//     console.log("Sever is running")
// })


//EXPRESS
// const express = require('express')
// const cors = require('cors')
//
// const server = express()
// server.use(cors()) // нужен для того чтобы связать два порта (из-за разных портов)
//
// server.get('/api/users', (reg, res) => {
//     res.json([{name:'Aza'}, {name:'Era'}])
// })
//
// server.get('/api/catalog', (reg, res) => {
//     res.json([{title:'сыр'}, {title:'мясо'}])
// })
//
// server.listen(8000, () => {
//     console.log('server is running')
// })


// const express = require('express')
// const cors = require('cors')
// const fs = require('fs')// fs оно читает код читает json-файл (fs - это библиотека) (fs-fail system)
//
// const server = express()
// server.use(cors())
// server.use(express.json())
//
// const getAllUsers = () => JSON.parse(fs.readFileSync('users.json', 'utf8'))
// // utf8 - это кодиров кода (алгоритим)
//
// server.get('/api/users', (req, res) => {
//     const users = getAllUsers()
//     res.json(users)
//     res.end()
// })
//
//
// // params - обект
// server.get('/api/users/:id', (req, res) => {
//     const users = getAllUsers()
//     const selectedUser = users.find(el => el.id === +req.params.id)
//     if (selectedUser) {
//         res.json(selectedUser)
//     } else {
//         res.status(404).json({status: 'Not found'})
//     }
// })
//
//
// server.delete('/api/users/:id', (req, res) => {
//     const users = getAllUsers()
//     const selectedUser = users.find(el => el.id === +req.params.id)
//     const filteredUser = users.filter(el => el.id !== +req.params.id)
//     fs.writeFileSync('users.json', JSON.stringify(filteredUser, null, 2))
//     res.json(selectedUser)
// })
//
// server.post('/api/users', (req, res) => {
//     const users = getAllUsers()
//     const addUser = [...users, req.body] // body это обект с одним элементом
//     fs.writeFileSync("users.json", JSON.stringify(addUser, null, 2))
//     res.json(addUser)
// })
//
// server.put("/api/users/:id", (req, res) => {
//     const users = getAllUsers()
//     const selectedUser = users.map(item => item.id === +req.params.id ? {...item, ...req.body} : item)
//     fs.writeFileSync("users.json", JSON.stringify(selectedUser , null, 2))
//     res.json(selectedUser)
// })
//
//
// server.listen(8000, () => {
//     console.log('Server is running')
// })
///////////////////////////////////////////////////////////////////

// const express = require('express')
// const fs = require('fs')
//
// const server = express()
// const {nanoid} = require("nanoid")
// server.use(express.json())
//
// const readData = (fileName) => {
//     try {
//         return JSON.parse(fs.readFileSync(`./tasks/${fileName}.json`, 'utf8'))
//     } catch (e) {
//         return []
//     }
// }
//
// // get запрос
// server.get('/api/tasks/:category', (req, res) => {
//     const data = readData(req.params.category) // читаем файл
//     const filteredData = data
//         .filter(item => item._isDeleted === false) // возвращят не удаленные
//         .map(item => {
//             //первый вариант как не выводит obj
//             // delete item._isDeleted
//             // delete item._createdAt
//             // delete item._deleteAt
//             // return item
//             // второй вариант как не выводит obj
//             return {
//                 id: item.taskId,
//                 title: item.title,
//                 status: item.status,
//             }
//         })
//     res.json(filteredData)
//     // const data = fs.readFileSync(`./tasks/${reg.params.category}.json`, 'utf8')
//     // res.json(JSON.parse(data))
// })
//
// server.get('/api/tasks/:category/:timespan', (req, res) => {
//     const data = readData(req.params.category)
//     const timeSpan = {
//         'day': 1000 * 60 * 60 * 24,
//         'week': 1000 * 60 * 60 * 24 * 7,
//         'month': 1000 * 60 * 60 * 24 * 30
//     }
//     const filteredData = data.filter(item => +new Date() - item._createdAt < timeSpan[req.params.timespan])
//         .map(el => {
//             return {
//                 id: el.taskId,
//                 title: el.title,
//                 status: el.status
//             }
//         })
//     res.json(filteredData)
// })
//
// // post запрос
// server.post("/api/tasks/:category", (req, res) => {
//     const newTask = {
//         "taskId": nanoid(5),
//         "title": req.body.title,
//         "_isDeleted": false,
//         "_createdAt": +new Date(),
//         "_deleteAt": null,
//         "status": "new"
//     }
//     const data = readData(req.params.category)
//     const updatedTasks = [...data, newTask]
//     fs.writeFileSync(`./tasks/${req.params.category}.json`, JSON.stringify(updatedTasks, null, 2))
//     // console.log(req.params.category)
//     // console.log(req.body)
//     // res.json({status: "post inquiry"})
//     res.json({updatedTasks})
// })
//
// // delete запрос
// server.delete("/api/tasks/:category/:id", (req, res) => {
//     const data = readData(req.params.category)
//     const updatedTasks = data.map(item => item.taskId === req.params.id ? {...item, _isDeleted: true} : item)
//     fs.writeFileSync(`./tasks/${req.params.category}.json`, JSON.stringify(updatedTasks, null, 2))
//     // res.json({status: "delete inquiry"})
//     res.json({updatedTasks})
// })
//
// //patch запрос
//
// server.patch('/api/tasks/:category/:id', (req, res) => {
//     const statusOptions = ['done', 'new', 'in progress', 'blocked']
//     if (statusOptions.includes(req.body.status)) {
//         const data = readData(req.params.category)
//         const updateTask = data.map(el => el.taskId === req.params.id ? {...el, status: req.body.status} : el)
//         fs.writeFileSync(`./tasks/${req.params.category}.json`, JSON.stringify(updateTask, null, 2))
//         res.json(updateTask)
//     } else {
//         res.status(501).json({"status": "error", "message": "incorrect status"})
//     }
// })
//
// server.listen(process.env.PORT || 8000, () => {
//     console.log('Server is running')
// })


// / дубликат сервера для mongoDB
const express = require('express')
const taskRouter = require("./routes/tasksRouter")
const chalk = require("chalk")
const mongoose = require("mongoose")
// const Tasks = require("./models/taskModel")
const cors = require("cors")
require("dotenv").config()

// создание сервера
const server = express()

//библтотека для подключение mongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(chalk.blue("DB IS CONNECTED")))
    .catch(() => console.log(chalk.red("DB NOT CONNECTED")))

// Tasks.updateOne({_id: "616fda32d4e292b247441cfc"}, {_deletedAt: +new Date()})
//     .exec((err, data) => {
//         console.log(err)
//         console.log(data)
//     })
// const newTask = new Tasks ({
//     title: "проветка 2 !!!"
// })
// newTask.save()

// первый вариант для получение
// Tasks.find({}).exec((error, list) => {
// console.log(list)
// })

//второй вариант для получение
// Tasks.find({}).then((list) => console.log(list))

// оброботка данных в req.body
server.use(express.json())
server.use(cors())
// роуты ,  которые начинаются с /api/tasks
server.use("/api/tasks", taskRouter)

// если ни один роут не подошел то выводим 404
server.use((req, res, next) => {
    const error = {message: "Not server"}
    res.status(404).json(error)
    next()
})

// запуск сервера
server.listen(process.env.PORT || 8000, () => {
    console.log('Server is running')
})