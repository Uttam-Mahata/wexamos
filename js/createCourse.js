function createCourse() {
    const courseName = document.getElementById('courseName').value;
    
    if (courseName) {
        fetch('createCourse.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `courseName=${courseName}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                M.toast({html: 'Course created successfully!', classes: 'green'});
                loadCourses(); // Reload courses to update the dropdowns
            } else {
                M.toast({html: 'Failed to create course.', classes: 'red'});
            }
        })
        .catch(error => {
            console.error('Error:', error);
            M.toast({html: 'An error occurred.', classes: 'red'});
        });
    } else {
        M.toast({html: 'Please enter a course name.', classes: 'red'});
    }
}