<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));
$student_id = $data->id;
$student_name = $data->name;
$email_id = $data->emailID;
$date_of_birth = $data->dob;

$sql = "UPDATE students SET StudentName = ?, EmailID = ?, DateOfBirth = ? WHERE StudentID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $student_name, $email_id, $date_of_birth, $student_id);

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
