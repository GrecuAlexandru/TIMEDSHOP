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

// Initialize Firebase
const db = firebase.firestore();
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");

var noError = true;
var gender;
var rememberMe = false;
function confirmPressed() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    
    emailError = document.getElementById("emailError");
    passwordError = document.getElementById("passwordError");
    
    console.log("email", email);
    console.log("password", password);
    
    if (!email) {
        emailError.innerText = "Please insert your email!";
        emailError.style.display = "flex";
        noError = false;
    } else {
        emailError.style.display = "none";
        noError = true;
    }
    
    if (!password) {
        passwordError.innerText = "Please insert your password!";
        passwordError.style.display = "flex";
        noError = false;
    } else {
        passwordError.style.display = "none";
        noError = true;
    }
    if (noError) {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            firebase
            .auth()
            .setPersistence(
                this.rememberMe
                ? firebase.auth.Auth.Persistence.LOCAL
                : firebase.auth.Auth.Persistence.SESSION
                )
                .then(() => {
                    console.log("cocomoco");
                    db.collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .get()
                    .then((data) => {
                        console.log(data.data());
                        gender = data.data().gender;
                        if (gender == "male")
                                    window.open("/Men.html", "_self");
                                if (gender == "female")
                                    window.open("/Women.html", "_self");
                                if (gender == "other")
                                    window.open("/Sale.html", "_self");
                            })
                            .catch((error) => {
                                passwordError.innerText = "INTERNAL ERROR!";
                                console.log(error);
                                passwordError.style.display = "flex";
                                noError = false;
                            });
                        return firebase
                            .auth()
                            .signInWithEmailAndPassword(email, password);
                    })
                    .catch((error) => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                        if (errorCode == "auth/invalid-password") {
                            passwordError.innerText = errorMessage;
                            passwordError.style.display = "flex";
                            noError = false;
                        }
                        if (errorCode == "auth/invalid-password-salt") {
                            passwordError.innerText = errorMessage;
                            passwordError.style.display = "flex";
                            noError = false;
                        }
                        if (errorCode == "auth/internal-error") {
                            passwordError.innerText = "INTERNAL ERROR!";
                            passwordError.style.display = "flex";
                            noError = false;
                        }
                        if (errorCode == "auth/invalid-email") {
                            emailError.innerText = errorMessage;
                            emailError.style.display = "flex";
                            noError = false;
                        }
                        if (errorCode == "auth/wrong-password") {
                            passwordError.innerText = "Wrong password!";
                            passwordError.style.display = "flex";
                            noError = false;
                        }
                        if (errorCode == "auth/user-not-found") {
                            emailError.innerText = errorMessage;
                            emailError.style.display = "flex";
                            noError = false;
                        }
                    });
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode == "auth/invalid-password") {
                    passwordError.innerText = errorMessage;
                    passwordError.style.display = "flex";
                    noError = false;
                }
                if (errorCode == "auth/invalid-password-salt") {
                    passwordError.innerText = errorMessage;
                    passwordError.style.display = "flex";
                    noError = false;
                }
                if (errorCode == "auth/internal-error") {
                    passwordError.innerText = "INTERNAL ERROR!";
                    passwordError.style.display = "flex";
                    noError = false;
                }
                if (errorCode == "auth/invalid-email") {
                    emailError.innerText = errorMessage;
                    emailError.style.display = "flex";
                    noError = false;
                }
                if (errorCode == "auth/wrong-password") {
                    passwordError.innerText = "Wrong password!";
                    passwordError.style.display = "flex";
                    noError = false;
                }
                if (errorCode == "auth/user-not-found") {
                    emailError.innerText = errorMessage;
                    emailError.style.display = "flex";
                    noError = false;
                }
            });
    }
}

function rememberMePressed() {
    if (document.getElementById("rememberMeCheckbox").checked == true) {
        rememberMe = true;
    } else {
        rememberMe = false;
    }
}
loader(true);
