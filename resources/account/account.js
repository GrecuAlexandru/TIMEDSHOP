firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        db.collection("users")
            .doc(user.uid)
            .get()
            .then((data) => {
                console.log(data.data());
                document.getElementById("accountName").innerText =
                    data.data().firstName + " " + data.data().lastName;
                document.getElementById("firstName").innerText =
                    data.data().firstName;
                document.getElementById("lastName").innerText =
                    data.data().lastName;
                document.getElementById("email").innerText = data.data().email;
                document.getElementById("gender").innerText =
                    capitalizeFirstLetter(data.data().gender);

                var orderOutput = document.getElementById("ordersDiv");

                db.collection("users").doc(user.uid).collection("orders").get().then((querySnapshot)=>{
                    querySnapshot.forEach((prodData)=>{
                        console.log(prodData.data());
                        
                        let orderItem = document.createElement("div");
                        orderItem.className = "orderItem";

                        let orderDateViewDiv = document.createElement("div");
                        orderDateViewDiv.className = "orderDateViewDiv";

                        let orderDate = document.createElement("a");
                        orderDate.className = "orderDate";
                        orderDate.innerText = "Order from " + prodData.data().orderDate.toString();
                        orderDateViewDiv.appendChild(orderDate);

                        let orderLittleDot = document.createElement("a");
                        orderLittleDot.className = "littleDot";
                        orderLittleDot.innerText = "•";
                        orderDateViewDiv.appendChild(orderLittleDot);

                        let orderButton = document.createElement("a");
                        orderButton.className = "orderButton";
                        orderButton.href = "/order.html?id="+prodData.id;
                        orderButton.innerHTML = "View";
                        orderDateViewDiv.appendChild(orderButton);

                        let orderImages = document.createElement("div");
                        orderImages.className = "orderImages";
                        
                        prodData.data().desc_img.forEach((descIMG)=>{
                            let prodID = descIMG.description.slice(descIMG.description.indexOf("Product ID: ") + "Product ID: ".length);
                            let orderImage = document.createElement("img");
                            orderImage.className = "orderImage";
                            orderImage.src = "https://cdn.timedshop.com/" + prodID + "01.jpg";
                            orderImages.appendChild(orderImage);
                        })
                        orderItem.appendChild(orderDateViewDiv);
                        orderItem.appendChild(orderImages);
                        orderOutput.appendChild(orderItem);
                    });
                    loader(true);
                })
                .catch(error=>{
                    console.error(error);
                });
                // data.data().orders.forEach((item) => {
                //     const words = item.split("-");
                //     var collec = item.charAt(0) == "0" ? "women" : "men";
                //     var productID = words[0];
                //     var size = words[1];
                //     var color = words[2];

                //     db.collection(collec)
                //         .doc(productID)
                //         .get()
                //         .then((prodData) => {
                //             numberOfProducts =
                //                 document.getElementById("ordersDiv").children
                //                     .length + 1;
                //             if (numberOfProducts <= 3) {
                //                 document.getElementById(
                //                     "mainDiv"
                //                 ).style.height = "90vh";
                //             } else {
                //                 var marginTop = 20 + numberOfProducts * 25;
                //                 document.getElementById(
                //                     "mainDiv"
                //                 ).style.height = marginTop + "vh";
                //             }

                //             let orderItem = document.createElement("div");
                //             orderItem.className = "orderItem";
                //             orderItem.id = item;

                //             let orderImage = document.createElement("img");
                //             orderImage.src =
                //                 "https://cdn.timedshop.com/" +
                //                 prodData.id +
                //                 "01.jpg";
                //             orderImage.className = "orderImage";
                //             orderImage.setAttribute(
                //                 "onclick",
                //                 "window.open('/product.html?id=" +
                //                     prodData.id +
                //                     "', '_self')"
                //             );
                //             orderImage.alt = prodData.data().name;
                //             orderItem.appendChild(orderImage);

                //             let orderTextDiv = document.createElement("div");
                //             orderTextDiv.className = "orderTextDiv";
                //             orderItem.appendChild(orderTextDiv);

                //             let orderItemTitle = document.createElement("a");
                //             orderItemTitle.className = "orderItemTitle";
                //             orderItemTitle.setAttribute(
                //                 "onclick",
                //                 "window.open('/product.html?id=" +
                //                     prodData.id +
                //                     "', '_self')"
                //             );
                //             orderItemTitle.innerText = prodData.data().name;
                //             orderTextDiv.appendChild(orderItemTitle);

                //             let orderItemType = document.createElement("a");
                //             orderItemType.className = "orderItemType";
                //             if (collec == "women")
                //                 orderItemType.innerText =
                //                     "Women's " + prodData.data().type;
                //             else
                //                 orderItemType.innerText =
                //                     "Men's " + prodData.data().type;
                //             orderTextDiv.appendChild(orderItemType);
                            
                //             let orderedDate = document.createElement("a");
                //             orderedDate.className = "orderedDate";
                //             orderedDate.innerText = "Ordered on: "+prodDate.data().

                //             let colorDiv = document.createElement("div");
                //             colorDiv.className = "colorDiv";
                //             orderTextDiv.appendChild(colorDiv);

                //             let orderItemColorTitle =
                //                 document.createElement("a");
                //             orderItemColorTitle.className = "orderItemColorTitle";
                //             orderItemColorTitle.innerText = "Color:";
                //             colorDiv.appendChild(orderItemColorTitle);

                //             let orderItemColor = document.createElement("div");
                //             orderItemColor.className = "orderItemColor";
                //             orderItemColor.style.backgroundColor = color;
                //             colorDiv.appendChild(orderItemColor);

                //             let orderItemOptions = document.createElement("div");
                //             orderItemOptions.className = "orderItemOptions";
                //             orderItemOptions.appendChild(colorDiv);
                //             orderTextDiv.appendChild(orderItemOptions);

                //             let orderItemSizeTitle = document.createElement("a");
                //             orderItemSizeTitle.className = "orderItemSizeTitle";
                //             orderItemSizeTitle.innerText = "Size: " + size;
                //             orderItemOptions.appendChild(orderItemSizeTitle);

                //             let orderItemPrice = document.createElement("a");
                //             orderItemPrice.className = "orderItemPrice";
                //             orderItemPrice.innerText =
                //                 "$" + prodData.data().price + ".00";
                //             orderTextDiv.appendChild(orderItemPrice);
                //             orderOutput.appendChild(orderItem);
                //         })
                //         .catch((error) => {
                //             console.error(error);
                //             // window.open("/error.html","_self");
                //         });
                // });
            })
            .catch((error) => {
                console.error(error);
                // window.open("/error.html", "_self");
            });
    }
});
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

