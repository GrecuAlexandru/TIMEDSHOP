firebase.auth().onAuthStateChanged(function (user){
    if(user)
    {
        db.collection("users").doc(user.uid).get().then((data)=>{
            console.log(data);
            document.getElementById("accountName").innerText = data.data().firstName + " " + data.data().lastName;
            document.getElementById("firstName").innerText = data.data().firstName;
            document.getElementById("lastName").innerText = data.data().lastName;
            document.getElementById("email").innerText = data.data().email;
            document.getElementById("gender").innerText = capitalizeFirstLetter(data.data().gender);
        }).catch((error)=>{console.log(error)})
    }
})
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}