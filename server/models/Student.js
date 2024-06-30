const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    student_no: { type: String, required: true, unique: true },
    id_card: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    totalPoint: { type: Number, default: 0 },
    behavior: { type: Number, default: 0 },
    volunteer: { type: Number, default: 0 }
});

const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel;
