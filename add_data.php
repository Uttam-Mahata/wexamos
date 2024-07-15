<?php
include 'db.php';

if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'addCourse') {
        $courseName = $_POST['courseName'];
        $sql = "INSERT INTO courses (CourseName) VALUES ('$courseName')";
        $conn->query($sql);
    } elseif ($action == 'addSubject') {
        $courseID = $_POST['courseID'];
        $subjectName = $_POST['subjectName'];
        $sql = "INSERT INTO subjects (CourseID, SubjectName) VALUES ($courseID, '$subjectName')";
        $conn->query($sql);
    } elseif ($action == 'addStudent') {
        $studentName = $_POST['studentName'];
        $fatherName = $_POST['fatherName'];
        $dob = $_POST['dob'];
        $sql = "INSERT INTO students (StudentName, FatherName, DateOfBirth) VALUES ('$studentName', '$fatherName', '$dob')";
        $conn->query($sql);
    } elseif ($action == 'addExam') {
        $subjectID = $_POST['subjectID'];
        $examName = $_POST['examName'];
        $examDate = $_POST['examDate'];
        $sql = "INSERT INTO exams (SubjectID, ExamName, ExamDate) VALUES ($subjectID, '$examName', '$examDate')";
        $conn->query($sql);
    } elseif ($action == 'addScore') {
        $studentID = $_POST['studentID'];
        $examID = $_POST['examID'];
        $obtainedMarks = $_POST['obtainedMarks'];
        $fullMarks = $_POST['fullMarks'];
        $sql = "INSERT INTO scores (StudentID, ExamID, ObtainedMarks, FullMarks) VALUES ($studentID, $examID, $obtainedMarks, $fullMarks)";
        $conn->query($sql);
    }
}
?>
