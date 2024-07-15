<?php
header('Content-Type: application/json');
include 'database_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['scoreID']) && isset($data['obtainedMarks']) && isset($data['fullMarks'])) {
    $scoreID = $data['scoreID'];
    $obtainedMarks = $data['obtainedMarks'];
    $fullMarks = $data['fullMarks'];

    try {
        $sql = "UPDATE Scores SET ObtainedMarks = ?, FullMarks = ? WHERE ScoreID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('iii', $obtainedMarks, $fullMarks, $scoreID);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            throw new Exception("Error executing query");
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
}
?>
