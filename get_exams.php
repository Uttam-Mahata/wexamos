<?php
header('Content-Type: application/json');
include 'db.php'; // Make sure to include your database connection file

if (isset($_GET['subjectID'])) {
    $subjectID = $_GET['subjectID'];

    $conn = openCon(); // Function to open a connection to the database

    $sql = "SELECT ExamID, ExamName FROM exams WHERE SubjectID = '$subjectID'";
    $result = $conn->query($sql);

    $exams = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $exams[] = $row;
        }
    }

    echo json_encode(['exams' => $exams]);
    closeCon($conn); // Function to close the connection to the database
} else {
    echo json_encode(['exams' => []]);
}
?>
