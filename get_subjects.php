<?php
header('Content-Type: application/json');
include 'db.php'; // Make sure to include your database connection file

if (isset($_GET['courseID'])) {
    $courseID = $_GET['courseID'];

    $conn = openCon(); // Function to open a connection to the database

    $sql = "SELECT SubjectID, SubjectName FROM Subjects WHERE CourseID = '$courseID'";
    $result = $conn->query($sql);

    $subjects = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $subjects[] = $row;
        }
    }

    echo json_encode(['subjects' => $subjects]);
    closeCon($conn); // Function to close the connection to the database
} else {
    echo json_encode(['subjects' => []]);
}
?>
