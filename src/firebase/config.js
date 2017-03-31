import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBhFYeeUF-byX9osMm0oO4EsFiIs2Llgd8",
    authDomain: "plateproject-c0bcb.firebaseapp.com",
    databaseURL: "https://plateproject-c0bcb.firebaseio.com",
    storageBucket: "plateproject-c0bcb.appspot.com",
    messagingSenderId: "964873126430"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;