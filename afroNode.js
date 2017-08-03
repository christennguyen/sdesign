var http = require('http');
var util = require('util');
var qs = require('querystring');

var mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var dbObject = null;
var dbHost = "mongodb://cnstat:afrobarom@ds159220.mlab.com:59220/afrobarometer-data"

MongoClient.connect(dbHost, (err,database) => {
	if(err) return console.log(err)
		else console.log("we are connected");
	dbObject = database;
});


http.createServer(function (req, res) {

    console.log('Request received');
    var queryData;
    res.writeHead(200, { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*' // implementation of CORS
    });
    if(req.method == 'POST') {
        var message = '';
        req.on('data', function (chunk) {
            console.log('GOT DATA!');
            var data = JSON.parse(chunk)
            console.log(data.collection);


            /*likey need to add a db close. change the way that i do this?
            */
            dbObject.collection(data.collection, function(err, collection) {
            collection.find().toArray(function(err, items) {
                    queryData = items;
                    res.end(JSON.stringify(queryData));
                });
         });

    });
    }

    

}).listen(8080, '192.168.1.19');
console.log('Server running at http://192.168.1.19:8080/');

    
 	


