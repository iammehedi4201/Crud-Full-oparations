const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());

//connect to mongoDb Database

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://mehedi1513298:oFQU3GFGESA1TYRq@cluster0.a5mmhss.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userCollection = client.db("Section-E").collection("StudentsInfo");
    //Read Data from mongoDb
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    //Insert Data into MongoDb
    app.post("/users", async function (req, res) {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    //Delete A Data from mongodb
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Trying to delete :-", id);
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    //update data in mongodb
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
    });
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      console.log("The user is :-",user);
      const filter = { _id: new ObjectId(id) };
      // this option instructs the method to create a document if no documents match the filter
      const options = { upsert: true };
      const updateUser ={
          $set:{
              Name : user.Name,
              PhoneNumber :user.PhoneNumber,
              Email : user.Email,
              Password :user.Password
          }
      }
      const result = await userCollection.updateOne(filter,updateUser,options);
      res.send(result)
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
