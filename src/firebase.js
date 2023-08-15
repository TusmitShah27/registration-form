import firebase from 'firebase';

var firebaseApp = firebase.initializeApp({
    // Your web app's Firebase configuration
    apiKey: "AIzaSyBThEzBrP3TW4u0UxS7ZRv-13hUm7_ENOc",
    authDomain: "npl-registration-form.firebaseapp.com",
    projectId: "npl-registration-form",
    storageBucket: "npl-registration-form.appspot.com",
    messagingSenderId: "1074527848131",
    appId: "1:1074527848131:web:94c5de799221733ad88476"

});

var db = firebaseApp.firestore();

export { db }