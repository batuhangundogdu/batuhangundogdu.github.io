<?php
	header('Content-type: application/json');
	$status = array(
		'type'=>'success',
		'message'=>'Thank you for contact us. As early as possible  we will contact you '
	);

    $name = @trim(stripslashes($_POST['name']));
    $email = @trim(stripslashes($_POST['email']));
    $subject = @trim(stripslashes($_POST['subject']));
    $message = @trim(stripslashes($_POST['message']));

    $email_from = $email;
    $email_to = 'info@smggida.com';//replace with your email

    $body = 'Name: ' . $name . "\n\n" . 'Email: ' . $email . "\n\n" . 'Subject: ' . $subject . "\n\n" . 'Message: ' . $message;

    $success = @mail($email_to, $subject, $body, 'From: <'.$email_from.'>');

    echo json_encode($status);
    die;

    /*
    <?php
    if(isset($_POST['message'])){
        $to      = 'queries@mydomain.com';
        $subject = $_POST['subject'];
        $message = $_POST['message'];
        $headers = "From: ".$_POST['sender_nam‌​e​']." <".$_POST['sender_em‌​ail‌​'].">\r\n"; $headers = "Reply-To: ".$_POST['sender_ema‌​il‌​']."\r\n";
        $headers = "Content-type: text/html; charset=iso-8859-1\r\n";
        'X-Mailer: PHP/' . phpversion();
        if(mail($to, $subject, $message, $headers)) echo json_encode(['success'=>true]);
        else echo json_encode(['success'=>false]);
        exit;
    }
    ?>
    */
