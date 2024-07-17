<?php
require 'db.php';

$subject_id = $_GET['subject_id'];

$sql = "SELECT ExamID, ExamName, ExamDate, SubjectName FROM exams WHERE SubjectID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $subject_id);
$stmt->execute();
$result = $stmt->get_result();

$exams = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $exams[] = $row;
    }
}

echo json_encode(['exams' => $exams]);
?>
