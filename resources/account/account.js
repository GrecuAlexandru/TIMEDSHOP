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
                    //console.error(error);
                });
            })
            .catch((error) => {
                //console.error(error);
                // window.open("/error.html", "_self");
            });
    }
});
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

