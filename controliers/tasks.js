const Tasks = require("../models/taskModel")

const getAllTasks = async (req, res) => {
    const data = await Tasks.find({})// читаем файл
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
const getByTime = async (req, res) => {
    const data = await Tasks.find({})
    const timeSpan = { // дает знать когда была создана или удаленна обект
        'day': 1000 * 60 * 60 * 24,
        'week': 1000 * 60 * 60 * 24 * 7,
        'month': 1000 * 60 * 60 * 24 * 30
    }
    const filteredData = data.filter(item => +new Date() - item._createdAt < timeSpan[req.params.timespan]).map(el => {
            return {
                _id: el._id,
                title: el.title,
                status: el.status
            }
        })
    res.json(filteredData)
}
const addTask = async (req, res) => {
    try {
        const newTask = new Tasks({
            title: req.body.title
            //остальное вазмет по дефолту
        })
        // const newTask = { // создаем новый обект при post запросе
        //     "title": req.body.title,
        //     "_isDeleted": false,
        //     "_createdAt": +new Date(),
        //     "_deleteAt": null,
        //     "status": "new"
        // }
        // const data = readData()
        // const updatedTasks = [...data, newTask]
        // fs.writeFileSync(`./tasks/sport.json`, JSON.stringify(updatedTasks, null, 2))
        const saveTask = await newTask.save()
        res.json(saveTask)
    } catch (e) {
        res.status(401).json({message: "ошибка сохранение"})
    }
}
const deleteTask = async (req, res) => {
    try{
        const updateTask = await Tasks.findByIdAndUpdate(
            {_id: req.params.id},
            {_isDeleted: true, _deletedAt: +new Date()},
            {new: true})
        res.json(updateTask)
    } catch (e) {
        res.json({message: "ошибка id"})
    }
}
const updateTask = async (req, res) => {
    const id = req.params.id
    const status = req.body.status
    const statusOptions = ['done', 'new', 'in progress', 'blocked']
    if (statusOptions.includes(req.body.status)) {
        const updateStatusTask = await Tasks.findOneAndUpdate({_id: id}, {status: status}, {new: true})
        res.json(updateStatusTask)
    } else {
        res.status(501).json({"status": "error", "message": "incorrect status"})
    }
}

module.exports = {
    getAllTasks, getByTime, addTask, deleteTask, updateTask
}