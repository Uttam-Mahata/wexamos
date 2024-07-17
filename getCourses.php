<?php
require 'db_connection.php';

$sql = "SELECT CourseID, CourseName FROM courses";
$result = $conn->query($sql);

$courses = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
}

echo json_encode($courses);
?>
