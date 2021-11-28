let params = new URLSearchParams(location.search);

function displayProductDetailsModal() {
    document.getElementById("productDetailsModal").style.display = "flex";
    document.getElementById("productDetailsModal").style.visibility = "visible";
}
function closeProductDetailsModal() {
    document.getElementById("productDetailsModal").style.display = "none";
    document.getElementById("productDetailsModal").style.display = "hidden";
}
function openImage(imgsrc) {
    document.getElementById("fullScreenImageModal").style.display = "flex";
    document.getElementById("fullScreenImageModal").style.visibility =
        "visible";
    document.getElementById("fullScreenImage").setAttribute("src", imgsrc);
}
function closeImage() {
    document.getElementById("fullScreenImageModal").style.display = "none";
    document.getElementById("fullScreenImageModal").style.display = "hidden";
}

// Initialize Firebase
const db = firebase.firestore();
const storage = firebase.storage();
var collec;
if(params.get("id").toString().indexOf(0) == "0")
    collec = "women";
else
    collec = "men";
db.collection(collec)
    .doc(params.get("id"))
    .get()
    .then((doc) => {
        if (doc.exists) {
            //productTitle
            let productTitle = document.getElementById("productTitle");
            productTitle.innerText = doc.data().name.toUpperCase();

            document.title = doc.data().name + " - Timed";
            //productPriceBeforeSale
            let productSaleDiv = document.getElementById("productSaleDiv");
            if (!isNaN(doc.data().priceBeforeSale)) {
                let productPriceBeforeSale = document.getElementById(
                    "productPriceBeforeSale"
                );
                productPriceBeforeSale.innerText =
                    "€" + doc.data().priceBeforeSale + ".00";
                let priceSaleAmount =
                    document.getElementById("priceSaleAmount");
                productSaleAmount.innerText =
                    (
                        (Math.abs(
                            doc.data().priceBeforeSale - doc.data().price
                        ) /
                            doc.data().priceBeforeSale) *
                        100
                    ).toFixed() + "%";
            } else {
                productSaleDiv.style.display = "none";
                productTitle.style.marginBottom = "2vh";
            }

            //productPrice
            let productPrice = document.getElementById("productPrice");
            productPrice.innerText = "€" + doc.data().price + ".00";

            //sizes
            let sizes = doc.data().sizes;
            var arraySize = sizes.length;
            let sizeSelectDiv = document.getElementById("sizeSelectDiv");
            for (let i = 0; i < arraySize; i++) {
                let sizeBox = document.createElement("button");
                sizeBox.className = "sizeBox";
                sizeBox.id = sizes[i].toString();
                sizeBox.setAttribute("onclick", `selectSize("${sizeBox.id}")`);

                let sizeBoxText = document.createElement("a");
                sizeBoxText.className = "sizeBoxText";
                sizeBoxText.innerText = sizes[i].toString().toUpperCase();

                sizeBox.appendChild(sizeBoxText);
                sizeSelectDiv.appendChild(sizeBox);
            }

            //colors
            let colors = doc.data().colors;
            let colorsSize = colors.length;
            let colorsDiv = document.getElementById("colorsDiv");
            for (let i = 0; i < colorsSize; i++) {
                let colorBox = document.createElement("button");
                colorBox.className = "colorBox";
                colorBox.id = colors[i].toString();
                colorBox.setAttribute(
                    "onclick",
                    `selectColor("${colors[i].toString()}")`
                );
                colorBox.style.backgroundColor = colors[i];
                colorsDiv.appendChild(colorBox);
            }

            //productDetails
            productDetails(doc.data().productDetails);

            //images
            let img1 = document.getElementById("img1");
            let img2 = document.getElementById("img2");
            let img3 = document.getElementById("img3");
            let img4 = document.getElementById("img4");
            img1.src = "https://cdn.timedshop.com/"+doc.id+"01big.jpg";
            img1.setAttribute("onclick", `openImage("https://cdn.timedshop.com/${doc.id}01big.jpg")`);
            img2.src = "https://cdn.timedshop.com/"+doc.id+"02big.jpg";
            img2.setAttribute("onclick", `openImage("https://cdn.timedshop.com/${doc.id}02big.jpg")`);
            img3.src = "https://cdn.timedshop.com/"+doc.id+"03big.jpg";
            img3.setAttribute("onclick", `openImage("https://cdn.timedshop.com/${doc.id}03big.jpg")`);
            img4.src = "https://cdn.timedshop.com/"+doc.id+"04big.jpg";
            img4.setAttribute("onclick", `openImage("https://cdn.timedshop.com/${doc.id}04big.jpg")`);
            // storage
            //     .ref()
            //     .child(doc.id + "01big.jpg")
            //     .getDownloadURL()
            //     .then((url) => {
            //         img1.src = url;
            //         img1.setAttribute("onclick", `openImage("${url}")`);
            //     })
            //     .catch((error) => {
            //         //console.log(error);
            //     });
            
        } else {
            window.open("/error.html","_self");
        }
        loader(true);
    })
    .catch((error) => {
        window.open("/error.html","_self");
    });
let heart = document.getElementById("favoritesIMGButton");
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        db.collection("users")
            .doc(uid)
            .get()
            .then((data) => {
                if(data.data().favorites)
                {
                    if(data.data().favorites.find(a => a.includes(params.get("id"))))
                    {
                        heart.setAttribute("src","/resources/icons/selectedFavorites.svg");
                    }
                    else
                    {
                        heart.setAttribute("src","/resources/icons/favorites.svg");
                    }
                }
            })
            .catch((error) => {
                window.open("/error.html","_self");
            });
    } else {
        //user is signed out
        document.getElementById("addToFavorites").remove();
    }
});