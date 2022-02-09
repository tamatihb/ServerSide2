// import modules

const { db } = require('../config/db')
const ApiError = require('../utilities/ApiError')
const { fileServerUpload, storageBucketUpload, validateFile, getFilePathFromUrl, deleteFileFromBucket } = require('../utilities/fileUploader');


module.exports = {

    // GET
    async getUser(req, res, next) {
        res.send('User-Test-Success')

        try {
            const usersRef = db.collection('users');

            // // input a index through Firestore to asc or desc data.
            // const snapshot = await usersRef.orderBy('username', 'asc').limit(10).get;


            // if (snapshot.empty) {
            //     console.log(snapshot)
            //     return next(ApiError.badRequest("User does not exist"))

            // } else
            //     let docs = [];
            // snapshot.forEach(doc => {
            //     docs.push({
            //         id: doc.data.id,
            //         email: doc.data.email,
            //         isAdmin: doc.data.isAdmin,
            //         passwords: doc.data.passwords,
            //         username: doc.data.username

            //     })
            // })
            res.send(docs);







        } catch (err) {
            return next(ApiError.internal('User details are wrong or incomplete.', err));

        }
    },

    // POST 
    async postUser(req, res, next) {
        // console.log(req.body, req.id)

        const usersRef = db.collection('users');
        const response = await usersRef.add({
            email: req.body.email,
            isAdmin: req.body.isAdmin,
            password: req.body.password,
            username: req.body.username
        })
        console.log('added a new user with ID', response.id);
        res.send(response.id);

    },

    // GET user by ID

    async getUserById(req, res, next) {
        try {
            const userRef = db.collection('user').doc(req.params.id);
            const doc = await userRef.get();

            //!! 400 ERROR
            if (!doc.exists) {
                return next(ApiError.badRequest('This is not the user you are looking for.'));
            } else {
                res.send(doc.data());
            }
        } catch (err) {
            return next(ApiError.internal('Your user request could not be processed at this time', err));
        }
    },


    // PUT by ID
    // DELETE by ID


}