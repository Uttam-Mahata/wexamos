<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scoreboard</title>
    <!-- Materialize CSS CDN -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
    <!-- Material Icon -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Moment.js CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <!-- <link rel="stylesheet" href="css/style.css"> -->
</head>

<body>
    <!-- Navbar -->
 <div class="navbar-fixed">
    <nav class="blue darken-3 z-depth-2">
        <div class="nav-wrapper">
            <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
            <a href="#" class="brand-logo">WOES</a>
        </div>
    </nav>
 </div>

    <!-- Sidenav -->
    <ul id="slide-out" class="sidenav">
        <li><a href="#viewScoreboard" class="waves-effect" onclick="showSection('viewScoreboard')"><i class="material-icons">dashboard</i>View Scoreboard</a></li>
        <li><a href="#createExam" class="waves-effect" onclick="showSection('createExam')"><i class="material-icons">create</i>Create Exam</a></li>
        <li><a href="#addStudent" class="waves-effect" onclick="showSection('addStudent')"><i class="material-icons">person_add</i>Add New Student</a></li>
        <li><a href="#addScore" class="waves-effect" onclick="showSection('addScore')"><i class="material-icons">assignment</i>Add Score</a></li>
        <li><a href="#createCourse" class="waves-effect" onclick="showSection('createCourse')"><i class="material-icons">library_books</i>Create New Course</a></li>
        <li><a href="#createSubject" class="waves-effect" onclick="showSection('createSubject')"><i class="material-icons">subject</i>Create New Subject</a></li>
    </ul>

    <!-- Main Content -->
    <div class="container">
        <!-- Scoreboard -->
        <div class="section-container" id="viewScoreboard">
            <div class="dashboard">
                <h4>Winners Exam Scoreboard</h4>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <select id="courseSelectScoreboard" onchange="loadSubjects(this.value, 'subjectSelectScoreboard')">
                            <option value="" disabled selected>Select Course</option>
                        </select>
                        <label>Course Name</label>
                    </div>
                    <div class="input-field col s12 m6">
                        <select id="subjectSelectScoreboard" onchange="loadExams(this.value, 'examSelectScoreboard')">
                            <option value="" disabled selected>Select Subject</option>
                        </select>
                        <label>Subject Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <select id="examSelectScoreboard">
                            <option value="" disabled selected>Select Exam</option>
                        </select>
                        <label>Exam Name</label>
                    </div>
                    <div class="input-field col s12 m6">
                        <input type="text" id="examDateScoreboard" class="datepicker">
                        <label for="examDateScoreboard">Exam Date</label>
                    </div>
                </div>
                <button id="filterButton" class="btn waves-effect waves-light blue darken-2" type="button">Filter
                    <i class="material-icons right">filter_list</i>
                </button>
                <br>
                <div class="scoreboard-table p4">
                    <table class="responsive-table highlight text-center" style="text-align: center;">
                        <div class="row">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Obtained Marks</th>
                                    <th>Full Marks</th>
                                    <th>Father's Name</th>
                                    <th>Date of Birth</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                        </div>
                        <tbody id="scoreboardBody">
                            <!-- Scores will be populated here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Create Exam -->
        <div class="section-container" id="createExam">
            <div class="dashboard">
                <h4>Create Exam</h4>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <select id="courseCreateExam" onchange="loadExamSubjects(this.value)">
                            <option value="" disabled selected>Select Course</option>
                        </select>
                        <label>Course Name</label>
                    </div>
                    <div class="input-field col s12 m6">
                        <select id="subjectCreateExam">
                            <option value="" disabled selected>Select Subject</option>
                        </select>
                        <label>Subject Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <input type="text" id="examNameCreateExam">
                        <label for="examNameCreateExam">Exam Name</label>
                    </div>
                    <div class="input-field col s12 m6">
                        <input type="text" id="examDateCreateExam" class="datepicker">
                        <label for="examDateCreateExam">Exam Date</label>
                    </div>
                </div>
                <button id="createExamButtonCreateExam" class="btn waves-effect waves-light red darken-2" type="button" onclick="createExam()">Create Exam
                    <i class="material-icons right">create</i>
                </button>
            </div>
        </div>

        <!-- Add Student -->
        <div class="section-container" id="addStudent">
            <div class="dashboard">
                <h4>Add New Student</h4>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <input type="text" id="studentName" required>
                        <label for="studentName">Student Name</label>
                    </div>
                    <div class="input-field col s12 m6">
                        <input type="email" id="emailID" required>
                        <label for="emailID">Email ID</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <input type="text" id="dateOfBirth" class="datepicker" required>
                        <label for="dateOfBirth">Date of Birth</label>
                    </div>
                    <div class="input-field col s12 m6">
                        <select id="courseSelect">
                            <option value="" disabled selected>Select Course</option>
                        </select>
                        <label>Course</label>
                    </div>
                </div>
                <button id="addStudentButton" class="btn waves-effect waves-light yellow darken-2" type="button" onclick="addStudent()">Add Student
                    <i class="material-icons right">person_add</i>
                </button>
            </div>
        </div>

        <!-- Add Score -->
        <div class="section-container" id="addScore">
            <div class="dashboard">
                <h4>Add Score</h4>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <select id="courseAddScore" onchange="loadSubjects(this.value, 'subjectAddScore')">
                            <option value="" disabled selected>Select Course</option>
                        </select>
                        <label>Course Name</label>
                    </div>
                    <div class="input-field col s12 m6">
                        <select id="subjectAddScore" onchange="loadExams(this.value, 'examAddScore')">
                            <option value="" disabled selected>Select Subject</option>
                        </select>
                        <label>Subject Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <select id="examAddScore">
                            <option value="" disabled selected>Select Exam</option>
                        </select>
                        <label>Exam Name</label>
                    </div>
                    <div class="input-field col s12 m6">
                        <select id="studentAddScore">
                            <option value="" disabled selected>Select Student</option>
                        </select>
                        <label>Student Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <input type="number" id="obtainedMarksAddScore" required>
                        <label for="obtainedMarksAddScore">Obtained Marks</label>
                    </div>
                    <div class="input-field col s12 m6">
                        <input type="number" id="fullMarksAddScore" required>
                        <label for="fullMarksAddScore">Full Marks</label>
                    </div>
                </div>
                <button id="addScoreButton" class="btn waves-effect waves-light black" type="button" onclick="addScore()">Add Score
                    <i class="material-icons right">assignment</i>
                </button>
            </div>
        </div>

        <!-- Create Course -->
        <div class="section-container" id="createCourse">
            <div class="dashboard">
                <h4>Create New Course</h4>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" id="courseName" required>
                        <label for="courseName">Course Name</label>
                    </div>
                </div>
                <button id="createCourseButton" class="btn waves-effect waves-light blue darken-2" type="button" onclick="createCourse()">Create Course
                    <i class="material-icons right">library_books</i>
                </button>
            </div>
        </div>

        <!-- Create Subject -->
        <div class="section-container" id="createSubject">
            <div class="dashboard">
                <h4>Create New Subject</h4>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <select id="courseSelectCreateSubject">
                            <option value="" disabled selected>Select Course</option>
                        </select>
                        <label>Course Name</label>
                    </div>
                    <div class="input-field col s12 m6">
                        <input type="text" id="subjectName" required>
                        <label for="subjectName">Subject Name</label>
                    </div>
                </div>
                <button id="createSubjectButton" class="btn waves-effect waves-light red darken-2" type="button" onclick="createSubject()">Create Subject
                    <i class="material-icons right">subject</i>
                </button>
            </div>
        </div>

        <!-- Create Subject -->
    </div>

    <!-- Materialize JS and dependencies -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems);

            var selects = document.querySelectorAll('select');
            M.FormSelect.init(selects);

            var datepickers = document.querySelectorAll('.datepicker');
            M.Datepicker.init(datepickers, {
                format: 'yyyy-mm-dd'
            });

            // Show default section
            showSection('viewScoreboard');
        });

        function showSection(sectionId) {
            // Hide all sections
            var sections = document.querySelectorAll('.section-container');
            sections.forEach(function (section) {
                section.style.display = 'none';
            });

            // Show the selected section
            var selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.style.display = 'block';
            }

            // Close the sidenav if it's open
            var sidenavInstance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
            if (sidenavInstance.isOpen) {
                sidenavInstance.close();
            }
        }
    </script>
    <script src="js/viewBoard.js"></script>
    <script src="js/createExam.js"></script>
    <script src="js/addStudent.js"></script>
    <script src="js/addScore.js"></script>
    <script src="js/createCourse.js"></script>
    <script src="js/createSubject.js"></script>
</body>

</html>
