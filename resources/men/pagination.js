let params = new URLSearchParams(location.search);
var currentPage = params.get("page");
var sortBy = params.get("sortBy");
var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var box3 = document.getElementById("box3");
var box4 = document.getElementById("box4");
var boxLast = document.getElementById("boxLast");
var dots1 = document.getElementById("dots1");
var dots2 = document.getElementById("dots2");
var previousButton = document.getElementById("previousButton");
var nextButton = document.getElementById("nextButton");
var sortByNewArrival = document.getElementById("newArrival");
var sortByPriceLH = document.getElementById("PriceLH");
var sortByPriceHL = document.getElementById("PriceHL");
var hoodiesCheckbox = document.getElementById("hoodiesCheckbox");
var tshirtsCheckbox = document.getElementById("tshirtsCheckbox");
var shirtsCheckbox = document.getElementById("shirtsCheckbox");
var sweatshirtsCheckbox = document.getElementById("sweatshirtsCheckbox");
let openlink;
var ok=0;
let type = params.get("type");
if (type == null) type = "";
if (type.includes("hoodies")) hoodiesCheckbox.checked = true;
if (type.includes("tshir")) tshirtsCheckbox.checked = true;
if (type.includes("shirts")) shirtsCheckbox.checked = true;
if (type.includes("sweatsh")) sweatshirtsCheckbox.checked = true;
if (
    !type.includes("hoodies") &&
    !type.includes("tshir") &&
    !type.includes("shirts") &&
    !type.includes("sweatsh") &&
    window.location.search.includes("type")
)
    ok=1;
if (sortBy == "newArrival")
    document.getElementById("dropdownTitle").innerText = "New Arrival";
if (sortBy == "priceLH")
    document.getElementById("dropdownTitle").innerText = "Price (Low to High)";
if (sortBy == "priceHL")
    document.getElementById("dropdownTitle").innerText = "Price (High to Low)";

sortByNewArrival.setAttribute(
    "href",
    "/men.html?sortBy=newArrival" + "&type=" + type
);
sortByPriceHL.setAttribute(
    "href",
    "/men.html?sortBy=priceHL" + "&type=" + type
);
sortByPriceLH.setAttribute(
    "href",
    "/men.html?sortBy=priceLH" + "&type=" + type
);
if (sortBy == null) {
    if(ok==0)
        window.open(
            "/men.html?sortBy=newArrival" + "&type=" + type,
            "_self"
        );
    else
        window.open(
            "/men.html?sortBy=newArrival",
            "_self"
        );
}

function hoodiesCheckboxPress() {
    if (hoodiesCheckbox.checked == true) type += "hoodies";
    else type = type.replace("hoodies", "");
}

function tshirtsCheckboxPress() {
    if (tshirtsCheckbox.checked == true) type += "tshir";
    else type = type.replace("tshir", "");
}

function shirtsCheckboxPress() {
    if (shirtsCheckbox.checked == true) type += "shirts";
    else type = type.replace("shirts", "");
}

function sweatshirtsCheckboxPress() {
    if (sweatshirtsCheckbox.checked == true) type += "sweatsh";
    else type = type.replace("sweatsh", "");
}

function ApplyFilterButton() {
    window.open(
        "/men.html?sortBy=" +
            sortBy +
            "&type=" +
            type,
        "_self"
    );
}
