const mongoose = require("mongoose")
const {Schema} = require("mongoose");
const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    status: {type: String, required:true, default: "new"},
    _isDeleted: {type:Boolean, required: true, default: false},
    // тип может быть любым
    _deletedAt: {type: Schema.Types.Mixed, required: true, default: false},
    _createdAt: {type: Number, required: true, default: +new Date()}
})

const tasksModel = mongoose.model("tasks", taskSchema)

module.exports = tasksModel