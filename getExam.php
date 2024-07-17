
<?php
require 'db.php';

$subjectID = $_GET['subjectID'];

$sql = "SELECT * FROM exams WHERE SubjectID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $subjectID);
$stmt->execute();
$result = $stmt->get_result();

$exams = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $exams[] = $row;
    }
}

echo json_encode($exams);
?>
