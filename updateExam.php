<?php
require 'db.php';

$examId = $_POST['examID'];
$examName = $_POST['examName'];
$examDate = $_POST['examDate'];
$fullMarks = $_POST['fullMarks'];
$obtainedMarks = $_POST['obtainedMarks'];

$sql = "UPDATE exams SET ExamName = ?, ExamDate = ? WHERE ExamID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssdii', $examName, $examDate, $examId);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "failure"]);
}
?>
