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
db.collection("women")
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
                    "$" + doc.data().priceBeforeSale + ".00";
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
            productPrice.innerText = "$" + doc.data().price + ".00";

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

            storage
                .ref()
                .child(doc.id + "01big.jpg")
                .getDownloadURL()
                .then((url) => {
                    img1.src = url;
                    img1.setAttribute("onclick", `openImage("${url}")`);
                })
                .catch((error) => {
                    //console.log(error);
                });
            storage
                .ref()
                .child(doc.id + "02big.jpg")
                .getDownloadURL()
                .then((url) => {
                    img2.src = url;
                    img2.setAttribute("onclick", `openImage("${url}")`);
                })
                .catch((error) => {
                    //console.log(error);
                });
            storage
                .ref()
                .child(doc.id + "03big.jpg")
                .getDownloadURL()
                .then((url) => {
                    img3.src = url;
                    img3.setAttribute("onclick", `openImage("${url}")`);
                })
                .catch((error) => {
                    //console.log(error);
                });
            storage
                .ref()
                .child(doc.id + "04big.jpg")
                .getDownloadURL()
                .then((url) => {
                    img4.src = url;
                    img4.setAttribute("onclick", `openImage("${url}")`);
                })
                .catch((error) => {
                    //console.log(error);
                });
        } else {
            console.log("doc not found");
        }
    })
    .catch((error) => {
        console.log("Error getting document:", error);
    });
