const express = require('express');
const router=express.Router();
const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const User= require('../models/user');
const jwt = require('jsonwebtoken'); // for token
const UserController = require("../controllers/user");
const checkAuth = require('../middleware/check-auth');


router.post('/signup',UserController.user_signup);
router.post("/login",UserController.user_login);
router.delete("/:userId",checkAuth,UserController.user_delete);

module.exports = router;  