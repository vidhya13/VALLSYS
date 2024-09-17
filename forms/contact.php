<?php

/**
 * Requires the "PHP Email Form" library
 * The "PHP Email Form" library is available only in the pro version of the template
 * The library should be uploaded to: vendor/php-email-form/php-email-form.php
 * For more info and help: https://bootstrapmade.com/php-email-form/
 */

// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'vidhyaramasamy13@gmail.com';

// if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
//   include($php_email_form);
// } else {
//    die('Unable to load the "PHP Email Form" Library!');
// }

// $contact = new PHP_Email_Form;
// $contact->ajax = true;

// $contact->to = $receiving_email_address;
// $contact->from_name = $_POST['name'];
// $contact->from_email = $_POST['email'];
// $contact->subject = $_POST['subject'];

$con = new mysqli('localhost', 'root', '', 'valldb');

// Check connection
if ($con->connect_error) {
  die("Connection failed: " . $con->connect_error);
}
$name = isset($_POST['name']) ? $con->real_escape_string($_POST['name']) : '';
$email = isset($_POST['email']) ? $con->real_escape_string($_POST['email']) : '';
$subject = isset($_POST['subject']) ? $con->real_escape_string($_POST['subject']) : '';
$message = isset($_POST['message']) ? $con->real_escape_string($_POST['message']) : '';
$query = "INSERT INTO `contact`(`name`, `email`, `subject`, `message`) 
VALUES ('$name', '$email','$subject','$message')";
$stmt = $conn->prepare("SELECT COUNT(*) FROM contact WHERE email = ?");
$stmt->bind_param("s", $email);  // "s" denotes the type of the parameter, which is a string

// Execute the statement
$stmt->execute();

// Bind the result to a variable
$stmt->bind_result($count);

// Fetch the result
$stmt->fetch();

// Check if the email exists
if ($count > 0) {
  //echo "Email already exists.";
} else {
  if ($con->query($query) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $query . "<br>" . $con->error;
  }
}

// Close the statement and connection
$stmt->close();


// Close the connection
$con->close();

// Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
/*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

// $contact->add_message($_POST['name'], 'From');
// $contact->add_message($_POST['email'], 'Email');
// $contact->add_message($_POST['message'], 'Message', 10);

// echo $contact->send();
