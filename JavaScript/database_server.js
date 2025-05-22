//Import classes from mongodb module
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

//Connection details
const password = "Fabian";//Should be stored in a separate file!
const userName = "Fabian";
const server =  "atlascluster.tjeshej.mongodb.net";

//Encode special characters
const encodedUsername = encodeURIComponent(userName);
const encodedPassword = encodeURIComponent(password);

//Create connection URI
const connectionURI = "mongodb+srv://Fabian:Fabian@atlascluster.tjeshej.mongodb.net/?retryWrites=true&w=majority";
console.log(connectionURI);





