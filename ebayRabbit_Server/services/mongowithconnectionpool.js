var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;



var numberOfConnection = 50;
var cntn;
var cntnStack = [];
var cntnQueue = [];
var url = "mongodb://localhost:27017/user";
//------------------------

var createConnectionPool = function(numberOfConnection){
    var conn;
    console.log("creating my own connection");

    for(var count=0; count < numberOfConnection; count++){
        //console.log("creating my own connection");


        MongoClient.connect(url, function(err, _db){
            if (err) { throw new Error('Could not connect: '+err); }
            db = _db;
            connected = true;
            console.log(connected +" is connected to mongo.");
            cntnStack.push(db);
        });
    }
}

var getConnection = function(callback){
    console.log("inside getConnection logic!");

    if(cntnStack.length > 0){
        console.log("Length of cntnStack in getConnection before pop: "+ cntnStack.length)
        connection = cntnStack.pop();

        console.log("Length of cntnStack in getConnection after pop: "+ cntnStack.length)
        callback(null, connection);
    }
    else{
        console.log("Length of queue in getConnection method before push queue: "+ cntnQueue.length)
        cntnQueue.push(callback);
        console.log("Length of queue in getConnection method after push queue: "+ cntnQueue.length)
    }
}


setInterval(function(){
    console.log('inside setInterval')
    if(cntnStack.length > 0){
        if(cntnQueue.length > 0){
            console.log('removing the connection from the queue');
            callback = cntnQueue.shift();
            connection = cntnStack.pop();
            callback(null, connection);
        }
    }
}, 100000)

createConnectionPool(numberOfConnection);



exports.connect = function(url, callback){

    getConnection(function(err,connection){
        console.log("Execution the Query");
        if (err) {
            //console.log("ERROR: " + err.message);
            throw (err);
        }
        if (connection!=undefined) {
            console.log("Length of stack in code : "+ cntnStack.length)

            callback(err, connection);
            //connection.releaseConnection;
            cntnStack.push(connection);
            console.log("Length of stack in fetchData : "+ cntnStack.length)

        }
    });

};

/**Returns the collection on the selected database**/
exports.collection = function(name){
    if (!connected) {
        throw new Error('Must connect to Mongo before calling "collection"');
    }
    return db.collection(name);
};

//-------------------------



