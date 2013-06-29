<?php
/**
*   File: lotameTest.js
*   Author: Scott Ko
*   Date: 6/29/2013
*   Description: PHP script to get authorization token for lotame's API
**/

// Set variables from POST
$username = $_POST['username'];
$password = $_POST['password'];
$restUrl = $_POST['url'];

// urlencode the arguments
$postargs = 'email='.urlencode($username).'&password='.urlencode($password);

// initialize the curl session
$session = curl_init($restUrl);

// set up our curl options for posting the args
curl_setopt($session, CURLOPT_POST, true);
curl_setopt($session, CURLOPT_POSTFIELDS, $postargs);
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

// run curl, get the token
$token = curl_exec($session);
curl_close($session);

echo ("$token");
?>
