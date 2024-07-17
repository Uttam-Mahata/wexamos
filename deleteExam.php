<?php
require 'db.php';

$examID = $_POST['examID'];

$sql = "DELETE FROM exams WHERE ExamID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $examID);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "failure"]);
}
?>
