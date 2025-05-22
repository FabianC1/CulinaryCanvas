import express from 'express';

import fileUpload from 'express-fileupload';

import bodyParser from 'body-parser';
        
import session from 'express-session';

//Import classes from mongodb module
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const app = express();

//Create express app and configure it with body-parser
export { app };
app.use(bodyParser.json());

// Serve the 'public' folder at the route '/M00860030'
app.use('/M00860030', express.static('public'));
app.use('/M00860030/uploads', express.static('uploads'));

app.use(fileUpload());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(session({
    secret: 'cstFab secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
}));


// Route to fetch all users
app.get('/M00860030/getAllUsers', async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.session.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Fetch all users from the database
        const users = await collection.find({}, { projection: { username: 1, profilePictureURL: 1 } }).toArray();

        // Send the list of users as a JSON response
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





app.get('/M00860030/getUserRecipesCount', express.json(), async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.session.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const username = req.query.username;

        // Query the database to get the count of recipes for the specified user
        const count = await RecipesCollection.countDocuments({ uploaded_by: username });

        res.json({ count });

    } catch (error) {
        console.error("Error fetching user recipes count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





app.post('/M00860030/AddUser', express.json(), async (req, res) => {
    try {
        const { username, email, password, DOB } = req.body;

        // Check if any required field is missing
        if (!username || !email || !password || !DOB) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if profile picture is included in the request
        if (!req.files || !req.files.profilePicture) {
            return res.status(400).json({ error: 'Profile picture is required' });
        }

        const profilePictureFile = req.files.profilePicture;

        // Move the profile picture file to the 'uploads' folder
        profilePictureFile.mv(`./uploads/${profilePictureFile.name}`, async function (err) {
            if (err) {
                console.error("Error uploading profile picture:", err);
                return res.status(500).json({ error: "Failed to upload profile picture" });
            }

            try {
                // Insert user data into the database, including profile picture URL
                const userData = {
                    username: username,
                    email: email,
                    password: password,
                    DOB: DOB,
                    profilePictureURL: `uploads/${profilePictureFile.name}`
                };

                const user = await collection.insertOne(userData);
                res.json(user);
            } catch (error) {
                console.error("Error inserting user:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.post('/M00860030/login', express.json(), async (req, res) => {
    try {
        const { email, password } = req.body;

        // Query the database to find the user
        const user = await collection.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Store user data in session
        req.session.user = {
            email: user.email,
            username: user.username,
            profilePictureURL: user.profilePictureURL, // Assuming this property exists in your user object
            DOB: user.DOB // Assuming this property exists in your user object
        };

        res.json({ message: 'Login successful', username: user.username });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.post('/uploadImageAndDescription', async (req, res) => {
    try {
        // Check if both image, description, title, and username are included in the request
        if (!req.files || !req.body.description || !req.body.title || !req.body.username) {
            return res.status(400).json({ error: 'Image, description, title, or username missing' });
        }

        // Extract image file, description, title, and username from the request
        const imageFile = req.files.myFile;
        const description = req.body.description;
        const title = req.body.title;
        const username = req.body.username;

        // Move the image file to the 'uploads' folder
        imageFile.mv(`./uploads/${imageFile.name}`, async function (err) {
            if (err) {
                console.error("Error uploading image:", err);
                return res.status(500).json({ error: "Failed to upload image" });
            }

            try {
                // Insert the image filename, description, title, username, and binary data into the database
                const result = await RecipesCollection.insertOne({
                    uploaded_by: username, // Associate the recipe with the username
                    title: title,
                    description: description,
                    imageURL: `uploads/${imageFile.name}`,
                });

                if (result.insertedCount === 1) {
                    res.status(200).json({ message: 'Recipe uploaded successfully' });
                } else {
                    console.error("Failed to insert recipe into database");
                    res.status(500).json({ error: 'Failed to upload recipe' });
                }
            } catch (error) {
                console.error("Error inserting recipe into database:", error);
                res.status(500).json({ error: "Failed to insert recipe into database" });
            }
        });
    } catch (error) {
        console.error("Error uploading recipe:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.get('/M00860030/getAllRecipes', async (req, res) => {
    try {
        // Query all recipes from the database
        const recipes = await RecipesCollection.find({}).toArray();

        // Send the recipes as a JSON response
        res.json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post('/M00860030/logout', async (req, res) => {
    try {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({ error: "Failed to log out" });
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.json({ message: 'Logout successful' });
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});







//Connection details
const password = "Fabian";//Should be stored in a separate file!
const userName = "Fabian";
const server = "atlascluster.tjeshej.mongodb.net";

//Encode special characters
const encodedUsername = encodeURIComponent(userName);
const encodedPassword = encodeURIComponent(password);

//Create connection URI
const connectionURI = "mongodb+srv://Fabian:Fabian@atlascluster.tjeshej.mongodb.net/?retryWrites=true&w=majority";
console.log(connectionURI);

//Set up client
const client = new MongoClient(connectionURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,//Setting this to true breaks text index queries.
        deprecationErrors: true,
    }
});

//Use client to create database and collection
const database = client.db("FoodBlog");
const collection = database.collection("Users");
const RecipesCollection = database.collection("Recipes");

const PORT = 8600;

app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}.`);
});
