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
var maxPages = parseInt(params.get("maxPages"));
var sortByNewArrival = document.getElementById("newArrival");
var sortByPriceLH = document.getElementById("PriceLH");
var sortByPriceHL = document.getElementById("PriceHL");
var hoodiesCheckbox = document.getElementById("hoodiesCheckbox");
var tshirtsCheckbox = document.getElementById("tshirtsCheckbox");
var shirtsCheckbox = document.getElementById("shirtsCheckbox");
var sweatshirtsCheckbox = document.getElementById("sweatshirtsCheckbox");
var SCheckbox = document.getElementById("SCheckbox");
var MCheckbox = document.getElementById("MCheckbox");
var LCheckbox = document.getElementById("LCheckbox");
var XLCheckbox = document.getElementById("XLCheckbox");
var XXLCheckbox = document.getElementById("XXLCheckbox");
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

let size = params.get("size");
if (size == null) size = "";
if (size.includes("small")) SCheckbox.checked = true;
if (size.includes("medium")) MCheckbox.checked = true;
if (size.includes("large")) LCheckbox.checked = true;
if (size.includes("extral")) XLCheckbox.checked = true;
if (size.includes("extraxl")) XXLCheckbox.checked = true;
if (
    !size.includes("small") &&
    !size.includes("medium") &&
    !size.includes("large") &&
    !size.includes("extral") &&
    !size.includes("extraxl") &&
    window.location.search.includes("size")
) {
    params.delete("size");
    location.search = params;
}
if (sortBy == "newArrival")
    document.getElementById("dropdownTitle").innerText = "New Arrival";
if (sortBy == "priceLH")
    document.getElementById("dropdownTitle").innerText = "Price (Low to High)";
if (sortBy == "priceHL")
    document.getElementById("dropdownTitle").innerText = "Price (High to Low)";

sortByNewArrival.setAttribute(
    "href",
    "/women.html?sortBy=newArrival" + "&type=" + type + "&size=" + size
);
sortByPriceHL.setAttribute(
    "href",
    "/women.html?sortBy=priceHL" + "&type=" + type + "&size=" + size
);
sortByPriceLH.setAttribute(
    "href",
    "/women.html?sortBy=priceLH" + "&type=" + type + "&size=" + size
);
if (sortBy == null) {
    currentPage = 1;
    if(ok==0)
        window.open(
            "/women.html?sortBy=newArrival" + "&type=" + type + "&size=" + size,
            "_self"
        );
    else
        window.open(
            "/women.html?sortBy=newArrival&size=" + size,
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

function SCheckboxPress() {
    if (SCheckbox.checked == true) size += "small";
    else size = size.replace("small", "");
}

function MCheckboxPress() {
    if (MCheckbox.checked == true) size += "medium";
    else size = size.replace("medium", "");
}

function LCheckboxPress() {
    if (LCheckbox.checked == true) size += "large";
    else size = size.replace("large", "");
}

function XLCheckboxPress() {
    if (XLCheckbox.checked == true) size += "extral";
    else size = size.replace("extral", "");
}

function XXLCheckboxPress() {
    if (XXLCheckbox.checked == true) size += "extraxl";
    else size = size.replace("extraxl", "");
}

function ApplyFilterButton() {
    var minPriceDatabase = localStorage.getItem(
        "minPriceFromDatabase"
    );
    var maxPriceDatabase = localStorage.getItem(
        "maxPriceFromDatabase"
    );
    var minPrice = document.getElementById("sliderMin").value;
    var maxPrice = document.getElementById("sliderMax").value;
    if(minPriceDatabase == minPrice && maxPriceDatabase == maxPrice)
    {
        window.open(
            "/women.html?sortBy=" +
                sortBy +
                "&type=" +
                type +
                "&size=" +
                size,
            "_self"
        );
    }
    else
    {
        window.open(
            "/women.html?sortBy=" +
                sortBy +
                "&type=" +
                type +
                "&size=" +
                size +
                "&minPrice=" +
                minPrice +
                "&maxPrice=" +
                maxPrice,
            "_self"
        );
    }
}
