let params = new URLSearchParams(location.search);
var currentPage = parseInt(params.get('page'));
var sortBy = params.get('sortBy');
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

let type = params.get("type");
if(type==null)
    type="";
if(type.includes("hoodies"))
    hoodiesCheckbox.checked = true;
if(type.includes("tshir"))
    tshirtsCheckbox.checked = true;
if(type.includes("shirts"))
    shirtsCheckbox.checked = true;
if(type.includes("sweatsh"))
    sweatshirtsCheckbox.checked = true;
if((!type.includes("hoodies") && !type.includes("tshir") && !type.includes("shirts") && !type.includes("sweatsh")) && window.location.search.includes("type"))
    window.open(window.location.pathname + window.location.search.replace("&type=",""),"_self")

let size = params.get("size");
if(size==null)
    size="";
if(size.includes("small"))
    SCheckbox.checked = true;
if(size.includes("medium"))
    MCheckbox.checked = true;
if(size.includes("large"))
    LCheckbox.checked = true;
if(size.includes("extral"))
    XLCheckbox.checked = true;
if(size.includes("extraxl"))
    XXLCheckbox.checked = true;
if((!size.includes("small") && !size.includes("medium") && !size.includes("large") && !size.includes("extral")) && !size.includes("extraxl") && window.location.search.includes("size"))
{
    params.delete("size");
    location.search = params;
}
if(sortBy=="newArrival")
    document.getElementById("dropdownTitle").innerText="New Arrival";
if(sortBy=="priceLH")
    document.getElementById("dropdownTitle").innerText="Price (Low to High)";
if(sortBy=="priceHL")
    document.getElementById("dropdownTitle").innerText="Price (High to Low)";


sortByNewArrival.setAttribute("href", "/women.html?page="+currentPage+"&sortBy=newArrival"+"&type="+type+"&size="+size);
sortByPriceHL.setAttribute("href", "/women.html?page="+currentPage+"&sortBy=priceHL"+"&type="+type+"&size="+size);
sortByPriceLH.setAttribute("href", "/women.html?page="+currentPage+"&sortBy=priceLH"+"&type="+type+"&size="+size);


if(isNaN(currentPage))
{
    currentPage = 1;
    window.open("/women.html?page="+currentPage+"&sortBy=newArrival"+"&type="+type+"&size="+size,"_self")
}

function previousButtonPress(){
    currentPage--;
    window.open("/women.html?page="+currentPage+"&sortBy="+sortBy+"&type="+type+"&size="+size,"_self")
}

function nextButtonPress(){
    currentPage++;
    window.open("/women.html?page="+currentPage+"&sortBy="+sortBy+"&type="+type+"&size="+size,"_self")
}

if(maxPages == 1)
{
    nextButton.disabled = true;
    previousButton.disabled = true;
    box2.style.display = "none";
    box3.style.display = "none";
    box4.style.display = "none";
    boxLast.style.display = "none";
    dots1.style.display = "none";
    dots2.style.display = "none";
}
if(maxPages == 2)
{
    box3.style.display = "none";
    box4.style.display = "none";
    boxLast.style.display = "none";
    dots1.style.display = "none";
    dots2.style.display = "none";
}
if(maxPages == 3)
{
    box4.style.display = "none";
    boxLast.style.display = "none";
    dots1.style.display = "none";
    dots2.style.display = "none";
}
if(maxPages == 4)
{
    boxLast.style.display = "none";
    dots1.style.display = "none";
    dots2.style.display = "none";
}
if(maxPages == 5)
{
    dots1.style.display = "none";
    dots2.style.display = "none";
}
console.log(currentPage)
if(currentPage == 1)
{
    previousButton.disabled = true;

    box1.style.backgroundColor = "#E3C8FF"; //selected
    dots1.style.display = "none";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+currentPage+"&sortBy="+sortBy+"&type="+type+"&size="+size);
    box2.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box3.setAttribute("href", "/women.html?page="+(currentPage+2+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box4.setAttribute("href", "/women.html?page="+(currentPage+3+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy+"&type="+type+"&size="+size);
}
else if(currentPage == 2)
{
    box2.style.backgroundColor = "#E3C8FF"; //selected
    dots1.style.display = "none";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box2.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box3.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box4.setAttribute("href", "/women.html?page="+(currentPage+2+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy+"&type="+type+"&size="+size);
}
else if(currentPage == 3)
{
    box3.style.backgroundColor = "#E3C8FF"; //selected
    dots1.style.display = "none";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+(currentPage-2+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box2.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box3.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box4.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy+"&type="+type+"&size="+size);
}
else if(currentPage >= 4 && currentPage <=maxPages-4)
{
    box2.innerText = currentPage-1;
    box3.innerText = currentPage;
    box4.innerText = currentPage+1;
    box3.style.backgroundColor = "#E3C8FF";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+1+"&sortBy="+sortBy+"&type="+type+"&size="+size);
    box2.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box3.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box4.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy+"&type="+type+"&size="+size);
}
else if(currentPage == maxPages-3)
{
    dots2.style.display = "none";
    box2.innerText = currentPage
    box2.style.backgroundColor = "#E3C8FF";
    box3.innerText = currentPage+1
    box4.innerText = currentPage+2;
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+1+"&sortBy="+sortBy+"&type="+type+"&size="+size);
    box2.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box3.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box4.setAttribute("href", "/women.html?page="+(currentPage+2+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy+"&type="+type+"&size="+size);
}
else if(currentPage == maxPages-2)
{
    dots2.style.display = "none";
    box2.innerText = currentPage-1;
    box3.style.backgroundColor = "#E3C8FF";
    box3.innerText = currentPage;
    box4.innerText = currentPage+1;
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+1+"&sortBy="+sortBy+"&type="+type+"&size="+size);
    box2.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box3.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box4.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy+"&type="+type+"&size="+size);
}
else if(currentPage == maxPages-1)
{
    dots2.style.display = "none";
    box2.innerText = currentPage-2;
    box3.innerText = currentPage-1;
    box4.innerText = currentPage;
    box4.style.backgroundColor = "#E3C8FF";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+1+"&sortBy="+sortBy+"&type="+type+"&size="+size);
    box2.setAttribute("href", "/women.html?page="+(currentPage-2+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box3.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box4.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy+"&type="+type+"&size="+size);
}
else if(currentPage == maxPages)
{
    nextButton.disabled = true;
    
    dots2.style.display = "none";
    box2.innerText = currentPage-3;
    box3.innerText = currentPage-2;
    box4.innerText = currentPage-1;
    boxLast.style.backgroundColor = "#E3C8FF";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+1+"&sortBy="+sortBy+"&type="+type+"&size="+size);
    box2.setAttribute("href", "/women.html?page="+(currentPage-3+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box3.setAttribute("href", "/women.html?page="+(currentPage-2+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    box4.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy+"&type="+type+"&size="+size));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy+"&type="+type+"&size="+size);
}

if(currentPage == maxPages)
{
    nextButton.disabled = true;
}

function hoodiesCheckboxPress(){
    if(hoodiesCheckbox.checked == true)
        type+="hoodies";
    else
        type = type.replace("hoodies","");
}

function tshirtsCheckboxPress(){
    if(tshirtsCheckbox.checked == true)
        type+="tshir";
    else
        type = type.replace("tshir","");
}

function shirtsCheckboxPress(){
    if(shirtsCheckbox.checked == true)
        type+="shirts";
    else
        type = type.replace("shirts","");
}

function sweatshirtsCheckboxPress(){
    if(sweatshirtsCheckbox.checked == true)
        type+="sweatsh";
    else
        type = type.replace("sweatsh","");
}

function SCheckboxPress(){
    if(SCheckbox.checked == true)
        size+="small";
    else
        size = size.replace("small","");
}

function MCheckboxPress(){
    if(MCheckbox.checked == true)
        size+="medium";
    else
        size = size.replace("medium","");
}

function LCheckboxPress(){
    if(LCheckbox.checked == true)
        size+="large";
    else
        size = size.replace("large","");
}

function XLCheckboxPress(){
    if(XLCheckbox.checked == true)
        size+="extral";
    else
        size = size.replace("extral","");
}

function XXLCheckboxPress(){
    if(XXLCheckbox.checked == true)
        size+="extraxl";
    else
        size = size.replace("extraxl","");
}

function ApplyFilterButton()
{
    var minPrice = document.getElementById("sliderMin").value;
    var maxPrice = document.getElementById("sliderMax").value;
    window.open("/women.html?page="+currentPage+"&sortBy="+sortBy+"&type="+type+"&size="+size+"&minPrice="+minPrice+"&maxPrice="+maxPrice,"_self");
}