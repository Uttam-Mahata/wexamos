<?php
// create_exam.php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "Connection failed: " . $conn->connect_error)));
}

// Check if required data is received
if (isset($_POST['CourseID']) && isset($_POST['SubjectID']) && isset($_POST['ExamName']) && isset($_POST['ExamDate'])) {
    $courseID = $_POST['CourseID'];
    $subjectID = $_POST['SubjectID'];
    $examName = $_POST['ExamName'];
    $examDate = $_POST['ExamDate'];

    $stmt = $conn->prepare("INSERT INTO exams (SubjectID, ExamName, ExamDate) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $subjectID, $examName, $examDate);

    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Exam created successfully!"));
    } else {
        echo json_encode(array("success" => false, "message" => "Failed to create exam!"));
    }

    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Invalid input data!"));
}

$conn->close();
?>
