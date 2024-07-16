document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    var dateElems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dateElems, {
        format: 'yyyy-mm-dd',
        autoClose: true
    });

    loadCourses();
    loadExamCourses();

    document.getElementById('filterButton').addEventListener('click', fetchScores);
});

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

    fetch(`get_scores.php?courseID=${courseID}&subjectID=${subjectID}&examID=${examID}&examDate=${examDate}`)
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
                `;
                scoreboardBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching scores:', error));
}

function loadExamCourses() {
    fetch('load_courses.php')
        .then(response => response.json())
        .then(data => {
            let courseSelect = document.getElementById('courseCreateExam');
            data.courses.forEach(course => {
                let option = document.createElement('option');
                option.value = course.CourseID;
                option.textContent = course.CourseName;
                courseSelect.appendChild(option);
            });
            M.FormSelect.init(courseSelect);
        });
}

function loadExamSubjects(courseID) {
    fetch('load_subjects.php?courseID=' + courseID)
        .then(response => response.json())
        .then(data => {
            let subjectSelect = document.getElementById('subjectCreateExam');
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

function createExam() {
    let courseID = document.getElementById('courseCreateExam').value;
    let subjectID = document.getElementById('subjectCreateExam').value;
    let examName = document.getElementById('examNameCreateExam').value;
    let examDate = document.getElementById('examDateCreateExam').value;

    let formattedDate = new Date(examDate).toISOString().split('T')[0];

    fetch('createExam.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseID, subjectID, examName, examDate: formattedDate })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.toast({ html: 'Exam created successfully!', classes: 'green' });
        } else {
            M.toast({ html: 'Error creating exam!', classes: 'red' });
        }
    });
}

function showSection(sectionId) {
    var sections = document.querySelectorAll('.section-container');
    sections.forEach(function (section) {
        section.style.display = 'none';
    });

    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    var sidenavInstance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
    if (sidenavInstance.isOpen) {
        sidenavInstance.close();
    }
}
