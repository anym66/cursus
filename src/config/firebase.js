import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDyv7SJ8YHmVJzBpaOPNYZWU_Nm3Dwve3I",
    authDomain: "blabla-7a389.firebaseapp.com",
    databaseURL: "https://blabla-7a389-default-rtdb.firebaseio.com",
    projectId: "blabla-7a389",
    storageBucket: "blabla-7a389.appspot.com",
    messagingSenderId: "414388775531",
    appId: "1:414388775531:web:de62d48d3a902bbc65df2e"


  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase