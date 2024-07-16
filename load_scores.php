<?php
$host = 'localhost:3308';
$db = 'wexamos';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$courseID = $_GET['courseID'];
$subjectID = $_GET['subjectID'];
$examID = $_GET['examID'];
$examDate = $_GET['examDate'];

$sql = "SELECT Scores.ScoreID, Students.StudentName, Students.EmailID, Students.DateOfBirth, Scores.ObtainedMarks, Scores.FullMarks
        FROM Scores
        JOIN Students ON Scores.StudentID = Students.StudentID
        JOIN Exams ON Scores.ExamID = Exams.ExamID
        WHERE Exams.ExamID = ? AND Exams.SubjectID = ? AND Exams.ExamDate = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iis", $examID, $subjectID, $examDate);
$stmt->execute();
$result = $stmt->get_result();

$scores = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $scores[] = $row;
    }
}

echo json_encode(['scores' => $scores]);

$stmt->close();
$conn->close();
?>
