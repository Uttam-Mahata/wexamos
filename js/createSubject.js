document.addEventListener('DOMContentLoaded', function() {
    loadCourses(); // Load courses when the document is ready
    
});

function loadCourses() {
    fetch('load_courses.php')
    .then(response => response.json())
    .then(data => {
        const courseSelects = document.querySelectorAll('select[id^="course"]');
        courseSelects.forEach(select => {
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

function createSubject() {
    const courseID = document.getElementById('courseSelectCreateSubject').value;
    const subjectName = document.getElementById('subjectName').value;

    if (courseID && subjectName) {
        fetch('createSubject.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `courseID=${courseID}&subjectName=${subjectName}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                M.toast({html: 'Subject created successfully!', classes: 'green'});
                // Optionally reload subjects or reset form
            } else {
                M.toast({html: 'Failed to create subject.', classes: 'red'});
            }
        })
        .catch(error => {
            console.error('Error:', error);
            M.toast({html: 'An error occurred.', classes: 'red'});
        });
    } else {
        M.toast({html: 'Please select a course and enter a subject name.', classes: 'red'});
    }
}
