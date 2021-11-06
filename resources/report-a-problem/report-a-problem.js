const reportProblem = firebase
    .app()
    .functions("europe-west3")
    .httpsCallable("reportProblem");
function submitPress() {
    const titleInput = document.getElementById("titleInput");
    const descriptionInput = document.getElementById("descriptionInput");
    const titleError = document.getElementById("titleError");
    const descriptionError = document.getElementById("descriptionError");
    const reportDiv = document.getElementById("reportDiv");
    const successDiv = document.getElementById("success");
    const errorDiv = document.getElementById("error");

    if (
        titleInput.value == "" ||
        titleInput.value == " " ||
        titleInput.value == null ||
        titleInput == undefined
    ) {
        titleError.innerText = "Title cannot be empty!";
    } else if (
        descriptionInput.value == "" ||
        descriptionInput.value == " " ||
        descriptionInput.value == null ||
        descriptionInput == undefined
    ) {
        descriptionError.innerText = "Description cannot be empty!";
    } else {
        document.getElementById("sendButton").innerText = "LOADING...";
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                db.collection("users")
                    .doc(user.uid)
                    .get()
                    .then((data) => {
                        reportProblem({
                            title: titleInput.value,
                            description: descriptionInput.value,
                            userID: data.id,
                            userEmail: data.data().email,
                            userName: data.data().firstName + " " + data.data().lastName
                        }).then((response) => {
                            console.log(response);
                            reportDiv.style.display = "none";
                            successDiv.style.display = "flex";
                        })
                        .catch((error) => {
                            console.error(error);
                            reportDiv.style.display = "none";
                            errorDiv.style.display = "flex";
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        reportDiv.style.display = "none";
                        errorDiv.style.display = "flex";
                    });
            } else {
                reportProblem({
                    title: titleInput.value,
                    description: descriptionInput.value,
                    userID: null,
                    userEmail: null,
                    userName: null,
                }).then((response) => {
                    console.log(response);
                    reportDiv.style.display = "none";
                    successDiv.style.display = "flex";
                })
                .catch((error) => {
                    console.error(error);
                    reportDiv.style.display = "none";
                    errorDiv.style.display = "flex";
                });
            }
        });
    }
}
