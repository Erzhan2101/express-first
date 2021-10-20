const {nanoid} = require("nanoid")
const fs = require('fs')

const readData = () => {
    try {
        return JSON.parse(fs.readFileSync(`./tasks/sport.json`, 'utf8'))
    } catch (e) {
        return []
    }
}

const getAllTasks = (req, res) => {
    const data = readData() // читаем файл
    const filteredData = data
        .filter(item => !item._isDeleted === false) // возвращят не удаленные
        .map(item => {
            return {
                _id: item._id,
                title: item.title,
                status: item.status,
            }
        })
    res.json(filteredData)
}
const getByTime = (req, res) => {
    const data = readData()
    const timeSpan = { // дает знать когда была создана или удаленна обект
        'day': 1000 * 60 * 60 * 24,
        'week': 1000 * 60 * 60 * 24 * 7,
        'month': 1000 * 60 * 60 * 24 * 30
    }
    const filteredData = data.filter(item => +new Date() - item._createdAt < timeSpan[req.params.timespan])
        .map(el => {
            return {
                id: el.taskId,
                title: el.title,
                status: el.status
            }
        })
    res.json(filteredData)
}
const addTask = (req, res) => {
    const newTask = { // создаем новый обект при post запросе
        "title": req.body.title,
        "_isDeleted": false,
        "_createdAt": +new Date(),
        "_deleteAt": null,
        "status": "new"
    }
    const data = readData()
    const updatedTasks = [...data, newTask]
    fs.writeFileSync(`./tasks/sport.json`, JSON.stringify(updatedTasks, null, 2))
    res.json({newTask})
}
const deleteTask = (req, res) => {
    const data = readData()
    const updatedTasks = data.map(item => item.taskId === req.params.id ? {...item, _isDeleted: true} : item)
    fs.writeFileSync(`./tasks/sport.json`, JSON.stringify(updatedTasks, null, 2))
    res.json({updatedTasks})
}
const updateTask = (req, res) => {
    const statusOptions = ['done', 'new', 'in progress', 'blocked']
    if (statusOptions.includes(req.body.status)) {
        const data = readData()
        const updateTask = data.map(el => el.taskId === req.params.id ? {...el, status: req.body.status} : el)
        fs.writeFileSync(`./tasks/sport.json`, JSON.stringify(updateTask, null, 2))
        res.json(updateTask)
    } else {
        res.status(501).json({"status": "error", "message": "incorrect status"})
    }
}

module.exports = {
    getAllTasks,getByTime,addTask,deleteTask,updateTask
}