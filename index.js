var MongoClient = require('mongodb').MongoClient;
// you should put here your external ip
var url = "mongodb://0.0.0.0:27017/test";

function handleGET(req, res) {
	if((req.query._id !== '') && (req.query._id)) {
		console.log(req.query._id);
		var value;
		MongoClient.connect(url, function(err, db) {
			// if (err) throw err;
			db.collection("document").findOne({"_id":req.query._id}, function(err, result) {
				// if (err) throw err;
				if(result === null) {
					res.status(200).send("You have no data on this id");
				}
				else {
				 	res.status(200).send("This id have data --> " + result.value);
				}
				db.close();
			});
		});
	}
	else {
		res.status(200).send("Please enter valid id");
	}
}

function handlePOST(req, res) {
	if((req.body._id !== "") && (req.body.value !== "") && (req.body.value) && (req.body._id)) {
		console.log(req.body);
		MongoClient.connect(url, function(err, db) {
		// if (err) throw err;
			db.collection("document").findOne({"_id":req.body._id}, function(err, result) {
			// if (err) throw err;
				console.log(result);
				if(result === null) {
					var myobj = { "_id": req.body._id, "value": req.body.value };
					db.collection("document").insertOne(myobj, function(err1, res) {
						console.log("1 document inserted");
					});
					res.status(200).send("your data inserted into your document successfully");
				}
				else {
					res.status(200).send("This id already have data --> " + result.value);
				}
				db.close();
			});
		});
	}
	else {
		res.status(200).send("Please enter valid data");
	}
}

function handlePUT(req, res) {
	if((req.body._id !== "") && (req.body.value !== "") && (req.body.value) && (req.body._id)) {
		console.log(req.body);
		MongoClient.connect(url, function(err, db) {
		// if (err) throw err;
			db.collection("document").findOne({"_id":req.body._id}, function(err, result) {
			// if (err) throw err;
				console.log(result);
				if(result !== null) {
					var myobj = {"_id": req.body._id}
					var newValue = {"value": req.body.value};
					db.collection("document").update(myobj,newValue, function(err1, res) {
						console.log("1 document updated");
					});
					res.status(200).send("your data updated into your document successfully");
				}
				else {
					res.status(200).send("This id have no data");
				}
				db.close();
			});
		});
	}
	else {
		res.status(200).send("Please enter valid data");
	}
}

function handleDELETE(req, res) {
	if((req.query._id !== '') && (req.query._id)) {
		console.log(req.query._id);
		var value;
		MongoClient.connect(url, function(err, db) {
			// if (err) throw err;
			db.collection("document").remove({"_id":req.query._id}, function(err, result) {
				// if (err) throw err;
				if(result.result.n) {
					console.log("data updated");
					res.status(200).send("document removed successfully");
				}
				else {
					res.status(200).send("document not available"); 
				}

				db.close();
			});
		});
	}
	else {
		res.status(200).send("Please enter valid id");
	}
}


exports.scratchServer = function scratchServer (req, res) {
	console.log('You entered in sccratch serverless application');
	switch (req.method) {
    case 'GET':
		handleGET(req, res);
		break;
    
    case 'PUT':
		console.log("entered in put method");
		handlePUT(req, res);
		break;

    case 'POST':
		console.log("entered in post");
		handlePOST(req, res);
		break;

   	case 'DELETE':
		console.log("entered in delete");
		handleDELETE(req, res);
		break;

    default:
		res.status(500).send({ error: 'Something blew up!' });
		break;
  }
}
