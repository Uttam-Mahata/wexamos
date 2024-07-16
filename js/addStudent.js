document.addEventListener('DOMContentLoaded', function() {
 

    var dateElems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dateElems, {
        format: 'yyyy-mm-dd',
        onSelect: function(date) {
            document.getElementById('dateOfBirth').value = formatDate(date);
        }
    });

    loadCourses();
});

function formatDate(date) {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

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
        .catch(error => console.error('Error loading courses:', error));
}

function addStudent() {
    const studentName = document.getElementById('studentName').value;
    const emailID = document.getElementById('emailID').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const courseID = document.getElementById('courseSelect').value;

    // Date validation
    const today = new Date();
    const dob = new Date(dateOfBirth);
    const minAge = 12;
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    const isValidAge = age > minAge || (age === minAge && (monthDiff > 0 || (monthDiff === 0 && today.getDate() >= dob.getDate())));

    if (isNaN(dob.getTime()) || dob > today || !isValidAge) {
        M.toast({html: 'Invalid date of birth. Student should be at least 12 years old.', classes: 'red'});
        return;
    }

    if (studentName && emailID && dateOfBirth && courseID) {
        fetch('add_student.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentName: studentName,
                emailID: emailID,
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
