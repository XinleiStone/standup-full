var student = require('./student.js');
var teacher = require('./tercher.js');

function add(tercherName, students) {
    teacher.add(tercherName);

    students.forEach(function(item, index) {
        student.add(item);
    });
}

exports.add = add;