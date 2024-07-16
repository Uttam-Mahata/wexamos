<?php
$host = 'localhost:3308';
$db = 'wexamos';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$subjectID = $_GET['subjectID'];

$sql = "SELECT ExamID, ExamName, ExamDate FROM Exams WHERE SubjectID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $subjectID);
$stmt->execute();
$result = $stmt->get_result();

$exams = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $exams[] = $row;
    }
}

echo json_encode(['exams' => $exams]);

$stmt->close();
$conn->close();
?>
