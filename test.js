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
            /*message += data;
            var post = JSON.parse(message);
            console.log(post.collection);*/


            /*likey need to add a db close. change the way that i do this?
            */
            dbObject.collection(data.collection, function(err, collection) {
            collection.find().toArray(function(err, items) {
                    //var newJson = JSON.stringify(items);
                    //console.log(items);
                    queryData = items;
                    //dbObject.close();
                    //console.log(JSON.stringify(queryData));
                    res.end(JSON.stringify(queryData));
                });
         });
    
        //res.send('{"msg": "OK"}'); // removed the 'callback' stuff
        //var parsedData = JSON.parse(queryData);

        //res.end();
    });
    }

    

}).listen(8080, '172.20.112.247');
console.log('Server running at http://172.20.112.247:8080/');

/*http.createServer(function (req, res) {

    console.log('Request received: ');
    util.log(util.inspect(req)) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
    util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url

    res.writeHead(200, { 
    	'Content-Type': 'text/plain',
   		'Access-Control-Allow-Origin': '*'
   	
    });
    
    
    req.on('data', function (data) {
        console.log('GOT DATA!');
    

    dbObject.collection('gender', function(err, collection) {
    	collection.find().limit(1).toArray(function(err, items) {
    			//var newJson = JSON.stringify(items);
                console.log(items);
                
                dbObject.close();
             });
         });
    	res.json('{"data": "TEST"}');
    	req.end();
    });
    console.log('Server running on port 8080');
    console.log('listening...');
    }).listen(8080);*/
    
 	


