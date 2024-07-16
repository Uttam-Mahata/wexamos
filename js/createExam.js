document.addEventListener('DOMContentLoaded', function() {
   

    var dateElems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dateElems, {
        format: 'yyyy-mm-dd',
        autoClose: true
    });

    loadCourses();
    loadExamCourses();

    document.getElementById('filterButton').addEventListener('click', fetchScores);
});





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
