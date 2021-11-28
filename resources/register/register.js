let firstName = document.getElementById("firstName").value;
let lastName = document.getElementById("lastName").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
let confirmPassword = document.getElementById("confirmPassword").value;
let maleButton = document.getElementById("male");
let femaleButton = document.getElementById("female");
let otherButton = document.getElementById("other");
let selectedGender;

let firstNameError = document.getElementById("firstNameError");
let lastNameError = document.getElementById("lastNameError");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let confirmPasswordError = document.getElementById("confirmPasswordError");
let genderError = document.getElementById("genderError");

var noError = true;
function confirmPressed() {
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    confirmPassword = document.getElementById("confirmPassword").value;
    maleButton = document.getElementById("male");
    femaleButton = document.getElementById("female");
    otherButton = document.getElementById("other");

    firstNameError = document.getElementById("firstNameError");
    lastNameError = document.getElementById("lastNameError");
    emailError = document.getElementById("emailError");
    passwordError = document.getElementById("passwordError");
    confirmPasswordError = document.getElementById("confirmPasswordError");
    genderError = document.getElementById("genderError");

    if (!firstName) {
        firstNameError.innerText = "Please insert your first name!";
        firstNameError.style.display = "flex";
        noError = false;
    } else {
        firstNameError.style.display = "none";
        noError = true;
    }

    if (!lastName) {
        lastNameError.innerText = "Please insert your last name!";
        lastNameError.style.display = "flex";
        noError = false;
    } else {
        lastNameError.style.display = "none";
        noError = true;
    }

    if (!email) {
        emailError.innerText = "Please insert your email!";
        emailError.style.display = "flex";
        noError = false;
    } else {
        emailError.style.display = "none";
        noError = true;
    }

    if (!password) {
        passwordError.innerText = "Please insert your desired password!";
        passwordError.style.display = "flex";
        noError = false;
    } else {
        passwordError.style.display = "none";
        noError = true;
    }

    if (!confirmPassword) {
        confirmPasswordError.innerText = "Please insert your password again!";
        confirmPasswordError.style.display = "flex";
        noError = false;
    } else {
        confirmPasswordError.style.display = "none";
        noError = true;
    }

    if (
        password != "" &&
        confirmPassword != "" &&
        confirmPassword != password
    ) {
        confirmPassword.innerText = "The password does not match!";
        confirmPasswordError.style.display = "flex";
        noError = false;
    }

    if (selectedGender == undefined) {
        genderError.innerText = "Please insert your gender!";
        genderError.style.display = "flex";
        noError = false;
    } else {
        genderError.style.display = "none";
        noError = true;
    }

    if (noError) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;

                db.collection("users")
                    .doc(user.uid)
                    .set({
                        email:email,
                        firstName: firstName,
                        lastName: lastName,
                        gender: selectedGender,
                        cart:[],
                        orders:[],
                        favorites:[],
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                        if (noError) {
                            document.getElementById(
                                "registerContainer"
                            ).style.display = "none";
                            document.getElementById(
                                "accountCreatedDiv"
                            ).style.display = "flex";
                            document.getElementById("mainDiv").style.display =
                                "flex";
                            document.getElementById(
                                "mainDiv"
                            ).style.alignItems = "center";
                            document.getElementById(
                                "mainDiv"
                            ).style.justifyContent = "center";
                            document.getElementById(
                                "emailHighlight"
                            ).innerText = email;
                        }
                    })
                    .catch((error) => {
                        genderError.innerText = error.message;
                        genderError.style.display = "flex";
                        noError = false;
                    });
            })
            .catch((error) => {
                noError = false;
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == "auth/weak-password") {
                    passwordError.innerText = errorMessage;
                    passwordError.style.display = "flex";
                    noError = false;
                }
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
                if (errorCode == "auth/email-already-exists") {
                    emailError.innerText = errorMessage;
                    emailError.style.display = "flex";
                    noError = false;
                }
                if (errorCode == "auth/email-already-in-use") {
                    emailError.innerText = errorMessage;
                    emailError.style.display = "flex";
                    noError = false;
                }
                if (errorCode == "auth/internal-error") {
                    genderError.innerText = "INTERNAL ERROR!";
                    genderError.style.display = "flex";
                    noError = false;
                }
                if (errorCode == "auth/invalid-email") {
                    emailError.innerText = errorMessage;
                    emailError.style.display = "flex";
                    noError = false;
                }
            });
    }
}

function selectGender(gender) {
    selectedGender = gender.toString();
    let selectedGenderBox = document.getElementById(gender);
    let genderSelectDiv = document.getElementById("genderContainer");
    selectedGenderBox.style.backgroundColor = "#e3c8ff";

    var children = genderSelectDiv.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.id.toString() != gender.toString()) {
            child.style.backgroundColor = "white";
        }
    }
}

function okPressed() {
    if (selectedGender == "male") window.open("/men.html", "_self");
    if (selectedGender == "female") window.open("/women.html", "_self");
    if (selectedGender == "other") window.open("/sale.html", "_self");
}
loader(true);
