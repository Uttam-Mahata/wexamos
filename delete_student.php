<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));
$student_id = $data->id;

$sql = "DELETE FROM students WHERE StudentID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $student_id);

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
