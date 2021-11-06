var selectedSize = "";
var selectedColor = "";
params = new URLSearchParams(location.search);
function selectSize(size) {
    selectedSize = size.toString();
    let selectedSizeBox = document.getElementById(size);
    let sizeSelectDiv = document.getElementById("sizeSelectDiv");
    selectedSizeBox.style.backgroundColor = "#e3c8ff";

    var children = sizeSelectDiv.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.id.toString() != size.toString()) {
            child.style.backgroundColor = "white";
        }
    }
}

function selectColor(color) {
    selectedColor = color.toString();
    let selectedColorBox = document.getElementById(color);
    let colorSelectDiv = document.getElementById("colorsDiv");
    selectedColorBox.style.outlineColor = "#5a189a";
    selectedColorBox.style.outlineWidth = "6px";
    selectedColorBox.style.borderWidth = "0";

    var children = colorSelectDiv.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.id.toString() != color.toString()) {
            child.style.outlineWidth = "0";
            child.style.borderWidth = "1px";
        }
    }
}

function addToCart() {
    console.log(selectedColor, selectedSize);
    if (selectedSize == "" || selectedColor == "") {
        document.getElementById("addToCartError").innerText =
            "Error! You must select a size and a color!";
    } else {
        var productSelectionString =
            params.get("id").toString() + "-" + 
            selectedSize.toString() + "-" + 
            selectedColor.toString();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection("users")
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then((data) => {
                    if(data.data().cart)
                    {
                        if (data.data().cart.includes(productSelectionString)) {
                            document.getElementById("addToCartError").innerText =
                                "You already added this to your cart!";
                        } else {
                            document.getElementById("addToCartError").innerText = "";
                            console.log("ITEM ADDED");
                            document.getElementById("addToCartButton").innerText = "ADDED";
                            db.collection("users")
                                .doc(firebase.auth().currentUser.uid)
                                .update({
                                    cart: firebase.firestore.FieldValue.arrayUnion(
                                        productSelectionString
                                    ),
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                })
                            .then(() => {
                                document.getElementById("cartCount").innerText =
                                    parseInt(
                                        document.getElementById("cartCount").innerText
                                    ) + 1;
                            }).catch((error) => {
                                if(error.code != "permission-denied")
                                    window.open("/error.html","_self");
                            });
                        }
                    }
                    else
                    {
                        document.getElementById("addToCartError").innerText = "";
                        console.log("ITEM ADDED");
                        document.getElementById("addToCartButton").innerText = "ADDED";
                        db.collection("users")
                            .doc(firebase.auth().currentUser.uid)
                            .update({
                                cart: productSelectionString,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            })
                        .then(() => {
                            document.getElementById("cartCount").innerText =
                                parseInt(
                                    document.getElementById("cartCount").innerText
                                ) + 1;
                        }).catch((error) => {
                            if(error.code != "permission-denied")
                                window.open("/error.html","_self");
                        });
                    }
                })
                .catch((error) => {
                    if(error.code != "permission-denied")
                        window.open("/error.html","_self");
                });
            }
            else
            {
                if(localStorage.getItem("cart"))
                {
                    var storageCart = JSON.parse(localStorage.getItem("cart"))
                    if(storageCart.includes(productSelectionString))
                    {
                        document.getElementById("addToCartError").innerText =
                                "You already added this to your cart!";
                    }
                    else
                    {
                        document.getElementById("addToCartError").innerText = "";
                        storageCart.push(productSelectionString);
                        localStorage.setItem("cart", JSON.stringify(storageCart));
                        localStorage.setItem("cartCount", JSON.stringify(JSON.parse(localStorage.getItem("cartCount"))+1));
                        document.getElementById("addToCartButton").innerText = "ADDED";
                        document.getElementById("cartCount").innerText =
                            parseInt(
                                document.getElementById("cartCount").innerText
                            ) + 1;
                    }
                }
                else
                {
                    document.getElementById("addToCartError").innerText = "";
                    var storageCart = [];
                    storageCart.push(productSelectionString);
                    localStorage.setItem("cart", JSON.stringify(storageCart));
                    localStorage.setItem("cartCount", JSON.stringify(JSON.parse(localStorage.getItem("cartCount"))+1));
                    document.getElementById("addToCartButton").innerText = "ADDED";
                    document.getElementById("cartCount").innerText =
                        parseInt(
                            document.getElementById("cartCount").innerText
                        ) + 1;
                }
            }
        });
    }
}

function addToFavorites()
{
    var productSelectionString = params.get("id").toString()+"-"+selectedSize.toString()+"-"+selectedColor.toString();
    let heart = document.getElementById("favoritesIMGButton");
    db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((data) => {
            if (selectedSize == "" || selectedColor == "") {
                document.getElementById("addToFavoritesError").innerText =
                    "Error! You must select a size and a color!";
            } else {
                if(data.data().favorites)
                {
                    if (data.data().favorites.includes(productSelectionString)) {
                        db.collection("users")
                        .doc(firebase.auth().currentUser.uid)
                        .update({
                            favorites: firebase.firestore.FieldValue.arrayRemove(
                                productSelectionString
                                ),
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            })
                            .then(() => {
                                document.getElementById("favoritesCount").innerText =
                                parseInt(
                                    document.getElementById("favoritesCount").innerText
                                ) - 1;
                                heart.setAttribute("src","/resources/icons/favorites.svg");
                        }).catch((error) => {
                            if(error.code != "permission-denied")
                                window.open("/error.html","_self");
                        });
                    } else {
                        document.getElementById("addToFavoritesError").innerText = "";
                        db.collection("users")
                        .doc(firebase.auth().currentUser.uid)
                        .update({
                            favorites: firebase.firestore.FieldValue.arrayUnion(
                                productSelectionString
                                ),
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            })
                            .then(() => {
                                document.getElementById("favoritesCount").innerText =
                                parseInt(
                                    document.getElementById("favoritesCount").innerText
                                ) + 1;
                                heart.setAttribute("src","/resources/icons/selectedFavorites.svg");
                        }).catch((error) => {
                            if(error.code != "permission-denied")
                                window.open("/error.html","_self");
                        });
                    }
                }
                else
                {
                    document.getElementById("addToFavoritesError").innerText = "";
                    db.collection("users")
                        .doc(firebase.auth().currentUser.uid)
                        .update({
                            favorites: productSelectionString,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        })
                    .then(() => {
                        document.getElementById("favoritesCount").innerText =
                            parseInt(
                                document.getElementById("favoritesCount").innerText
                            ) + 1;
                    }).catch((error) => {
                        if(error.code != "permission-denied")
                            window.open("/error.html","_self");
                    });
                }
            }
        })
        .catch((error) => {
            if(error.code != "permission-denied")
                window.open("/error.html","_self");
        });
}