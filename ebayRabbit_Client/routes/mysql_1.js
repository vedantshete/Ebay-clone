var ejs= require('ejs');
var mysql = require('mysql');
var log = require('./log');

var pool = [];
var count = 0;
var queue = [];

var queueMap = new Map();

var pools = 50;
var queues = 10;

function CreateConnectionPool() {
	for (var i = 0; i < pools; i++) {
		var connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'ebay'
		});
		pool.push(connection);
	}
}


function getConnection(callback) {


	if (isConnectionFree()) {
		callback(pool.pop());

	} else {

		if (isQueueFree()) {

			queue.push(count);
			queueMap.set(count, false);
			var temp = count;
			count++;
		} else {
			return null;
		}
	}
}


function releaseConnection(connection) {

	pool.push(connection);
	queueMap.set(queue.pop(), true);
	queue.shift();

}

function isConnectionFree() {

	if (pool.length <= 0)
		return false;
	else
		return true;

}

function isQueueFree() {

	if (queue.length >= queues)
		return false;
	else
		return true;
}


function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);

    connectionPool.getConnection(function (err,connection)
    {
        if(err)
        {
            throw err;
        }
        else
        {
            connection.query(sqlQuery, function(error, result) {
                if(error){
                    console.log("ERROR: " + error.message);
                }
                else
                {	// return err or result
                    console.log("DB Results:"+result);
                    callback(err, result);
                }
            });
            connection.release();
        }
    });
}	

exports.fetchData=fetchData;

exports.storeData = function (callback, sqlQuery) {
    console.log("data storing");
    connectionPool.getConnection(function (err,connection)
    	    {
    	        if(err)
    	        {
    	            throw err;
    	        }
    	        else
    	        {
    	            connection.query(sqlQuery, function(error, result) {
    	                if(error){
    	                    console.log("ERROR: " + error.message);
    	                }
    	                else
    	                {	// return err or result
    	                    console.log("DB Results:"+result);
    	                    callback(err, result);
    	                }
    	            });
    	            connection.release();
    	        }
    	    });
  
    connection.end();

}

exports.CreateConnectionPool = CreateConnectionPool;
exports.getConnection = getConnection;
exports.releaseConnection = releaseConnection;
