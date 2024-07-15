function addStudent() {
    const studentName = document.getElementById('studentName').value;
    const fatherName = document.getElementById('fatherName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const courseID = document.getElementById('courseSelect').value;

    if (studentName && fatherName && dateOfBirth && courseID) {
        fetch('add_student.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentName: studentName,
                fatherName: fatherName,
                dateOfBirth: dateOfBirth,
                courseID: courseID
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                M.toast({html: 'Student added successfully!', classes: 'green'});
            } else {
                M.toast({html: 'Failed to add student. Please try again.', classes: 'red'});
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

// Load courses into the course select dropdown
function loadCourses() {
    fetch('load_courses.php')
    .then(response => response.json())
    .then(data => {
        const courseSelect = document.getElementById('courseSelect');
        courseSelect.innerHTML = '<option value="" disabled selected>Select Course</option>';
        data.courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.CourseID;
            option.textContent = course.CourseName;
            courseSelect.appendChild(option);
        });
        M.FormSelect.init(courseSelect);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Call loadCourses when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
});
