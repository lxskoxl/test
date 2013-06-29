/**
*   File: lotameTest.js
*   Author: Scott Ko
*   Date: 6/29/2013
**/

/* Global Vars */
var username = "scottkko@gmail.com";
var password = "lotametest62913";
var baseURL = "https://api.lotame.com/";
var token = "";

/* Function to sort by uniques count */
function sortByUniques (x, y) {
    return (y.uniques - x.uniques);
}

/* Calls php file to get the access token */
function getToken() {
    $.ajax({
        type: "POST",
        url: "php/getToken.php",
        data: {username:username, password:password, url:baseURL},
        success: function(data) {
            token = data;
        }
    });
}

/* Calls php file to get json response for top audiences */
function getAudiences() {
	$.ajax({
        type: "POST",
        url: "php/getAudience.php",
        data: {token:token},
        success: function(data) {
        	try {
        		jsonData = JSON.parse(data);
            	var arr = jsonData.stat;
            	// Sorting by unique counts in case the return ever comes back in a different sorted order
            	arr.sort(sortByUniques);
            	// Setting up the table and the headers
            	var str = "<table id=\"myTable\" class=\"tablesorter\"><thead><tr><th>#</th>";
				str += "<th>Audience Name</th>";
				str += "<th>Audience Targeting Code</th>";
				str += "<th>Page Views</th>";
				str += "<th>Uniques</th>";
            	str += "</tr></thead><tbody>";

                // Grabbing only wanted fields from each entry
            	for( var i = 0; i < 20; i++ ) {
                	str += "<tr><td>" + parseInt(i + 1) + "</td>";
					str += "<td>" + arr[i].audienceName + "</td>";
					str += "<td>" + arr[i].audienceTargetingCode + "</td>";
					str += "<td>" + arr[i].pageViews + "</td>";
					str += "<td>" + arr[i].uniques + "</td>";
                	str += "</tr>";
            	};
            	str += "</tbody></table>";
            	document.getElementById("audienceTable").innerHTML = str;
            	// Table sorter is an open source table that implements sorting by column and a clean view
            	// http://tablesorter.com/docs/
            	$("table").tablesorter({debug: false});
            
        	} catch (e) {
        	    // There was a problem.
        		console.log("ERROR: " + data);
        	}
    	}
    });
}

