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

$sql = "DELETE FROM Courses WHERE CourseID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $courseID);
$success = $stmt->execute();

echo json_encode(['success' => $success]);

$stmt->close();
$conn->close();
?>
