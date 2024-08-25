const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
var routes = require('./route/routes')
const cors = require('cors')
require('dotenv').config()

const uri = "mongodb+srv://admin:trentaelode@vocable.zykpck7.mongodb.net/?retryWrites=true&w=majority&appName=Vocable";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));;


app.listen(9992, function check(err)
{
    if(err){
        console.log("Errore connessione al server");
    }else{
        console.log("Server in ascolto sulla porta 9992");
    }
})

async function run() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(uri, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      //await mongoose.disconnect();
      //console.log("Database disconnesso")
    }
  }
  run().catch(console.dir);


/*mongoose.connect("mongodb://localhost:27017/utenti", //NB: "utenti" è il nome del db, senza niente crea il db di "test"
    {
        useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(
        async()=> {
            console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
        },
        (err) => {
            console.log(err, ": database utenti non connesso")
        }
    );*/
    app.use(express.json());
    app.use(routes);