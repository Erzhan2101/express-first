const express = require("express")
const {getAllTasks,getByTime,addTask,deleteTask,updateTask} = require("../controliers/tasks");
const router = express.Router()

// get запрос
router.get('/', getAllTasks)
router.get('/:timespan', getByTime)

// post запрос
router.post("/",addTask)

// delete запрос
router.delete("/:id", deleteTask)

//patch запрос
router.patch('/:id', updateTask)

module.exports = router