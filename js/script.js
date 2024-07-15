document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();

    // ... Event listeners for form submissions (addStudentButton, etc.)

    // Initial Data Loading
    loadCourses(); 
    loadCoursesForCreateExam();
    // ... Load courses for other sections similarly 

    // Event listeners for Course dropdowns (to load Subjects)
    const courseSelects = document.querySelectorAll('[id^="course"]'); 
    courseSelects.forEach(select => {
        select.addEventListener('change', function() {
            const courseID = this.value;
            loadSubjects(courseID); 
        });
    });

    // Event listeners for Subject dropdowns (to load Exams)
    const subjectSelects = document.querySelectorAll('[id^="subject"]');
    subjectSelects.forEach(select => {
        select.addEventListener('change', function() {
            const subjectID = this.value;
            loadExams(subjectID); 
        });
    });


    // ... (Similar logic to Course dropdowns) 

    document.getElementById('filterButton').addEventListener('click', fetchScores); 
});

// ... (Your fetchScores() function)

// --- Dropdown Population Functions ---
function populateDropdown(dropdownId, data, placeholderText) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = `<option value="" disabled selected>${placeholderText}</option>`;
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.CourseID || item.SubjectID || item.ExamID; // Dynamically set value
        option.text = item.CourseName || item.SubjectName || item.ExamName; // Dynamically set text
        dropdown.appendChild(option);
    });
    M.FormSelect.init(dropdown); 
}

// Example usage (you'll use this in your data fetching functions)
populateDropdown('course', coursesData, 'Select Course');
populateDropdown('subject', subjectsData, 'Select Subject');
populateDropdown('exam', examsData, 'Select Exam');

function loadCourses() {
    // ... (Implementation from Step 2)
}

function loadCoursesForCreateExam() {
    // ... (Implementation from Step 2)
}

function loadSubjects(courseID) { 
    // ... (Implementation similar to loadCourses, targets correct Subject dropdown)
}

function loadExams(subjectID) { 
    // ... (Implementation similar to loadCourses, targets correct Exam dropdown)
}

// ... (Rest of your existing JavaScript code) 