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

exports.scratchServer = function scratchServer (req, res) {
	console.log('You entered in sccratch serverless application');
	switch (req.method) {
    case 'GET':
      handleGET(req, res);
      break;
    
    case 'PUT':
      console.log("entered in put method");
      // handlePUT(req, res);
      break;

    case 'POST':
      console.log("entered in post");
      // handlePOST(req, res);
   	  break;

   	case 'DELETE':
   	  console.log("entered in delete");
   	  // handleDELETE(req, res);
   	  break;

    default:
      res.status(500).send({ error: 'Something blew up!' });
      break;
  }
}