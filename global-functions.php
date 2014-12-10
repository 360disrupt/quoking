<?php 
//Global Functions

//Send emails
function send_mail($to,$subject,$body,$from)
  {
  /*Emails*/
  require_once(__ROOT__.'/modules/PHPMailer/class.phpmailer.php');
  // $from       = "hallo@360-disrupt.de";
  $mail       = new PHPMailer();
  $mail->CharSet = 'utf-8';
  $mail->IsSMTP(true);            // use SMTP
  $mail->IsHTML(true);
  $mail->SMTPAuth   = true;                  // enable SMTP authentication
  $mail->Host       = "tls://smtp.grus.uberspace.de"; // SMTP host
  $mail->Port       =  587;                    // set the SMTP port
  $mail->Username   = "hallo@360-disrupt.de";  // SMTP  username
  $mail->Password   = "DonkeyMonkey123";  // SMTP password
  $mail->SetFrom($from, 'From 360-Disrupt');
  $mail->AddReplyTo($from,'360-Disrupt:'.$from);
  $mail->Subject    = $subject;
  $mail->MsgHTML($body);
  $address = $to;
  $mail->AddAddress($address, $to);
  $mail->Send();
  };

//Jsonify Result
function return_sql2json($errors, $rows){
  $data       = array();    // array to pass back data
  // response if there are errors
  if ( ! empty($errors)) {

    // if there are items in our errors array, return those errors
    $data['success'] = false;
    $data['errors']  = $errors;
  }
  else {

    // if there are no errors, return a message
    $data['success'] = true;
    $data['entries'] = $rows;
  }

  // return all our data to an AJAX call
  return json_encode($data);
  };


 function isJson($string) {
 	json_decode($string);
 	return (json_last_error() == JSON_ERROR_NONE);
};
?>