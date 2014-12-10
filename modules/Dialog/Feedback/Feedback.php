<?php
define('__ROOT__', $_SERVER['DOCUMENT_ROOT'] . '/../' . '/quoking.com');
echo __ROOT__;
require_once(__ROOT__.'/config.php');

//Variables ===========================================================
$errors     = array();    // array to hold validation errors
$rows = array();          // sql-rows
$message = '';    // string to hold success message
$sendToEmail ='hello@quoking.com';


if($_SERVER['REQUEST_METHOD']=="POST")
{
  $file = file_get_contents("php://input");
  $data[] = json_decode($file, TRUE);
  $data=$data[0];

    

  //Name
  if(!empty($data['name'])) $name=mysql_real_escape_string($data['name']);
    else $errors['name'] = 'Bitte Namen angeben.';

  //Email
  if(!empty($data['email'])&&filter_var( $data['email'], FILTER_VALIDATE_EMAIL )) $email=mysql_real_escape_string($data['email']);
    else $errors['email'] = 'Keine gültige Emailaddresse angegeben.';

  //If no errors all fields fileld in
  if(count($errors)==0)
    {
      $subject="Feedback Anfrage von ".$email." [Request, Quoking]";
      $body='Hallo Andi, <br/><br/><b>'.$name.'</b> will gerne mit Dir ein Feedbackgespräch haben.<br/><br/>Vielen Dank,<br/>Dein Server';
      $signature='<p style="font-size:small; color:grey;">--<br>Du willst dabei sein wie man Unternehmen aufbaut? Unser Praktikum Startup-Aufbau, Analyse von Förderungen und Anwendung in der Praxis: http://bit.ly/KBBAt0 <br>--Eisbach Solutions UG (haftungsbeschränkt)<br/>St. Anna Str. 12<br/>80538 München<br/>Geschäftsführer: Andreas Geißinger<br/>HRB 179040<br/>Steuernummer: 143/132/82083<br/>Telefon: 089/12196611</p>';

      $headers   = array();
      $headers[] = "MIME-Version: 1.0";
      $headers[] = "Content-type: text/plain; charset=iso-8859-1";
      $headers[] = "From: {$email}";
      $headers[] = "Reply-To: {$email}";
      $headers[] = "Subject: {$subject}";
      $headers[] = "X-Mailer: PHP/".phpversion();

      send_mail($sendToEmail,$subject,$body.$signature, $email);

      //Mail an Nutzer
      $subject="Deine Anfrage an Quoking wurde übermittelt";
      $body='Hallo '.$name.', <br/><br/>Deine Deine Anfrage wurde übermittelt!<br/><br/>Vielen Dank,<br/>Andi CEO von Quoking';
      $signature='<p style="font-size:small; color:grey;">--<br>Du willst dabei sein wie man Unternehmen aufbaut? Unser Praktikum Startup-Aufbau, Analyse von Förderungen und Anwendung in der Praxis: http://bit.ly/KBBAt0 <br>--Eisbach Solutions UG (haftungsbeschränkt)<br/>St. Anna Str. 12<br/>80538 München<br/>Geschäftsführer: Andreas Geißinger<br/>HRB 179040<br/>Steuernummer: 143/132/82083<br/>Telefon: 089/12196611</p>';

      $headers   = array();
      $headers[] = "MIME-Version: 1.0";
      $headers[] = "Content-type: text/plain; charset=iso-8859-1";
      $headers[] = "From: {$email}";
      $headers[] = "Reply-To: {$email}";
      $headers[] = "Subject: {$subject}";
      $headers[] = "X-Mailer: PHP/".phpversion();

      send_mail($email,$subject,$body.$signature, $sendToEmail);
      $rows['feedback']='Feedbackrequest sent';

    }
  echo return_sql2json($errors, $rows);
}
?>