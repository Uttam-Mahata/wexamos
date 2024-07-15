<?php
header('Content-Type: application/json');
include 'database_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['scoreID'])) {
    $scoreID = $data['scoreID'];

    try {
        $sql = "DELETE FROM Scores WHERE ScoreID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $scoreID);

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
