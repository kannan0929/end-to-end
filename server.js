var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");
var url =
  "mongodb+srv://Kannan29:vasudevA09@start.fbruh.mongodb.net/mydb?retryWrites=true&w=majority";
var app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/get", async (req, res) => {
  mongoClient.connect(url, (err, data) => {
    var alldata = data.db("mydb").collection("react");
    alldata.find().toArray((err, data) => {
      if (!err) {
        res.send(data);
      }
    });
  });
});

app.post("/add", async (req, res) => {
  mongoClient.connect(url, (err, data) => {
    var alldata = data.db("mydb").collection("react");
    alldata.insertOne(req.body);
  });
});

function connectDatabase() {
  mongoClient.connect(url, (err, data) => {
    return data.db("mydb").collection("react");
  });
}
console.log(connectDatabase());
app.listen(8080);
console.log("server started at http://127.0.0.1:8080");
