<?php
header('Content-Type: application/json');

// Database connection
$host = 'localhost:3308';
$db = 'wexamos';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(array('success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error)));
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['courseID']) && isset($data['subjectID']) && isset($data['examID']) && isset($data['examDate'])) {
    $courseID = $data['courseID'];
    $subjectID = $data['subjectID'];
    $examID = $data['examID'];
    $examDate = $data['examDate'];

    $sql = "
        SELECT students.StudentName, students.FatherName, students.DateOfBirth, scores.ObtainedMarks, scores.FullMarks
        FROM scores
        JOIN students ON scores.StudentID = students.StudentID
        JOIN exams ON scores.ExamID = exams.ExamID
        WHERE exams.ExamID = ? AND exams.SubjectID = ? AND exams.ExamDate = ?
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iis", $examID, $subjectID, $examDate);
    $stmt->execute();
    $result = $stmt->get_result();

    $scores = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $scores[] = $row;
        }
        echo json_encode(array('success' => true, 'scores' => $scores));
    } else {
        echo json_encode(array('success' => false, 'message' => 'No scores found.'));
    }

    $stmt->close();
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid input.'));
}

$conn->close();
?>
