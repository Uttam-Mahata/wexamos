<?php
$host = 'localhost:3308';
$db = 'wexamos';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

$courseID = $data['courseID'];
$courseName = $data['courseName'];

$sql = "UPDATE Courses SET CourseName = ? WHERE CourseID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $courseName, $courseID);

$response = array();

if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
