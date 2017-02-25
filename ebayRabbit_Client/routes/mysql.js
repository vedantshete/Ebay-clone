var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'ebay',
	    port	 : 3306
	});
	return connection;
}


function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

exports.fetchData=fetchData;

exports.storeData = function (callback, sqlQuery) {
    console.log("data storing");
    connection = getConnection();
    connection.query(sqlQuery, function (err, results) {
        if(err){
            console.log("Error: "+err);
            callback(err,results);
        }else{
            console.log("\nConnection released:"+results);
            console.log("Query Success");
            callback(err,results);
        }
    });
    connection.end();

}
