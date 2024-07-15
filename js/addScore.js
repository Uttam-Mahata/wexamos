document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
    loadStudents();
});

function loadCourses() {
    fetch('load_courses.php')
        .then(response => response.json())
        .then(data => {
            const courseSelectAddScore = document.getElementById('courseAddScore');
            const courseSelectCreateExam = document.getElementById('courseCreateExam');
            const courseSelectAddStudent = document.getElementById('courseSelect');

            [courseSelectAddScore, courseSelectCreateExam, courseSelectAddStudent].forEach(select => {
                if (select) {
                    select.innerHTML = '<option value="" disabled selected>Select Course</option>';
                    data.courses.forEach(course => {
                        const option = document.createElement('option');
                        option.value = course.CourseID;
                        option.textContent = course.CourseName;
                        select.appendChild(option);
                    });
                    M.FormSelect.init(select);
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

function loadSubjects(courseID, subjectSelectID) {
    fetch(`load_subjects.php?courseID=${courseID}`)
        .then(response => response.json())
        .then(data => {
            const subjectSelect = document.getElementById(subjectSelectID);
            if (subjectSelect) {
                subjectSelect.innerHTML = '<option value="" disabled selected>Select Subject</option>';
                data.subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject.SubjectID;
                    option.textContent = subject.SubjectName;
                    subjectSelect.appendChild(option);
                });
                M.FormSelect.init(subjectSelect);
            }
        })
        .catch(error => console.error('Error:', error));
}

function loadExams(subjectID, examSelectID) {
    fetch(`load_exams.php?subjectID=${subjectID}`)
        .then(response => response.json())
        .then(data => {
            const examSelect = document.getElementById(examSelectID);
            if (examSelect) {
                examSelect.innerHTML = '<option value="" disabled selected>Select Exam</option>';
                data.exams.forEach(exam => {
                    const option = document.createElement('option');
                    option.value = exam.ExamID;
                    option.textContent = exam.ExamName;
                    examSelect.appendChild(option);
                });
                M.FormSelect.init(examSelect);
            }
        })
        .catch(error => console.error('Error:', error));
}

function loadStudents() {
    fetch('load_students.php')
        .then(response => response.json())
        .then(data => {
            const studentSelect = document.getElementById('studentAddScore');
            if (studentSelect) {
                studentSelect.innerHTML = '<option value="" disabled selected>Select Student</option>';
                data.students.forEach(student => {
                    const option = document.createElement('option');
                    option.value = student.StudentID;
                    option.textContent = student.StudentName;
                    studentSelect.appendChild(option);
                });
                M.FormSelect.init(studentSelect);
            }
        })
        .catch(error => console.error('Error:', error));
}

function addScore() {
    const courseID = document.getElementById('courseAddScore').value;
    const subjectID = document.getElementById('subjectAddScore').value;
    const examID = document.getElementById('examAddScore').value;
    const studentID = document.getElementById('studentAddScore').value;
    const obtainedMarks = document.getElementById('obtainedMarksAddScore').value;
    const fullMarks = document.getElementById('fullMarksAddScore').value;

    if (courseID && subjectID && examID && studentID && obtainedMarks && fullMarks) {
        fetch('add_score.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                courseID: courseID,
                subjectID: subjectID,
                examID: examID,
                studentID: studentID,
                obtainedMarks: obtainedMarks,
                fullMarks: fullMarks
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    M.toast({html: 'Score added successfully!', classes: 'green'});
                } else {
                    M.toast({html: 'Failed to add score. Please try again.', classes: 'red'});
                }
            })
            .catch(error => {
                console.error('Error:', error);
                M.toast({html: 'An error occurred. Please try again.', classes: 'red'});
            });
    } else {
        M.toast({html: 'Please fill out all fields.', classes: 'red'});
    }
}
