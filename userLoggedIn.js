// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyCkBvDNzSvorpEdz2twDAVI09x-FaVsDGg",
    authDomain: "timedshop-a5a66.firebaseapp.com",
    projectId: "timedshop-a5a66",
    storageBucket: "timedshop-a5a66.appspot.com",
    messagingSenderId: "172835576987",
    appId: "1:172835576987:web:2e588ca7a77cc008affa3e",
    measurementId: "G-3VCHXLRX5K",
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        console.log("logged in user: ", user.email);
        document.getElementById("LogIn").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("account").style.display = "flex";
    } else {
        // User is signed out
        console.log("sign out");
        document.getElementById("account").style.display = "none";
        document.getElementById("LogIn").style.display = "flex";
        document.getElementById("register").style.display = "flex";
    }
});

function signOut() {
    firebase
        .auth()
        .signOut()
        .then(() => {
            // Sign-out successful.
        })
        .catch((error) => {
            console.log(error);
        });
}
