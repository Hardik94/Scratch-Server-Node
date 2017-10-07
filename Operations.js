var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}))

// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// router.use(express.static('Get'));

// middleware that is specific to this router

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://127.0.0.1:27017/test";


router.use(function timeLog (req, res, next) {
  console.log('Operations: ', Date.now())
  next()
})

router.get('/', function (req, res) {
  if((req.query._id !== '') && (req.query._id)) {
    console.log(req.query._id);
    var value;
    MongoClient.connect(url, function(err, db) {
      // if (err) throw err;
      db.collection("document").findOne({"_id":req.query._id}, function(err, result) {
        // if (err) throw err;
          console.log(result);
        if(result === null) {
          return res.json("You have no data on this id");
        }
        else {
          return res.json("This id have data --> " + result.value);
        }
        db.close();
      });
    });
  }
  else {
    return res.json("Please enter valid id");
  }
})

// define the about route
router.post("/",  function (req, res) {
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
          return res.json("your data inserted into your document successfully");
        }
        else {
          return res.json("This id already have data --> " + result.value);
        }
        db.close();
      });
    });
  }
  else {
    console.log("Please enter valid data");
    return res.json("Please enter valid data");
  }
});

router.put("/", function (req, res) {
  // res.sendFile( __dirname + "/index.html");
  console.log('>>>>>>>>>put ' + req.body);
  console.log(req.body)
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
          return res.json("your data updated into your document successfully");
        }
        else {
          return res.json("This id have no data");
        }
        db.close();
      });
    });
  }
  else {
    console.log("Please enter valid data");
    return res.json("Please enter valid data");
  }

  // return res.json(req.body);
})

router.delete("/", function(req, res) {
  if(((req.query._id !== '') && (req.query._id)) || ((req.body._id !== '') && (req.body._id))) {
    console.log(req.query._id);
    var value;
    MongoClient.connect(url, function(err, db) {
      // if (err) throw err;
      db.collection("document").remove({"_id":req.query._id}, function(err, result) {
        // if (err) throw err;
        // console.log(err)
        if(result.result.n) {
          console.log("data updated");
          return res.json("document removed successfully");
        }
        else {
         return res.json("document not available"); 
        }
        
        db.close();
      });
    });
  }
  else {
    return res.json("Please enter valid id");
  }
})



module.exports = router