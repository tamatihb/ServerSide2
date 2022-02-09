const express = require('express')
const router = express.Router()


const userController = require('../controller/userController')
    // userPolicy
    // userController


module.exports = () => {


    router.get('/user', userController.getUser);

    // router.post('/user', userController.postUser);

    // router.get('/user/:id', userController.getUserById);

    // router.put('/user/:id', userController.putUserById);

    // router.delete('/user/:id', userController.deleteUserById);





    return router
}