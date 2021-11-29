let params = new URLSearchParams(location.search);
var currentPage = params.get("page");
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
var hoodiesCheckbox = document.getElementById("hoodiesCheckbox");
var tshirtsCheckbox = document.getElementById("tshirtsCheckbox");
var shirtsCheckbox = document.getElementById("shirtsCheckbox");
var sweatshirtsCheckbox = document.getElementById("sweatshirtsCheckbox");
var SCheckbox = document.getElementById("SCheckbox");
var MCheckbox = document.getElementById("MCheckbox");
var LCheckbox = document.getElementById("LCheckbox");
var XLCheckbox = document.getElementById("XLCheckbox");
var XXLCheckbox = document.getElementById("XXLCheckbox");
var c = params.get("c");
let openlink;
var ok=0;
let type = params.get("type");
if (type == null) type = "";
if (type.includes("hoodies")) hoodiesCheckbox.checked = true;
if (type.includes("tshir")) tshirtsCheckbox.checked = true;
if (type.includes("shirts")) shirtsCheckbox.checked = true;
if (type.includes("sweatsh")) sweatshirtsCheckbox.checked = true;
// if (
//     !type.includes("hoodies") &&
//     !type.includes("tshir") &&
//     !type.includes("shirts") &&
//     !type.includes("sweatsh") &&
//     window.location.search.includes("type") &&
//     params.get("minPrice")
// )
// {
//     if(params.get("minPrice"))
//     {
//         window.open(
//             "/sale.html?c="+c+
//                 "&type=" +
//                 type +
//                 "&size=" +
//                 size +
//                 "&minPrice=" +
//                 minPrice +
//                 "&maxPrice=" +
//                 maxPrice,
//             "_self"
//         );
//     }
//     else
//         window.open(
//             "/sale.html?c="+c+"&size=" + size,
//             "_self"
//         );
// }
// else
//     window.open(
//         "/sale.html?c="+c+ + "&type=" + type + "&size=" + size,
//         "_self"
//     );


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
        "/sale.html?c="+c+
            "&type=" +
            type,
        "_self"
    );
}
