<?php
$host = 'localhost:3308';
$db = 'wexamos';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$limit = $_GET['limit'];
$offset = $_GET['offset'];

$sql = "SELECT Exams.ExamID, Subjects.SubjectName, Exams.ExamName, Exams.ExamDate 
        FROM Exams 
        JOIN Subjects ON Exams.SubjectID = Subjects.SubjectID 
        LIMIT ? OFFSET ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $limit, $offset);
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
