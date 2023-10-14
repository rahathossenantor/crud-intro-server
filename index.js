const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId} = require("mongodb");

const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(express.json());

const uri = "mongodb+srv://rahathossenantor:QM3md2lvK8fbQDZN@junior.tpsklbw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("usersDB");
        const userCollection = database.collection("users");

        server.get("/users", async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        server.post("/users", async (req, res) => {
            const user = req.body;
            // console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        server.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

server.get("/", (req, res) => {
    res.send("hello");
});

server.listen(port, () => {
    console.log(`SERVER IS RUNNING AT PORT: ${port}`);
});

// rahathossenantor
// QM3md2lvK8fbQDZN
