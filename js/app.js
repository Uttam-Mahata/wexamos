document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
  
   

    document.getElementById('filterButton').addEventListener('click', fetchScores);


    loadCourses();


});

function loadCourses() {
    fetch('load_courses.php')
        .then(response => response.json())
        .then(data => {
            console.log('Courses:', data); // Debug log
            const courseSelect = document.getElementById('course');
            data.courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.CourseID;
                option.text = course.CourseName;
                courseSelect.appendChild(option);
            });
            M.FormSelect.init(courseSelect);
        })
        .catch(error => console.error('Error loading courses:', error)); // Error log
}

function loadSubjects(courseID) {
    fetch(`load_subjects.php?courseID=${courseID}`)
        .then(response => response.json())
        .then(data => {
            console.log('Subjects:', data); // Debug log
            const subjectSelect = document.getElementById('subject');
            subjectSelect.innerHTML = '<option value="" disabled selected>Select Subject</option>';
            data.subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.SubjectID;
                option.text = subject.SubjectName;
                subjectSelect.appendChild(option);
            });
            M.FormSelect.init(subjectSelect);
        })
        .catch(error => console.error('Error loading subjects:', error)); // Error log
}

function loadExams(subjectID) {
    fetch(`load_exams.php?subjectID=${subjectID}`)
        .then(response => response.json())
        .then(data => {
            console.log('Exams:', data); // Debug log
            const examSelect = document.getElementById('exam');
            examSelect.innerHTML = '<option value="" disabled selected>Select Exam</option>';
            data.exams.forEach(exam => {
                const option = document.createElement('option');
                option.value = exam.ExamID;
                option.text = exam.ExamName;
                examSelect.appendChild(option);
            });
            M.FormSelect.init(examSelect);
        })
        .catch(error => console.error('Error loading exams:', error)); // Error log
}

function fetchScores() {
    const courseID = document.getElementById('course').value;
    const subjectID = document.getElementById('subject').value;
    const examID = document.getElementById('exam').value;
    const examDateRaw = document.getElementById('examDate').value;
    
    
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

