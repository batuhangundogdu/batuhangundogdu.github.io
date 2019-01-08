<?php
  echo ("i'm in php");
	header('Content-type: application/json');
	$status = array(
		'type'=>'success',
		'message'=>'Thank you for contact us. As early as possible  we will contact you '
  );

  echo ("status -> $status");

    $name = @trim(stripslashes($_POST['name']));
    $email = @trim(stripslashes($_POST['email']));
    $subject = @trim(stripslashes($_POST['subject']));
    $message = @trim(stripslashes($_POST['message']));

    $email_from = $email;
    $email_to = 'info@smggida.com';//replace with your email

    $body = 'Name: ' . $name . "\n\n" . 'Email: ' . $email . "\n\n" . 'Subject: ' . $subject . "\n\n" . 'Message: ' . $message;

    echo ("body -> $body");

    if(@mail($email_to, $subject, $body, 'From: <'.$email_from.'>')) {
      echo ("mail success php");
      echo json_encode($status);
    } else {
      echo ("mail ERROR php");
      echo json_encode(['success'=>false]);
    }
    die;
?>
