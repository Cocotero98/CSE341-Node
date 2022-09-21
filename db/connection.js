const {MongoClient} = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();
let db;

function dbConnect() {
    //Cluster0 connection string
	// const uri = "mongodb+srv://agustin98:<password>@cluster0.1vqmd5v.mongodb.net/?retryWrites=true&w=majority;"
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1vqmd5v.mongodb.net/?retryWrites=true&w=majority`;

    //Create new client with connection string
    const client = new MongoClient(uri);

    //Wrap our calls to functions that interact with the database in a try/catch statement so that we handle any unexpected errors.
    try{
       //Connect to our cluster. Next line returns a promise. We use await to stop further excecution until this is completed
        client.connect()
        .then(db=client);
        
        // let resul = db.db().collection('contacts').find({});
        // let resu = resul.toArray();
        // let result = JSON.stringify(resu);
        // console.log(`connected!${result}`)
        // await listDocuments(client); 
    } catch (e) {
        console.error(e);
    }
    
    //Close connection
    // finally {
    //     await client.close();
    // }

}

async function getDb () {
    await dbConnect()
    if (!db) {
      throw Error('Db not initialized');
    }
    return db;
  };

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// async function listDocuments(client){
//     databaseCSE341 = await client.db().collection('contacts').find().toArray();

//     console.log("Documents:");
//     console.log(JSON.stringify(databaseCSE341));    
// }


// getDb()
// .then(console.log(getDb()))

// main().catch(console.error);
module.exports = { 
                    dbConnect,
                    getDb,
                 };