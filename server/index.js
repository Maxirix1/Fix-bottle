const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StudentModel = require('./models/Student');
const existingStudents = require('./DataStudent.json'); // Import existing student data

const app = express();
const secretKey = '@fteracdes921115!!!@@@';

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Student", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// ------------------⬇️------------signup-----------------⬇️-------------

app.post('/signup', async (req, res) => {
    const { idNo, idCard, password } = req.body.student;

    // ตรวจสอบว่า idNo และ idCard ไม่เป็น null หรือ undefined
    if (!idNo || !idCard) {
        return res.status(400).json({ message: 'ID และเลขบัตรประชาชนเป็นสิ่งที่ต้องกรอก' });
    }

    try {
        const studentData = existingStudents.find(student => student.student.student_no === idNo);

        if (!studentData) {
            return res.status(400).json({ message: 'ไม่พบข้อมูลนักเรียนในระบบ' });
        }

        const matchedStudent = existingStudents.find(student => {
            return student.student.student_no === idNo && student.student.id_card === idCard;
        });

        if (!matchedStudent) {
            return res.status(400).json({ message: 'ID และเลขบัตรประชาชนไม่ตรงกัน' });
        }

        const { name } = studentData.student;

        const existingStudent = await StudentModel.findOne({ student_no: idNo });

        if (existingStudent) {
            return res.status(400).json({ message: 'Student ID นี้ถูกใช้แล้ว' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new StudentModel({
            student_no: idNo,
            id_card: idCard,
            name: name,
            password: hashedPassword,
            totalPoint: 0,
            behavior: 0,
            volunteer: 0
        });

        await newStudent.save();
        res.json(newStudent);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
    }
});




// -----------------⬇️----------login----------⬇️------------------

app.post('/login', async (req, res) => {
    const { idNo, password } = req.body;

    try {
        const student = await StudentModel.findOne({ student_no: idNo });

        if (!student) {
            return res.status(400).json();
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (!isPasswordValid) {
            return res.status(400).json();
        }

        const token = jwt.sign({ student_no: student.student_no }, secretKey, { expiresIn: '1h' }); // สร้าง token
        res.json({ token, student });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
    }
});

// ---------------⬇️-------------ตรวจสอบ authtoken----⬇️-----------------

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'ไม่มี token ใน headers' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey); // Verify token
        req.userID = decoded.ID; // Add decoded ID to request object
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'token ไม่ถูกต้องหรือหมดอายุ' });
    }
};

// --------------------⬇️-------เช็คชื่อและid--------------⬇️---------

app.get('/user/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const student = await StudentModel.findOne({ student_no: id });

        if (!student) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้' });
        }

        res.json(student);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
    }
});


// ---------------------⬇️------------การแลกเปลี่ยนคะแนน----------⬇️--------------------

app.post('/user/exchange/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { points, pointType } = req.body;

    try {
        const student = await StudentModel.findOne({ student_no: id });

        if (!student) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้' });
        }

        if (points > student.totalPoint) {
            return res.status(400).json({ message: 'คะแนนที่มีไม่เพียงพอที่จะแลก' });
        }

        const behaviorPoints = pointType === 'behavior' ? points / 10 : 0;
        const volunteerPoints = pointType === 'volunteer' ? points / 10 : 0;

        student.totalPoint -= points;
        student.behavior += behaviorPoints;
        student.volunteer += volunteerPoints;

        await student.save();
        res.json({ updatedUser: student });

    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการแลกคะแนน:', error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการแลกคะแนน' });
    }
});



// ----------------⬇️----------------port: 3001-----⬇️---------------

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(existingStudents[2266].student.name);
    console.log(existingStudents[2266].student.classroom_name);
});
