<?php
/**
*   File: getAudience.php
*   Author: Scott Ko
*   Date: 6/29/2013
*   Description: PHP script to make a curl call to get a json response from lotame's topAudiences rest call
**/
// set our REST url to get what we want, in this case an audience list
$restUrl = "https://api.lotame.com/audstats/reports/topAudiences";

// Initiate the session with the new end point
$session = curl_init($restUrl);

// Add the token to the header
$token = $_POST['token'];
curl_setopt($session,CURLOPT_HTTPHEADER,array("Authorization: $token","Accept: application/json"));
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

// Make the request
$jsonResponse = curl_exec($session);

echo ($jsonResponse);
?>