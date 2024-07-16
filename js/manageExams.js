document.addEventListener('DOMContentLoaded', function() {
   

    var dateElems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dateElems, {
        format: 'yyyy-mm-dd',
        autoClose: true
    });

    loadManageExamCourses();

    document.getElementById('saveEditExamButton').addEventListener('click', saveEditExam);
    document.getElementById('confirmDeleteExamButton').addEventListener('click', deleteExam);
});

function loadManageExamCourses() {
    fetch('load_courses.php')
        .then(response => response.json())
        .then(data => {
            let courseSelect = document.getElementById('courseManageExam');
            data.courses.forEach(course => {
                let option = document.createElement('option');
                option.value = course.CourseID;
                option.textContent = course.CourseName;
                courseSelect.appendChild(option);
            });
            M.FormSelect.init(courseSelect);
        });
}

function loadManageExamSubjects(courseID) {
    fetch('load_subjects.php?courseID=' + courseID)
        .then(response => response.json())
        .then(data => {
            let subjectSelect = document.getElementById('subjectManageExam');
            subjectSelect.innerHTML = '<option value="" disabled selected>Select Subject</option>';
            data.subjects.forEach(subject => {
                let option = document.createElement('option');
                option.value = subject.SubjectID;
                option.textContent = subject.SubjectName;
                subjectSelect.appendChild(option);
            });
            M.FormSelect.init(subjectSelect);
        });
}

function loadManageExams(subjectID) {
    fetch('loadExams.php?subjectID=' + subjectID)
        .then(response => response.json())
        .then(data => {
            let examBody = document.getElementById('manageExamBody');
            examBody.innerHTML = '';
            data.exams.forEach(exam => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${exam.ExamName}</td>
                    <td>${exam.ExamDate}</td>
                    <td>
                        <button class="btn blue darken-2 waves-effect waves-light" onclick="showEditExamModal(${exam.ExamID}, '${exam.ExamName}', '${exam.ExamDate}')"><i class="material-icons">edit</i></button>
                        <button class="btn red darken-2 waves-effect waves-light" onclick="showDeleteExamModal(${exam.ExamID})"><i class="material-icons">delete</i></button>
                    </td>
                `;
                examBody.appendChild(row);
            });
        });
}

function showEditExamModal(examID, examName, examDate) {
    document.getElementById('editExamName').value = examName;
    document.getElementById('editExamDate').value = examDate;
    document.getElementById('saveEditExamButton').setAttribute('data-examid', examID);

    let modal = M.Modal.getInstance(document.getElementById('editExamModal'));
    modal.open();
}

function saveEditExam() {
    let examID = document.getElementById('saveEditExamButton').getAttribute('data-examid');
    let examName = document.getElementById('editExamName').value;
    let examDate = document.getElementById('editExamDate').value;

    let formattedDate = new Date(examDate).toISOString().split('T')[0];

    fetch('edit_exam.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ examID, examName, examDate: formattedDate })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.toast({ html: 'Exam edited successfully!', classes: 'green' });
            loadManageExams(document.getElementById('subjectManageExam').value);
        } else {
            M.toast({ html: 'Error editing exam!', classes: 'red' });
        }
    });

    let modal = M.Modal.getInstance(document.getElementById('editExamModal'));
    modal.close();
}

function showDeleteExamModal(examID) {
    document.getElementById('confirmDeleteExamButton').setAttribute('data-examid', examID);

    let modal = M.Modal.getInstance(document.getElementById('deleteExamModal'));
    modal.open();
}

function deleteExam() {
    let examID = document.getElementById('confirmDeleteExamButton').getAttribute('data-examid');

    fetch('delete_exam.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ examID })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.toast({ html: 'Exam deleted successfully!', classes: 'green' });
            loadManageExams(document.getElementById('subjectManageExam').value);
        } else {
            M.toast({ html: 'Error deleting exam!', classes: 'red' });
        }
    });

    let modal = M.Modal.getInstance(document.getElementById('deleteExamModal'));
    modal.close();
}