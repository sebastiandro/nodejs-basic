const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.set("view engine", "ejs");

var db;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  "mongodb://knark:knark@knark-shard-00-00-l9shw.mongodb.net:27017,knark-shard-00-01-l9shw.mongodb.net:27017,knark-shard-00-02-l9shw.mongodb.net:27017/test?ssl=true&replicaSet=Knark-shard-0&authSource=admin&retryWrites=true",
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("knark"); // whatever your database name is

    app.listen(3000, function() {
      console.log("listening on 3000");
    });
  }
);

app.get("/", function(req, res) {
  db.collection("knark")
    .find()
    .toArray(function(err, results) {
      res.render("index.ejs", { knark: results });
    });
});

app.post("/tjena", (req, res) => {
  db.collection("knark").save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log("saved to database");
    res.redirect("/");
  });
});
