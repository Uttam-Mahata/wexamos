document.addEventListener('DOMContentLoaded', function() {
    

    loadManageCourses();

    document.getElementById('saveAddCourseButton').addEventListener('click', saveAddCourse);
    document.getElementById('saveEditCourseButton').addEventListener('click', saveEditCourse);
    document.getElementById('confirmDeleteCourseButton').addEventListener('click', deleteCourse);
});

function loadManageCourses() {
    fetch('load_courses.php')
        .then(response => response.json())
        .then(data => {
            let courseBody = document.getElementById('manageCourseBody');
            courseBody.innerHTML = '';
            data.courses.forEach(course => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${course.CourseName}</td>
                    <td>
                        <button class="btn blue darken-2 waves-effect waves-light" onclick="showEditCourseModal(${course.CourseID}, '${course.CourseName}')"><i class="material-icons">edit</i></button>
                        <button class="btn red darken-2 waves-effect waves-light" onclick="showDeleteCourseModal(${course.CourseID})"><i class="material-icons">delete</i></button>
                    </td>
                `;
                courseBody.appendChild(row);
            });
        });
}

function showAddCourseModal() {
    let modal = M.Modal.getInstance(document.getElementById('addCourseModal'));
    modal.open();
}

function saveAddCourse() {
    let courseName = document.getElementById('newCourseName').value;

    fetch('add_course.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseName })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.toast({ html: 'Course added successfully!', classes: 'green' });
            loadManageCourses();
        } else {
            M.toast({ html: 'Error adding course!', classes: 'red' });
        }
    });

    let modal = M.Modal.getInstance(document.getElementById('addCourseModal'));
    modal.close();
}

function showEditCourseModal(courseID, courseName) {
    document.getElementById('editCourseName').value = courseName;
    document.getElementById('saveEditCourseButton').setAttribute('data-courseid', courseID);

    let modal = M.Modal.getInstance(document.getElementById('editCourseModal'));
    modal.open();
}

function saveEditCourse() {
    let courseID = document.getElementById('saveEditCourseButton').getAttribute('data-courseid');
    let courseName = document.getElementById('editCourseName').value;

    fetch('edit_course.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseID, courseName })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.toast({ html: 'Course edited successfully!', classes: 'green' });
            loadManageCourses();
        } else {
            M.toast({ html: 'Error editing course!', classes: 'red' });
        }
    });

    let modal = M.Modal.getInstance(document.getElementById('editCourseModal'));
    modal.close();
}

function showDeleteCourseModal(courseID) {
    document.getElementById('confirmDeleteCourseButton').setAttribute('data-courseid', courseID);

    let modal = M.Modal.getInstance(document.getElementById('deleteCourseModal'));
    modal.open();
}

function deleteCourse() {
    let courseID = document.getElementById('confirmDeleteCourseButton').getAttribute('data-courseid');

    fetch('delete_course.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseID })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.toast({ html: 'Course deleted successfully!', classes: 'green' });
            loadManageCourses();
        } else {
            M.toast({ html: 'Error deleting course!', classes: 'red' });
        }
    });

    let modal = M.Modal.getInstance(document.getElementById('deleteCourseModal'));
    modal.close();
}