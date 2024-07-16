document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    var dateElems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dateElems, {
        format: 'yyyy-mm-dd',
        autoClose: true
    });

    var modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);

    loadCourses();
    document.getElementById('filterButton').addEventListener('click', fetchScores);
    document.getElementById('saveEditButton').addEventListener('click', saveEdit);
    document.getElementById('confirmDeleteButton').addEventListener('click', confirmDelete);
});

let currentEditScoreId = null;
let currentDeleteScoreId = null;

function loadCourses() {
    fetch('load_courses.php')
        .then(response => response.json())
        .then(data => {
            const courseSelectScoreboard = document.getElementById('courseSelectScoreboard');
            courseSelectScoreboard.innerHTML = '<option value="" disabled selected>Select Course</option>';
            data.courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.CourseID;
                option.textContent = course.CourseName;
                courseSelectScoreboard.appendChild(option);
            });
            M.FormSelect.init(courseSelectScoreboard);
        })
        .catch(error => console.error('Error loading courses:', error));
}

function loadSubjects(courseID, subjectSelectID) {
    fetch(`load_subjects.php?courseID=${courseID}`)
        .then(response => response.json())
        .then(data => {
            const subjectSelect = document.getElementById(subjectSelectID);
            subjectSelect.innerHTML = '<option value="" disabled selected>Select Subject</option>';
            data.subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.SubjectID;
                option.textContent = subject.SubjectName;
                subjectSelect.appendChild(option);
            });
            M.FormSelect.init(subjectSelect);
        })
        .catch(error => console.error('Error loading subjects:', error));
}

function loadExams(subjectID, examSelectID) {
    fetch(`load_exams.php?subjectID=${subjectID}`)
        .then(response => response.json())
        .then(data => {
            const examSelect = document.getElementById(examSelectID);
            examSelect.innerHTML = '<option value="" disabled selected>Select Exam</option>';
            data.exams.forEach(exam => {
                const option = document.createElement('option');
                option.value = exam.ExamID;
                option.textContent = exam.ExamName;
                examSelect.appendChild(option);
            });
            M.FormSelect.init(examSelect);
        })
        .catch(error => console.error('Error loading exams:', error));
}

function fetchScores() {
    const courseID = document.getElementById('courseSelectScoreboard').value;
    const subjectID = document.getElementById('subjectSelectScoreboard').value;
    const examID = document.getElementById('examSelectScoreboard').value;
    const examDateRaw = document.getElementById('examDateScoreboard').value;

    if (!courseID || !subjectID || !examID || !examDateRaw) {
        M.toast({ html: 'Please fill in all fields!', classes: 'rounded' });
        return;
    }

    const examDate = moment(examDateRaw, 'YYYY-MM-DD').format('YYYY-MM-DD');

    fetch(`load_scores.php?courseID=${courseID}&subjectID=${subjectID}&examID=${examID}&examDate=${examDate}`)
        .then(response => response.json())
        .then(data => {
            const scoreboardBody = document.getElementById('scoreboardBody');
            scoreboardBody.innerHTML = '';
            data.scores.forEach(score => {
                const percentage = (score.ObtainedMarks / score.FullMarks) * 100;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${score.StudentName}</td>
                    <td>${score.ObtainedMarks}</td>
                    <td>${score.FullMarks}</td>
                    <td>${score.EmailID}</td>
                    <td>${score.DateOfBirth}</td>
                    <td>${percentage.toFixed(2)}%</td>
                    <td>
                        <button class="btn-small waves-effect waves-light blue darken-2" onclick="openEditModal(${score.ScoreID}, '${score.StudentName}', ${score.ObtainedMarks}, ${score.FullMarks})">Edit</button>
                        <button class="btn-small waves-effect waves-light red darken-2" onclick="openDeleteModal(${score.ScoreID})">Delete</button>
                    </td>
                `;
                scoreboardBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching scores:', error));
}

function openEditModal(scoreID, studentName, obtainedMarks, fullMarks) {
    currentEditScoreId = scoreID;
    document.getElementById('editStudentName').value = studentName;
    document.getElementById('editObtainedMarks').value = obtainedMarks;
    document.getElementById('editFullMarks').value = fullMarks;
    M.updateTextFields();
    M.Modal.getInstance(document.getElementById('editModal')).open();
}

function saveEdit() {
    const obtainedMarks = document.getElementById('editObtainedMarks').value;
    const fullMarks = document.getElementById('editFullMarks').value;

    fetch(`edit_score.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            scoreID: currentEditScoreId,
            obtainedMarks,
            fullMarks
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.toast({ html: 'Score updated successfully!', classes: 'rounded' });
            fetchScores();
        } else {
            M.toast({ html: 'Error updating score!', classes: 'rounded' });
        }
        M.Modal.getInstance(document.getElementById('editModal')).close();
    })
    .catch(error => console.error('Error updating score:', error));
}

function openDeleteModal(scoreID) {
    currentDeleteScoreId = scoreID;
    M.Modal.getInstance(document.getElementById('deleteModal')).open();
}

function confirmDelete() {
    fetch(`delete_score.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ scoreID: currentDeleteScoreId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.toast({ html: 'Score deleted successfully!', classes: 'rounded' });
            fetchScores();
        } else {
            M.toast({ html: 'Error deleting score!', classes: 'rounded' });
        }
        M.Modal.getInstance(document.getElementById('deleteModal')).close();
    })
    .catch(error => console.error('Error deleting score:', error));
}
