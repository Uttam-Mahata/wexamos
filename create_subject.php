<?php
$servername = "localhost:3308";
$username = "root";
$password = "";
$dbname = "wexamos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$courseID = $_GET['courseID'];
$subjectName = $_GET['subjectName'];

$sql = "INSERT INTO Subjects (CourseID, SubjectName) VALUES ('$courseID', '$subjectName')";

if ($conn->query($sql) === TRUE) {
    echo "New subject created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
