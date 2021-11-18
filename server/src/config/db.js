// importing firebase admin into the system.
// store/declare it as part of an admin variable.
    var admin = require("firebase-admin");

    try{
// Feedback for connection to database.
    console.log("Attempting to connect to Data-Base.....")


// import to the db credentials.
    var serviceAccount = require("./serviceAccountKey.json");


// connects with the database.
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "mynamejeff-65c62.appspot.com",
    });

//FeedBack Notify db connection
    console.log("connected to the database 👍")

// allows writes directly to the database and access.
    const db = admin.firestore();
// allows us to access the storage side of the database (such as images).
    const bucket = admin.storage().bucket();


    module.exports = {db, bucket};


    }catch(error)
        {
            console.log(error);
        }
