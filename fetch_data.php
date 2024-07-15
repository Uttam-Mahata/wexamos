<?php
include 'db.php';

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $response = [];

    if ($action == 'fetchCourses') {
        $sql = "SELECT * FROM courses";
        $result = $conn->query($sql);
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
    } elseif ($action == 'fetchSubjects') {
        $courseID = $_POST['courseID'];
        $sql = "SELECT * FROM subjects WHERE CourseID = $courseID";
        $result = $conn->query($sql);
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
    } elseif ($action == 'fetchExams') {
        $subjectID = $_POST['subjectID'];
        $sql = "SELECT * FROM exams WHERE SubjectID = $subjectID";
        $result = $conn->query($sql);
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
    } elseif ($action == 'fetchStudents') {
        $sql = "SELECT * FROM students";
        $result = $conn->query($sql);
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
    }

    echo json_encode($response);
}
?>
