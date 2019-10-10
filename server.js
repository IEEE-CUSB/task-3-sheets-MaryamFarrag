var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

const {google} = require('googleapis');
const keys = require('./apisheets.json');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'ieee-mf'
});
var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


client = new google.auth.JWT(
	keys.client_email,
	null,
	keys.private_key,
	['https://www.googleapis.com/auth/spreadsheets'],
   ),

client.authorize(function(err, tokens) {
	if(err) {
		console.log('Error',err);
		return;
	} else {
		console.log('Connected!');
	}
  });

  const gsapi = google.sheets({
	version:'v4',
	auth: client
  });
   

 app.post('/', function(request, response) {
	var name = request.body.name;
	var email = request.body.email;
	var phone = request.body.phoneNumber;
	var uni = request.body.university;
	var faculty = request.body.faculty;
	var acadYear = request.body.academicYear;
	var workshops = request.body.workshop;

	if (name && acadYear &&workshops) {
		connection.query('INSERT INTO `ieee-form`(`name`,`mail`,`phone`,`uni`,`fac`,`academic_year`,`workshops`) VALUES ("'+name+'","'+email+'","'+phone+'","'+uni+'","'+faculty+'","'+acadYear+'","'+workshops+'")', function(error, results, fields) {		
		if(error){
			throw error
		}
		else{
		//	response.send('Your submit is succefully sent. Thank you! :)');
		dataArray = [name, email, phone, uni, faculty, acadYear, workshops[0],workshops[1]];
		const insertData = {
			spreadsheetId: '17RevEMQYRb9ubWihvTTz0LQ7GHr-5phxqQHggyRkpKY',
			range: 'A1',
			valueInputOption: 'USER_ENTERED',
			resource: { values: [dataArray]}
		}
		gsapi.spreadsheets.values.append(insertData);
		console.log("submitted",workshops);
		response.send('Your submit is succefully sent. Thank you! :)');
		}	
		});
	} else
	{
		response.send('Please enter the required fields!');
		response.end();
	} 
}); 

app.listen(3000)

