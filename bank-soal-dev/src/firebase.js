// initialize cloud firestore
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyA09VnLlILCZcjXP3LwrnuPgBmz0dVZlPw",
    authDomain: "bank-soal-dev.firebaseapp.com",
    databaseURL: "https://bank-soal-dev.firebaseio.com",
    projectId: "bank-soal-dev",
    storageBucket: "bank-soal-dev.appspot.com",
    messagingSenderId: "294492037363",
    appId: "1:294492037363:web:a1f8addf1d37b54c3a9786",
    measurementId: "G-N4S80E6M0Q"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db