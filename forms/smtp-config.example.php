<?php
/**
 * Copy this file to smtp-config.php (same folder) and add your Gmail App Password.
 * smtp-config.php is gitignored.
 */
return [
    'host' => 'smtp.gmail.com',
    'username' => 'your.email@gmail.com',
    'password' => 'your-16-char-app-password',
    'port' => 465,
    /** 'ssl' for port 465, or 'tls' with port 587 */
    'encryption' => 'ssl',
    'to_email' => 'ahmer.official92@gmail.com',
];
