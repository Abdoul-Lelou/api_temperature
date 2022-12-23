const express = require('express');
// const Model = require('../models/userModel');
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// var fs = require('fs');
var path = require('path');
const db = require('../firebaseSetup');
const { getAuth, signInWithEmailAndPassword }= require("firebase-admin/auth");
// const fs = require('firebase-admin');
// const serviceAccount = require('../key.json');

// const check = require("./midleware");

const router = express.Router()

module.exports = router;



//Post Method
router.post('/login',   async(req, res) => {
    
    // const { email, password } = req.body;
    // const auth = getAuth();
    
   
        getAuth()
        .getUser("MSh3rWvS7fRpE3jZRhxb4tRw1MD3")
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
        });
        
 
    
})



//Post Method
router.post('/post',   async(req, res) => {

// const { email, password, prenom, nom, date_inscri, roles, etat, matricule, img } = req.body;

const users = [];
try {
    console.log(req.body);
    const id = req.body.email;
    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };
    const usersDb = db.collection('users'); 
    const response = await usersDb.doc(id).set(userJson);
    res.send(response);
  } catch(error) {
    res.send(error);
  }

})

//Get all Method
router.get('/getAll', async(req, res) => {
    try {
        const userRef = db.collection("users");
        const dataGet = [];
        const snapshot = await userRef.get();
        snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        dataGet.push(doc.data())
    });
    res.send(dataGet);
      } catch(error) {
        res.send(error);
      }
})

//Get by ID Method
router.get('/getOne/:id', async(req, res) => {
    try {
        const userRef = db.collection("users").doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());
      } catch(error) {
        res.send(error);
      }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    
    try {
        const id=req.body.id;
        const newFirstName = "hello world!";
        const userRef = await db.collection("users").doc(id)
        .update({
          firstName: newFirstName
        });
        res.send(userRef);
      } catch(error) {
        res.send(error);
      }
  
})

//Delete by ID Method
router.delete('/delete/:id',async(req, res) => {
    try {
        const response = await db.collection("users").doc(req.params.id).delete();
        res.send(response);
      } catch(error) {
        res.send(error);
      }
})
