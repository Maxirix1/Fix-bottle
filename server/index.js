const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/users.js');
const StudentModel = require('./models/students.js'); // Import Student Model

const app = express();
const secretKey = '@fteracdes921115!!!@@@';

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://admin:gETLVaKf991T2P0480xy1wUWSDq9Dp@110.78.215.106:27017/suthi-vending-machine?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// ------------------⬇️------------signup-----------------⬇️-------------
app.post('/signup', async (req, res) => {
    const { idNo, idCard, password } = req.body.student;

    if (!idNo || !idCard) {
        return res.status(400).json({ message: 'ID และเลขบัตรประชาชนเป็นสิ่งที่ต้องกรอก' });
    }

    try {
        const studentData = await StudentModel.findOne({ 'student.student_no': idNo });

        if (!studentData) {
            return res.status(400).json({ message: 'ไม่พบข้อมูลนักเรียนในระบบ' });
        }

        if (studentData.student.id_card !== idCard) {
            return res.status(400).json({ message: 'ID และเลขบัตรประชาชนไม่ตรงกัน' });
        }

        const email = `${idNo}@suthi.ac.th`;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Student ID นี้ถูกใช้แล้ว' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username: studentData.student.name,
            student_no: studentData.student.student_no,
            email: email,
            password: hashedPassword,
            role: "student",
            volunteer: 0,
            behavior: 0,
            point: 0,
            excHistory: [],
        });

        await newUser.save();
        res.json(newUser);

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
        const student = await StudentModel.findOne({ 'student.student_no': id });

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
        const student = await StudentModel.findOne({ 'student.student_no': id });

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
});
