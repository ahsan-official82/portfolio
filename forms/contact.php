<?php
/**
 * Contact form → Gmail SMTP (PHPMailer).
 * 1) composer install (project root)
 * 2) Copy smtp-config.example.php to smtp-config.php and set credentials
 */

declare(strict_types=1);

header('X-Robots-Tag: noindex');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed';
    exit;
}

$configFile = __DIR__ . '/smtp-config.php';
if (!is_readable($configFile)) {
    echo 'Mail is not configured. Copy forms/smtp-config.example.php to forms/smtp-config.php and run composer install.';
    exit;
}

/** @var array{host:string,username:string,password:string,port:int,encryption:string,to_email:string} $config */
$config = require $configFile;

$autoload = __DIR__ . '/../vendor/autoload.php';
if (!is_readable($autoload)) {
    echo 'Run composer install in the project root to install PHPMailer.';
    exit;
}

require_once $autoload;

use PHPMailer\PHPMailer\Exception as PHPMailerException;
use PHPMailer\PHPMailer\PHPMailer;

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    echo 'Please fill in all fields.';
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo 'Please enter a valid email address.';
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = $config['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['username'];
    $mail->Password = str_replace(' ', '', (string) $config['password']);
    $enc = strtolower((string) ($config['encryption'] ?? 'ssl'));
    $mail->SMTPSecure = $enc === 'tls' ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = (int) $config['port'];

    $mail->setFrom($config['username'], 'Portfolio contact');
    $mail->addAddress($config['to_email']);
    $mail->addReplyTo($email, $name);
    $mail->Subject = '[Portfolio] ' . $subject;
    $mail->Body = "From: {$name} <{$email}>\n\n{$message}";
    $mail->isHTML(false);

    $mail->send();
    echo 'OK';
} catch (PHPMailerException) {
    echo 'Could not send message. Please try again later.';
}
