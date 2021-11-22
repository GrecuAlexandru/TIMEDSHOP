firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").doc(user.uid).get().then((data)=>{
            data.data().favorites.forEach((item)=>{
                const words = item.split("-");
                var collec =
                    item.charAt(0) == "0" ? "women" : "men";
                var productID = words[0];
                var size = words[1];
                var color = words[2];

                db.collection(collec)
                    .doc(productID)
                    .get()
                    .then((prodData) => {
                        numberOfProducts =
                            document.getElementById("cartOutput")
                                .children.length + 1;
                        if (numberOfProducts <= 3) {
                            document.getElementById(
                                "mainDiv"
                            ).style.height = "90vh";
                        } else {
                            var marginTop = 20 + numberOfProducts * 25;
                            document.getElementById(
                                "mainDiv"
                            ).style.height = marginTop + "vh";
                        }

                        let cartItem = document.createElement("div");
                        cartItem.className = "cartItem";
                        cartItem.id = item;

                        let cartImage = document.createElement("img");
                        cartImage.src =
                            "https://cdn.timedshop.com/" +
                            prodData.id +
                            "01.jpg";
                        cartImage.className = "cartImage";
                        cartImage.setAttribute("onclick","window.open('/product.html?id="+prodData.id+"', '_self')");
                        cartImage.alt = prodData.data().name;
                        cartItem.appendChild(cartImage);

                        let cartTextDiv = document.createElement("div");
                        cartTextDiv.className = "cartTextDiv";
                        cartItem.appendChild(cartTextDiv);

                        let cartItemLimitTitle = document.createElement("div");
                        cartItemLimitTitle.className = "limit";

                        let cartItemTitle = document.createElement("a");
                        cartItemTitle.className = "cartItemTitle";
                        cartItemTitle.setAttribute("onclick","window.open('/product.html?id="+prodData.id+"', '_self')");
                        cartItemTitle.innerText = prodData.data().name;
                        cartItemLimitTitle.appendChild(cartItemTitle);
                        cartTextDiv.appendChild(cartItemLimitTitle);

                        let removeButton = document.createElement("a");
                        removeButton.className = "removeButton";
                        removeButton.setAttribute(
                            "onclick",
                            "removeButton('" + item + "')"
                        );
                        removeButton.innerText = "Remove";
                        cartTextDiv.appendChild(removeButton);

                        let cartItemType = document.createElement("a");
                        cartItemType.className = "cartItemType";
                        if (collec == "women")
                            cartItemType.innerText =
                                "Women's " + prodData.data().type;
                        else
                            cartItemType.innerText =
                                "Men's " + prodData.data().type;
                        cartTextDiv.appendChild(cartItemType);

                        let colorDiv = document.createElement("div");
                        colorDiv.className = "colorDiv";
                        cartTextDiv.appendChild(colorDiv);

                        let cartItemColorTitle =
                            document.createElement("a");
                        cartItemColorTitle.className =
                            "cartItemColorTitle";
                        cartItemColorTitle.innerText = "Color:";
                        colorDiv.appendChild(cartItemColorTitle);

                        let cartItemColor =
                            document.createElement("div");
                        cartItemColor.className = "cartItemColor";
                        cartItemColor.style.backgroundColor = color;
                        colorDiv.appendChild(cartItemColor);

                        let cartItemOptions =
                            document.createElement("div");
                        cartItemOptions.className = "cartItemOptions";
                        cartItemOptions.appendChild(colorDiv)
                        cartTextDiv.appendChild(cartItemOptions);

                        let cartItemSizeTitle =
                            document.createElement("a");
                        cartItemSizeTitle.className =
                            "cartItemSizeTitle";
                        cartItemSizeTitle.innerText = "Size: "+size;
                        cartItemOptions.appendChild(cartItemSizeTitle);

                        let cartItemPrice = document.createElement("a");
                        cartItemPrice.className = "cartItemPrice";
                        cartItemPrice.innerText =
                            "€" + prodData.data().price + ".00";
                        cartTextDiv.appendChild(cartItemPrice);
                        cartOutput.appendChild(cartItem);
                    })
                    .catch((error)=>{
                        if(error.code != "permission.denied")
                            window.open("/error.html","_self");
                    });
            });
        }).catch((error)=>{
            if(error.code != "permission.denied")
                window.open("/error.html","_self");
        });
    } else
    {
        if(error.code != "permission.denied")
            window.open("/error.html","_self");
    }
})

function removeButton(item)
{
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById(item).remove();
            document.getElementById("favoritesCount").innerText =
            parseInt(
                document.getElementById("favoritesCount").innerText
            ) - 1;
            db.collection("users")
                .doc(user.uid)
                .update({
                    favorites: firebase.firestore.FieldValue.arrayRemove(item),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .catch((error)=>{
                if(error.code != "permission.denied")
                    window.open("/error.html","_self");
            });
        }
    });
}