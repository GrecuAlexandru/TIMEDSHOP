function searchPress() {
    if (
        searchInput.value != "" ||
        searchInput.value != " " ||
        searchInput.value != null ||
        searchInput != undefined
    ) {
        const productOutput = document.getElementById("productOutput");
        if (lastSearchInputValue != searchInput.value.toString()) {
            lastSearchInputValue = searchInput.value.toString();
            currentSearchPage = 0;
            resultsSearchNumber = 0;
            totalResults = 0;
            while (productOutput.firstChild) {
                productOutput.firstChild.remove();
            }
            isSearching = true;
        } else {
            if (totalResults == resultsSearchNumber) {
                lastSearchInputValue = searchInput.value.toString();
                currentSearchPage = 0;
                resultsSearchNumber = 0;
                totalResults = 0;
                while (productOutput.firstChild) {
                    productOutput.firstChild.remove();
                }
                isSearching = true;
            }
        }
        var numberOfProducts = 0;
        if (!isSearching) {
            while (productOutput.firstChild) {
                productOutput.firstChild.remove();
            }
            isSearching = true;
        }
        const client = algoliasearch(
            "UGZLD73BEY",
            "a5406a665a110ab2f485d9ed3ecc207b"
        );
        const index = client.initIndex("womenIndex");
        console.log("currentSEarchpeage", currentSearchPage);
        index
            .search(searchInput.value, {
                page: currentSearchPage,
                hitsPerPage: 18,
            })
            .then((response) => {
                console.log(response);
                let hits = response.hits;
                totalResults = response.nbHits;
                hits.forEach((qdoc) => {
                    resultsSearchNumber++;
                    if (resultsSearchNumber == (currentSearchPage + 1) * 18) {
                        currentSearchPage++;
                    }
                    numberOfProducts =
                        document.getElementById("productOutput").children
                            .length;
                    if (numberOfProducts <= 6) {
                        document.getElementById(
                            "fullProductsDiv"
                        ).style.height = "150vh";
                    } else {
                        var marginTop =
                            150 + ~~((numberOfProducts - 6) / 3) * 70;
                        if (numberOfProducts % 3 != 0) {
                            marginTop += 70;
                        }
                        document.getElementById(
                            "fullProductsDiv"
                        ).style.height = marginTop + "vh";
                    }
                    //console.log(qdoc);
                    //product item
                    var product = document.createElement("a");
                    product.setAttribute(
                        "href",
                        "/product.html?id=" + qdoc.objectID
                    );
                    product.className = "product";

                    //productImageDiv
                    var productImageDiv = document.createElement("div");
                    productImageDiv.className = "productImageDiv";
                    product.appendChild(productImageDiv);

                    //productImageDiv
                    var productImageDiv = document.createElement("div");
                    productImageDiv.className = "productImageDiv";
                    product.appendChild(productImageDiv);

                    //productFirstImage
                    var productFirstImage =
                        document.createElement("img");
                    productFirstImage.className = "productImage";
                    productFirstImage.src =
                        "https://timedshop.b-cdn.net/" +
                        qdoc.objectID +
                        "01.jpg";
                    // storage
                    //     .ref()
                    //     .child(qdoc.id + "01.jpg")
                    //     .getDownloadURL()
                    //     .then((url) => {
                    //         productFirstImage.src = url;
                    //     })
                    //     .catch((error) => {
                    //         //console.log(error);
                    //     });

                    //productSecondImage
                    var productSecondImage =
                        document.createElement("img");
                    productSecondImage.className = "productSecondImage";
                    productSecondImage.src =
                        "https://timedshop.b-cdn.net/" +
                        qdoc.objectID +
                        "02.jpg";
                    // storage
                    //     .ref()
                    //     .child(qdoc.id + "02.jpg")
                    //     .getDownloadURL()
                    //     .then((url) => {
                    //         productSecondImage.src = url;
                    //     })
                    //     .catch((error) => {
                    //         //console.log(error);
                    //     });

                    //Append First and Second Image to productImageDiv
                    productImageDiv.appendChild(productFirstImage);
                    productImageDiv.appendChild(productSecondImage);
                    product.appendChild(productImageDiv);

                    //productDividerLine
                    var productDividerLine = document.createElement("div");
                    productDividerLine.className = "productDividerLine";
                    product.appendChild(productDividerLine);

                    //productName
                    var productName = document.createElement("a");
                    productName.className = "productName";
                    productName.innerText = qdoc.name;
                    productDividerLine.appendChild(productName);

                    //productPriceBeforeSale
                    if (!isNaN(qdoc.priceBeforeSale)) {
                        var productSaleDiv = document.createElement("div");
                        productSaleDiv.className = "productSaleDiv";

                        var productPriceBeforeSale =
                            document.createElement("a");
                        productPriceBeforeSale.className =
                            "productPriceBeforeSale";
                        productPriceBeforeSale.innerText =
                            "€" + qdoc.priceBeforeSale + ".00";

                        var productSaleDot = document.createElement("a");
                        productSaleDot.className = "productSaleDivDot";
                        productSaleDot.innerText = "●";

                        var productSaleAmount = document.createElement("a");
                        productSaleAmount.className = "productSaleAmount";
                        productSaleAmount.innerText =
                            (
                                (Math.abs(qdoc.priceBeforeSale - qdoc.price) /
                                    qdoc.priceBeforeSale) *
                                100
                            ).toFixed() + "%";

                        productSaleDiv.appendChild(productPriceBeforeSale);
                        productSaleDiv.appendChild(productSaleDot);
                        productSaleDiv.appendChild(productSaleAmount);
                        productDividerLine.appendChild(productSaleDiv);
                    }

                    //productPrice
                    var productPrice = document.createElement("a");
                    productPrice.className = "productPrice";
                    var price = qdoc.price;
                    productPrice.innerText = "€" + price + ".00";
                    productDividerLine.appendChild(productPrice);

                    //productAvailableSizes
                    var productAvailableSizes = document.createElement("a");
                    productAvailableSizes.className = "productAvailableSizes";
                    let sizes = "";
                    var arraySize = qdoc.sizes.length;
                    for (let i = 0; i < arraySize; i++) {
                        if (i == arraySize - 1) {
                            sizes = sizes + qdoc.sizes[i];
                        } else {
                            sizes = sizes + qdoc.sizes[i] + ", ";
                        }
                    }
                    productAvailableSizes.innerText =
                        "Available sizes: " + sizes;
                    productDividerLine.appendChild(productAvailableSizes);

                    //productAvailableColors
                    var productAvailableColors = document.createElement("div");
                    productAvailableColors.className = "productColors";
                    var productAvailableColorsText =
                        document.createElement("a");
                    productAvailableColorsText.innerText = "Available colors:";
                    productAvailableColorsText.className =
                        "productAvailableColorsText";
                    productAvailableColors.appendChild(
                        productAvailableColorsText
                    );
                    var productColorsLength = qdoc.colors.length;
                    var productColorCircle;
                    for (let i = 0; i < productColorsLength; i++) {
                        productColorCircle = document.createElement("div");
                        productColorCircle.className = "productColorCircle";
                        productColorCircle.style.backgroundColor =
                            qdoc.colors[i];
                        productAvailableColors.appendChild(productColorCircle);
                    }
                    productDividerLine.appendChild(productAvailableColors);

                    product.appendChild(productDividerLine);

                    document
                        .getElementById("productOutput")
                        .insertBefore(product, paginationDiv);
                });
            })
            .catch((error)=>{
                window.open("/error.html","_self");
            });
    }
}

document.getElementById("searchbox").onkeypress = function (e) {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == "Enter") {
        // Enter pressed
        searchPress();
        return false;
    }
};
