import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBbf1maxDOBOXsNJI6CLfT5SOHDeHB5IFc",
    authDomain: "jfddl7-api.firebaseapp.com",
    databaseURL: "https://jfddl7-api.firebaseio.com",
    projectId: "jfddl7-api",
    storageBucket: "jfddl7-api.appspot.com",
    messagingSenderId: "196050950770"
  };
  firebase.initializeApp(config);

  export const database = firebase.database()
  export const auth = firebase.auth()
  export const googleProvider = new firebase.auth.GoogleAuthProvider()