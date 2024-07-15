document.addEventListener('DOMContentLoaded', function() {
    loadCourses();

    document.getElementById('filterButton').addEventListener('click', fetchScores);



});

function loadCourses() {
    fetch('load_courses.php')
    .then(response => response.json())
    .then(data => {
        const courseSelectScoreboard = document.getElementById('courseSelectScoreboard');

        [courseSelectScoreboard].forEach(select => {
            select.innerHTML = '<option value="" disabled selected>Select Course</option>';
            data.courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.CourseID;
                option.textContent = course.CourseName;
                select.appendChild(option);
            });
            M.FormSelect.init(select);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
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
    .catch(error => {
        console.error('Error:', error);
    });
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
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchScores() {
    const courseID = document.getElementById('courseSelectScoreboard').value;
    const subjectID = document.getElementById('subjectSelectScoreboard').value;
    const examID = document.getElementById('examSelectScoreboard').value;
    const examDateRaw = document.getElementById('examDateScoreboard').value;
    
    if (!courseID || !subjectID || !examID || !examDateRaw) {
        M.toast({html: 'Please fill in all fields!', classes: 'rounded'});
        return;
    }

    // Format date to yyyy-mm-dd
    const examDate = moment(examDateRaw, 'MMM DD, YYYY').format('YYYY-MM-DD');

    fetch(`get_scores.php?courseID=${courseID}&subjectID=${subjectID}&examID=${examID}&examDate=${examDate}`)
        .then(response => response.json())
        .then(data => {
            console.log('Scores:', data); // Debug log
            const scoreboardBody = document.getElementById('scoreboardBody');
            scoreboardBody.innerHTML = '';
            data.scores.forEach(score => {
                const percentage = (score.ObtainedMarks / score.FullMarks) * 100;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${score.StudentName}</td>

                    <td>${score.ObtainedMarks}</td>
                    <td>${score.FullMarks}</td>
                    <td>${score.FatherName}</td>
                    <td>${score.DateOfBirth}</td>
                    <td>${percentage.toFixed(2)}%</td>

                `;
                scoreboardBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching scores:', error)); // Error log
}
