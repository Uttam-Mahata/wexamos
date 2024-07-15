<?php

include_once('db.php');

// Function to sanitize input
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Create table if it does not exist
$createTableQuery = "
CREATE TABLE IF NOT EXISTS adminlogin (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    adminname VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
)";
if ($conn->query($createTableQuery) === FALSE) {
    echo "Error creating table: " . $conn->error;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $adminname = test_input($_POST["adminname"]);
    $password = test_input($_POST["password"]);

    // Hash the password before comparing with database
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("SELECT * FROM adminlogin WHERE adminname = ?");
    $stmt->bind_param('s', $adminname);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        session_start();
        $_SESSION['Adminusername'] = $adminname;
        $_SESSION['start'] = time();
        $_SESSION['expire'] = $_SESSION['start'] + (15 * 60);
        echo json_encode(['success' => true, 'message' => 'Login successful. Redirecting...']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password. Please try again.']);
    }
    exit();
}

?>
