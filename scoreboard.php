<?php
$host = 'localhost:3308';
$db = 'wexamos';
$user = 'root';
$pass = '';

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'get_courses':
        getCourses($pdo);
        break;
    case 'get_subjects':
        getSubjects($pdo);
        break;
    case 'get_exams':
        getExams($pdo);
        break;
    case 'get_scores':
        getScores($pdo);
        break;
    default:
        echo json_encode(['error' => 'Invalid action']);
        break;
}

function getCourses($pdo) {
    $stmt = $pdo->query('SELECT * FROM courses');
    $courses = $stmt->fetchAll();
    echo json_encode(['courses' => $courses]);
}

function getSubjects($pdo) {
    $course_id = $_GET['course_id'] ?? '';
    $stmt = $pdo->prepare('SELECT * FROM subjects WHERE course_id = ?');
    $stmt->execute([$course_id]);
    $subjects = $stmt->fetchAll();
    echo json_encode(['subjects' => $subjects]);
}

function getExams($pdo) {
    $subject_id = $_GET['subject_id'] ?? '';
    $stmt = $pdo->prepare('SELECT * FROM exams WHERE subject_id = ?');
    $stmt->execute([$subject_id]);
    $exams = $stmt->fetchAll();
    echo json_encode(['exams' => $exams]);
}

function getScores($pdo) {
    $exam_id = $_GET['exam_id'] ?? '';
    $exam_date = $_GET['exam_date'] ?? '';
    $stmt = $pdo->prepare('
        SELECT students.student_name, scores.full_marks, scores.obtained_marks 
        FROM scores 
        JOIN students ON scores.student_id = students.student_id 
        JOIN exams ON scores.exam_id = exams.exam_id 
        WHERE scores.exam_id = ? AND exams.exam_date = ?
    ');
    $stmt->execute([$exam_id, $exam_date]);
    $scores = $stmt->fetchAll();
    echo json_encode(['scores' => $scores]);
}
?>
