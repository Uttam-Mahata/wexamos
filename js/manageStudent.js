document.addEventListener('DOMContentLoaded', function() {
    fetchCourses();
    // Initialize materialize select and modals
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);

    var modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);
});

function fetchCourses() {
    fetch('load_courses.php')
        .then(response => response.json())
        .then(data => {
            let courseSelect = document.getElementById('courseSelectUniqueID');
            data.courses.forEach(course => {
                let option = document.createElement('option');
                option.value = course.CourseID;
                option.text = course.CourseName;
                courseSelect.appendChild(option);
            });
            M.FormSelect.init(courseSelect); // Reinitialize materialize select
        })
        .catch(error => console.error('Error fetching courses:', error));
}

function fetchStudentsByCourse() {
    let courseId = document.getElementById('courseSelectUniqueID').value;
    fetch('getStudent.php?course_id=' + courseId)
        .then(response => response.json())
        .then(data => {
            let manageStudentBody = document.getElementById('manageStudentBodyUniqueID');
            manageStudentBody.innerHTML = '';
            data.students.forEach(student => {
                let row = `<tr>
                    <td>${student.StudentName}</td>
                    <td>${student.EmailID}</td>
                    <td>${student.DateOfBirth}</td>
                    <td>
                        <button class="btn waves-effect waves-light blue modal-trigger" href="#editStudentModalUniqueID" onclick="openEditModal(${student.StudentID}, '${student.StudentName}', '${student.EmailID}', '${student.DateOfBirth}')">Edit</button>
                        <button class="btn waves-effect waves-light red modal-trigger" href="#deleteStudentModalUniqueID" onclick="openDeleteModal(${student.StudentID})">Delete</button>
                    </td>
                </tr>`;
                manageStudentBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching students:', error));
}

function openEditModal(id, name, emailID, dob) {
    document.getElementById('editStudentIDUniqueID').value = id;
    document.getElementById('editStudentNameUniqueID').value = name;
    document.getElementById('editFatherNameUniqueID').value = emailID;
    document.getElementById('editDateOfBirthUniqueID').value = dob;
    M.updateTextFields(); // Update text fields to show labels correctly
}

function openDeleteModal(id) {
    document.getElementById('confirmDeleteUniqueID').onclick = function() {
        deleteStudent(id);
    };
}

document.getElementById('editStudentFormUniqueID').onsubmit = function(event) {
    event.preventDefault();
    let studentId = document.getElementById('editStudentIDUniqueID').value;
    let studentName = document.getElementById('editStudentNameUniqueID').value;
    let emailID = document.getElementById('editFatherNameUniqueID').value;
    let dateOfBirth = document.getElementById('editDateOfBirthUniqueID').value;

    fetch('edit_student.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: studentId,
            name: studentName,
            emailID: emailID,
            dob: dateOfBirth
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.Modal.getInstance(document.getElementById('editStudentModalUniqueID')).close();
            fetchStudentsByCourse();
        } else {
            alert('Error editing student');
        }
    })
    .catch(error => console.error('Error editing student:', error));
};

function deleteStudent(studentId) {
    fetch('delete_student.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: studentId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.Modal.getInstance(document.getElementById('deleteStudentModalUniqueID')).close();
            fetchStudentsByCourse();
        } else {
            alert('Error deleting student');
        }
    })
    .catch(error => console.error('Error deleting student:', error));
}
