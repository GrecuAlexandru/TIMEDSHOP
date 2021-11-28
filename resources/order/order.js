let params = new URLSearchParams(location.search);
let orderOutput = document.getElementById("orderContent")
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        db.collection("users")
            .doc(user.uid)
            .collection("orders")
            .doc(params.get("id"))
            .get()
            .then((data) => {
                document.getElementById("orderDate").innerText = "Order from "+data.data().orderDate;
                document.getElementById("orderID").innerText = "Order id: "+data.id;
                document.getElementById("country").innerText = data.data().shippingInfo.address.country;
                document.getElementById("city").innerText = data.data().shippingInfo.address.city;
                document.getElementById("line1").innerText = data.data().shippingInfo.address.line1;
                if(!data.data().shippingInfo.address.line2)
                {
                    document.getElementById("line2").innerText = "-";
                }
                else
                {
                    document.getElementById("line2").innerText = data.data().shippingInfo.address.line2;
                }
                if(!data.data().shippingInfo.address.state)
                {
                    document.getElementById("state").innerText = "-";
                }
                else
                {
                    document.getElementById("state").innerText = data.data().shippingInfo.address.state;
                }
                document.getElementById("clientName").innerText = data.data().shippingInfo.name;
                document.getElementById("email").innerText = data.data().email;
                document.getElementById("phone").innerText = data.data().phone;
                var subtotal = 0;
                data.data().items.forEach((itemData)=>{
                    subtotal += itemData.amount_subtotal;
                })
                document.getElementById("subtotalValue").innerText ="€"+(Math.round(subtotal/100.00 * 100) / 100).toFixed(2).toString()
                document.getElementById("totalValue").innerText = "€"+(Math.round(data.data().total/100.00 * 100) / 100).toFixed(2).toString();
            
                
                //order content
                var i = 0;
                data.data().items.forEach((prodData)=>{
                    let orderItem = document.createElement("div");
                    orderItem.className = "orderItem";

                    let orderImage = document.createElement("img");
                    orderImage.src = data.data().desc_img[i].images[0];
                    orderImage.className = "orderImage";
                    orderImage.setAttribute(
                        "onclick",
                        "window.open('/product.html?id=" +
                        data.data().desc_img[i].description.slice(data.data().desc_img[i].description.indexOf("Product ID: ") + "Product ID: ".length) +
                            "', '_self')"
                    );
                    orderImage.alt = data.data().desc_img[i].name;
                    orderItem.appendChild(orderImage);

                    let orderTextDiv = document.createElement("div");
                    orderTextDiv.className = "orderTextDiv";
                    orderItem.appendChild(orderTextDiv);

                    let orderItemTitle = document.createElement("a");
                    orderItemTitle.className = "orderItemTitle";
                    orderItemTitle.setAttribute(
                        "onclick",
                        "window.open('/product.html?id=" +
                            data.data().desc_img[i].description.slice(data.data().desc_img[i].description.indexOf("Product ID: ") + "Product ID: ".length) +
                            "', '_self')"
                    );
                    orderItemTitle.innerText = data.data().desc_img[i].name;
                    orderTextDiv.appendChild(orderItemTitle);

                    let orderItemType = document.createElement("a");
                    orderItemType.className = "orderItemType";
                    orderItemType.innerText = data.data().desc_img[i].description.split("-")[0];
                    orderTextDiv.appendChild(orderItemType);
                    
                    let colorDiv = document.createElement("div");
                    colorDiv.className = "colorDiv";
                    orderTextDiv.appendChild(colorDiv);

                    let orderItemColorTitle =
                        document.createElement("a");
                    orderItemColorTitle.className = "orderItemColorTitle";
                    orderItemColorTitle.innerText = "Color:";
                    colorDiv.appendChild(orderItemColorTitle);

                    let orderItemColor = document.createElement("div");
                    orderItemColor.className = "orderItemColor";
                    orderItemColor.style.backgroundColor = data.data().desc_img[i].description.split("-")[2].substr(0, data.data().desc_img[i].description.split("-")[2].indexOf(' Product')); ;
                    colorDiv.appendChild(orderItemColor);

                    let orderItemOptions = document.createElement("div");
                    orderItemOptions.className = "orderItemOptions";
                    orderItemOptions.appendChild(colorDiv);
                    orderTextDiv.appendChild(orderItemOptions);
                    console.log(data.data().desc_img[i].description.split(" - "))
                    let orderItemSizeTitle = document.createElement("a");
                    orderItemSizeTitle.className = "orderItemSizeTitle";
                    orderItemSizeTitle.innerText = "Size: " + data.data().desc_img[i].description.split("-")[1];
                    orderItemOptions.appendChild(orderItemSizeTitle);

                    let orderItemPrice = document.createElement("a");
                    orderItemPrice.className = "orderItemPrice";
                    let collec;
                    if(data.data().desc_img[i].description.slice(data.data().desc_img[i].description.indexOf("Product ID: ") + "Product ID: ".length)[0] == "0")
                    {
                        collec = "women";
                    }
                    else
                    {
                        collec = "men";
                    }
                    db.collection(collec).doc(data.data().desc_img[i].description.slice(data.data().desc_img[i].description.indexOf("Product ID: ") + "Product ID: ".length)).get().then((zdata)=>{
                        orderItemPrice.innerText ="One Piece:\u00A0\u00A0" + "€" + ((Math.round(zdata.data().price * 100) / 100).toFixed(2)).toString()
                    });

                    orderTextDiv.appendChild(orderItemPrice);

                    let orderItemQuantityTitle = document.createElement("a");
                    orderItemQuantityTitle.className = "orderItemQuantityTitle";
                    orderItemQuantityTitle.innerText = "Quantity: " + prodData.quantity;
                    orderItemOptions.appendChild(orderItemQuantityTitle);
                    
                    orderOutput.appendChild(orderItem);
                    i++;
                });
                loader(true);
            })
            .catch((error) => {
                console.error(error);
                // window.open("/error.html", "_self");
            });
    }
});
