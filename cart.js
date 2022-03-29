var total = 0;
function checkout() {
    if(document.getElementById("cartOutput").children.length > 0)
    {
        document.getElementById("checkoutButton").innerText = "LOADING...";
        document.getElementById("checkoutError").innerText = "";
        var items = [];
        firebase.auth().onAuthStateChanged(function (user) {
            let metadataProductIDs = "";
            if (user) {
                db.collection("users")
                    .doc(user.uid)
                    .get()
                    .then((data) => {
                        data.data().cart.forEach((cartItemData) => {
                            if (metadataProductIDs == "") {
                                metadataProductIDs = cartItemData.toString();
                            } else {
                                metadataProductIDs += "+" + cartItemData.toString();
                            }
                            const words = cartItemData.split("-");
                            var collec =
                                cartItemData.charAt(0) == "0" ? "women" : "men";
                            var productID = words[0];
                            var color = words[2];
                            var sizeSelect = document.getElementById(
                                cartItemData + "sizeSelect"
                            );
                            var quantitySelect = document.getElementById(
                                cartItemData + "quantitySelect"
                            );
                            size =
                                sizeSelect.options[sizeSelect.selectedIndex].value;
                            var quantity =
                                quantitySelect.options[quantitySelect.selectedIndex]
                                    .value;
                            console.log(productID, size, quantity, color);

                            let obj = {
                                productID: productID,
                                size: size,
                                quantity: quantity,
                                color: color,
                            };
                            items.push(obj);
                        });
                        callFunction(items, user.uid, metadataProductIDs); // here the firestore cloud function is called
                    });
            }
            else
            {
                var storageCart = JSON.parse(localStorage.getItem("cart")); 
                storageCart.forEach((cartItemData) => {
                    if (metadataProductIDs == "") {
                        metadataProductIDs = cartItemData.toString();
                    } else {
                        metadataProductIDs += "+" + cartItemData.toString();
                    }
                    const words = cartItemData.split("-");
                    var collec =
                        cartItemData.charAt(0) == "0" ? "women" : "men";
                    var productID = words[0];
                    var color = words[2];
                    var sizeSelect = document.getElementById(
                        cartItemData + "sizeSelect"
                    );
                    var quantitySelect = document.getElementById(
                        cartItemData + "quantitySelect"
                    );
                    size =
                        sizeSelect.options[sizeSelect.selectedIndex].value;
                    var quantity =
                        quantitySelect.options[quantitySelect.selectedIndex]
                            .value;
                    console.log(productID, size, quantity, color);

                    let obj = {
                        productID: productID,
                        size: size,
                        quantity: quantity,
                        color: color,
                    };
                    items.push(obj);
                });
                callFunction(items, "NOUSER", metadataProductIDs); // here the firestore cloud function is called
            }
        });
    }
    else
    {
        document.getElementById("checkoutError").innerText = "Cart is empty!"
    }
}
function callFunction(items, userID, metadataProductIDs) {
    const createStripeCheckout = firebase
        .app()
        .functions("europe-west3")
        .httpsCallable("createStripeCheckout");
    const stripe = Stripe(
        "pk_test_51Jyak4DLdZkGDN4tX7gMQNZv5lB5oSrYsXfPfqCSzmDDo0z4MArnHYHPodyLICivIeRfztZBdhCQy1b8rRe2ljT0009vsXy970"
    );
    console.log(items.length);
    createStripeCheckout({
        items: items,
        userID: userID,
        metadataProductIDs: metadataProductIDs,
    }).then((response) => {
        console.log(response);
        const sessionId = response.data.id;
        stripe.redirectToCheckout({
            sessionId: sessionId,
        });
    });
}
function quantityChange() {
    //recalculate total
    var newTotal = 0;
    let cartOutput = document.getElementById("cartOutput");
    for (var i = 0; i < cartOutput.children.length; i++) {
        let quantitySelected =
            cartOutput.children[i].getElementsByClassName(
                "quantitySelected"
            )[0];
        let multiplier = parseInt(
            quantitySelected.options[quantitySelected.selectedIndex].value
        );
        let itemPrice = parseInt(
            cartOutput.children[i]
                .getElementsByClassName("cartItemPrice")[0]
                .innerText.toString()
                .substring(1)
        );
        console.log(itemPrice);
        newTotal += multiplier * itemPrice;
    }
    document.getElementById("totalValue").innerText = "€" + newTotal + ".00";
}
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}
let cartOutput = document.getElementById("cartOutput");
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        db.collection("users")
            .doc(user.uid)
            .get()
            .then((data) => {
                if (data.data().cart) {
                    data.data().cart.forEach((cartData) => {
                        const words = cartData.split("-");
                        var collec =
                            cartData.charAt(0) == "0" ? "women" : "men";
                        var productID = words[0];
                        var size = words[1];
                        var color = words[2];

                        console.log(productID, size, color);

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
                                    ).style.height = "120vh";
                                } else {
                                    var marginTop = 20 + numberOfProducts * 25;
                                    document.getElementById(
                                        "mainDiv"
                                    ).style.height = marginTop + "vh";
                                }

                                let cartItem = document.createElement("div");
                                cartItem.className = "cartItem";
                                cartItem.id = cartData;

                                let cartImage = document.createElement("img");
                                cartImage.src =
                                    "https://cdn.timedshop.com/" +
                                    prodData.id +
                                    "01.jpg";
                                cartImage.className = "cartImage";
                                cartImage.setAttribute(
                                    "onclick",
                                    "window.open('/product.html?id=" +
                                        prodData.id +
                                        "', '_self')"
                                );
                                cartImage.alt = prodData.data().name;
                                cartItem.appendChild(cartImage);

                                let cartTextDiv = document.createElement("div");
                                cartTextDiv.className = "cartTextDiv";
                                cartItem.appendChild(cartTextDiv);

                                let cartItemContainerTitle = document.createElement("div");
                                cartItemContainerTitle.className = "limit";

                                let cartItemTitle = document.createElement("a");
                                cartItemTitle.className = "cartItemTitle";
                                cartItemTitle.setAttribute(
                                    "onclick",
                                    "window.open('/product.html?id=" +
                                        prodData.id +
                                        "', '_self')"
                                );
                                cartItemTitle.innerText = prodData.data().name;
                                cartItemContainerTitle.appendChild(cartItemTitle);
                                cartTextDiv.appendChild(cartItemContainerTitle);

                                

                                let removeButton = document.createElement("a");
                                removeButton.className = "removeButton";
                                removeButton.setAttribute(
                                    "onclick",
                                    "removeButton('" + cartData + "')"
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
                                cartTextDiv.appendChild(cartItemOptions);

                                let cartItemSizeTitle =
                                    document.createElement("a");
                                cartItemSizeTitle.className =
                                    "cartItemSizeTitle";
                                cartItemSizeTitle.innerText = "Size:";
                                cartItemOptions.appendChild(cartItemSizeTitle);

                                let sizeSelected =
                                    document.createElement("select");
                                sizeSelected.className = "sizeSelected";
                                sizeSelected.value = size;
                                sizeSelected.id = cartData + "sizeSelect";
                                cartItemOptions.appendChild(sizeSelected);

                                for (
                                    var i = 0;
                                    i < prodData.data().sizes.length;
                                    i++
                                ) {
                                    let sz = document.createElement("option");
                                    sz.value = prodData.data().sizes[i];
                                    sz.innerText = prodData.data().sizes[i];
                                    sz.setAttribute("autocomplete", "off");
                                    if (sz.value == size) {
                                        sz.setAttribute("selected", "selected");
                                    }
                                    sizeSelected.appendChild(sz);
                                }

                                let cartItemQuantityTitle =
                                    document.createElement("a");
                                cartItemQuantityTitle.className =
                                    "cartItemQuantityTitle";
                                sizeSelected.id = cartData + "sizeSelect";
                                cartItemQuantityTitle.innerText = "Quantity:";
                                cartItemOptions.appendChild(
                                    cartItemQuantityTitle
                                );

                                let quantitySelected =
                                    document.createElement("select");
                                quantitySelected.className = "quantitySelected";
                                quantitySelected.setAttribute(
                                    "onchange",
                                    "quantityChange()"
                                );
                                quantitySelected.id =
                                    cartData + "quantitySelect";
                                cartItemOptions.appendChild(quantitySelected);
                                for (var i = 1; i <= 5; i++) {
                                    let qty = document.createElement("option");
                                    qty.value = i;
                                    qty.innerText = i;
                                    quantitySelected.appendChild(qty);
                                }

                                let cartItemPrice = document.createElement("a");
                                cartItemPrice.className = "cartItemPrice";
                                cartItemPrice.innerText =
                                    "€" + prodData.data().price + ".00";
                                cartTextDiv.appendChild(cartItemPrice);
                                total += prodData.data().price;
                                document.getElementById(
                                    "totalValue"
                                ).innerText = "€" + total + ".00";
                                cartOutput.appendChild(cartItem);
                            });
                    });
                    loader(true);
                } else {
                    cartCount.innerText = 0;
                    loader(true);
                }
            })
            .catch((error) => {
                window.open("/error.html", "_self");
            });
    } else {
        // No user is signed in.
        if (localStorage.getItem("cart")) {
            var localCart = JSON.parse(localStorage.getItem("cart"));
            localCart.forEach((cartData) => {
                const words = cartData.split("-");
                var collec =
                    cartData.charAt(0) == "0" ? "women" : "men";
                var productID = words[0];
                var size = words[1];
                var color = words[2];

                console.log(productID, size, color);

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
                            ).style.height = "120vh";
                        } else {
                            var marginTop = 20 + numberOfProducts * 25;
                            document.getElementById(
                                "mainDiv"
                            ).style.height = marginTop + "vh";
                        }

                        let cartItem = document.createElement("div");
                        cartItem.className = "cartItem";
                        cartItem.id = cartData;

                        let cartImage = document.createElement("img");
                        cartImage.src =
                            "https://cdn.timedshop.com/" +
                            prodData.id +
                            "01.jpg";
                        cartImage.className = "cartImage";
                        cartImage.setAttribute(
                            "onclick",
                            "window.open('/product.html?id=" +
                                prodData.id +
                                "', '_self')"
                        );
                        cartImage.alt = prodData.data().name;
                        cartItem.appendChild(cartImage);

                        let cartTextDiv = document.createElement("div");
                        cartTextDiv.className = "cartTextDiv";
                        cartItem.appendChild(cartTextDiv);

                        let cartItemTitle = document.createElement("a");
                        cartItemTitle.className = "cartItemTitle";
                        cartItemTitle.setAttribute(
                            "onclick",
                            "window.open('/product.html?id=" +
                                prodData.id +
                                "', '_self')"
                        );
                        cartItemTitle.innerText = prodData.data().name;
                        cartTextDiv.appendChild(cartItemTitle);

                        let removeButton = document.createElement("a");
                        removeButton.className = "removeButton";
                        removeButton.setAttribute(
                            "onclick",
                            "removeButton('" + cartData + "')"
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
                        cartTextDiv.appendChild(cartItemOptions);

                        let cartItemSizeTitle =
                            document.createElement("a");
                        cartItemSizeTitle.className =
                            "cartItemSizeTitle";
                        cartItemSizeTitle.innerText = "Size:";
                        cartItemOptions.appendChild(cartItemSizeTitle);

                        let sizeSelected =
                            document.createElement("select");
                        sizeSelected.className = "sizeSelected";
                        sizeSelected.value = size;
                        sizeSelected.id = cartData + "sizeSelect";
                        cartItemOptions.appendChild(sizeSelected);

                        for (
                            var i = 0;
                            i < prodData.data().sizes.length;
                            i++
                        ) {
                            let sz = document.createElement("option");
                            sz.value = prodData.data().sizes[i];
                            sz.innerText = prodData.data().sizes[i];
                            sz.setAttribute("autocomplete", "off");
                            if (sz.value == size) {
                                sz.setAttribute("selected", "selected");
                            }
                            sizeSelected.appendChild(sz);
                        }

                        let cartItemQuantityTitle =
                            document.createElement("a");
                        cartItemQuantityTitle.className =
                            "cartItemQuantityTitle";
                        sizeSelected.id = cartData + "sizeSelect";
                        cartItemQuantityTitle.innerText = "Quantity:";
                        cartItemOptions.appendChild(
                            cartItemQuantityTitle
                        );

                        let quantitySelected =
                            document.createElement("select");
                        quantitySelected.className = "quantitySelected";
                        quantitySelected.setAttribute(
                            "onchange",
                            "quantityChange()"
                        );
                        quantitySelected.id =
                            cartData + "quantitySelect";
                        cartItemOptions.appendChild(quantitySelected);
                        for (var i = 1; i <= 5; i++) {
                            let qty = document.createElement("option");
                            qty.value = i;
                            qty.innerText = i;
                            quantitySelected.appendChild(qty);
                        }

                        let cartItemPrice = document.createElement("a");
                        cartItemPrice.className = "cartItemPrice";
                        cartItemPrice.innerText =
                            "€" + prodData.data().price + ".00";
                        cartTextDiv.appendChild(cartItemPrice);
                        total += prodData.data().price;
                        document.getElementById(
                            "totalValue"
                        ).innerText = "€" + total + ".00";
                        cartOutput.appendChild(cartItem);
                    });
            });
            loader(true);
        } else {
            loader(true);
        }
    }
});

function removeButton(id) {
    console.log(id);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById(id).remove();
            db.collection("users")
                .doc(user.uid)
                .update({
                    cart: firebase.firestore.FieldValue.arrayRemove(id),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                .catch((error) => {
                    window.open("/error.html", "_self");
                });
                localStorage.setItem("cartCount", JSON.stringify(JSON.parse(localStorage.getItem("cartCount"))-1));
                document.getElementById("cartCount").innerText =
                parseInt(
                    document.getElementById("cartCount").innerText
                ) - 1;   
        }
        else
        {
            document.getElementById(id).remove();
            var localStorageCart = JSON.parse(localStorage.getItem("cart"));
            var cartWithRemovedElement = removeItemOnce(localStorageCart, id);
            localStorage.setItem("cart", cartWithRemovedElement);
            localStorage.setItem("cartCount", JSON.stringify(JSON.parse(localStorage.getItem("cartCount"))-1));
            document.getElementById("cartCount").innerText =
                parseInt(
                    document.getElementById("cartCount").innerText
                ) - 1;   
        }
    });
}
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  