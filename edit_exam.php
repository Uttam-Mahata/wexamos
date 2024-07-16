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

$examID = $data['examID'];
$examName = $data['examName'];
$examDate = $data['examDate'];

$sql = "UPDATE Exams SET ExamName = ?, ExamDate = ? WHERE ExamID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $examName, $examDate, $examID);
$success = $stmt->execute();

echo json_encode(['success' => $success]);

$stmt->close();
$conn->close();
?>
