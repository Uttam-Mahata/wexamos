
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);

        var dateElems = document.querySelectorAll('.datepicker');
        M.Datepicker.init(dateElems);

        loadExamCourses();
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

        fetch('createExam.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({courseID, subjectID, examName, examDate})
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                M.toast({html: 'Exam created successfully!', classes: 'green'});
            } else {
                M.toast({html: 'Error creating exam!', classes: 'red'});
            }
        });
    }
