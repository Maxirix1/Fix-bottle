const mongoose = require("mongoose");

/**
 * Paste one or more documents here
 */
// {
//     "student": {
//       "student_no": "49841",
//       "name": "นายชัยกร ประพันธ์พงพินิจ",
//       "id_card": "1103100937403",
//       "tel": 634214132,
//       "race": "ไทย",
//       "religion": "พุทธ",
//       "birthdateEN": "2006-10-27",
//       "birthdateTH": "27 ต.ค. 2549",
//       "sex": "ชาย",
//       "classroom_name": "มัธยมศึกษาปีที่ 6/1",
//       "grade": 6,
//       "classroom": 1
//     },
//     "parent": {
//       "name": "คุณวรรณี ทวีปรีชาชาติ",
//       "tel": 997454358
//     },
//     "semester": {
//       "year": 2567,
//       "term": 1
//     },
//     "address": {
//       "full_address": "629/614 หมู่ที่ - ซ.สาธุประดิษฐ์49 ถ.สาธุประดิษฐ์ ต.บางโพงพาง อ.ยานนาวา ปณ.10120",
//       "addressNo": "629/614",
//       "addressGroup": "-",
//       "addressAlley": "สาธุประดิษฐ์49",
//       "addressRoad": "สาธุประดิษฐ์",
//       "addressDistrict": "บางโพงพาง",
//       "addressSubDistrict": "ยานนาวา",
//       "addressProvince": "null",
//       "addressPostcode": "10120"
//     },
//     "createdAt": {
//       "$date": "2024-05-10T23:23:48.630Z"
//     },
//     "updatedAt": {
//       "$date": "2024-05-10T23:23:48.630Z"
//     },
//     "__v": 0
//   }

const studentSchema = new mongoose.Schema({
    student: {
        student_no: {
            type: String,
            required: [true, "Please provide a student_no"],
            unique: true,
        },
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        id_card: {
            type: String,
            required: [true, "Please provide a id_card"],
            unique: true,
        },
        tel: {
            type: Number,
            required: [true, "Please provide a tel"],
        },
        race: {
            type: String,
            default: "ไทย",
        },
        religion: {
            type: String,
            default: "พุทธ",
        },
        birthdateEN: {
            type: Date,
            required: [true, "Please provide a birthdateEN"],
        },
        birthdateTH: {
            type: String,
            required: [true, "Please provide a birthdateTH"],
        },
        sex: {
            type: String,
            required: [true, "Please provide a sex"],
            default: "ชาย",
        },
        classroom_name: {
            type: String,
            required: [true, "Please provide a classroom_name"],
        },
        grade: {
            type: Number,
            required: [true, "Please provide a grade"],
        },
        classroom: {
            type: Number,
            required: [true, "Please provide a classroom"],
        },
    },
    parent: {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        tel: {
            type: String,
            required: [true, "Please provide a tel"],
        },
    },
    semester: {
        year: {
            type: Number,
            required: [true, "Please provide a year"],
        },
        term: {
            type: Number,
            required: [true, "Please provide a term"],
        },
    },
    address: {
        full_address: {
            type: String,
            required: [true, "Please provide a full_address"],
        },
        addressNo: {
            type: String,
            required: [true, "Please provide a addressNo"],
        },
        addressGroup: {
            type: String,
            default: "-",
        },
        addressAlley: {
            type: String,
            required: [true, "Please provide a addressAlley"],
        },
        addressRoad: {
            type: String,
            required: [true, "Please provide a addressRoad"],
        },
        addressDistrict: {
            type: String,
            required: [true, "Please provide a addressDistrict"],
        },
        addressSubDistrict: {
            type: String,
            required: [true, "Please provide a addressSubDistrict"],
        },
        addressProvince: {
            type: String,
            default: "null",
        },
        addressPostcode: {
            type: String,
            required: [true, "Please provide a addressPostcode"],
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Student", studentSchema);
