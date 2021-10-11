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
var maxPages = 99;
var sortByNewArrival = document.getElementById("newArrival");
var sortByPriceLH = document.getElementById("PriceLH");
var sortByPriceHL = document.getElementById("PriceHL");

if(sortBy=="newArrival")
    document.getElementById("dropdownTitle").innerText="New Arrival";
if(sortBy=="priceLH")
    document.getElementById("dropdownTitle").innerText="Price (Low to High)";
if(sortBy=="priceHL")
    document.getElementById("dropdownTitle").innerText="Price (High to Low)";


sortByNewArrival.setAttribute("href", "/women.html?page="+currentPage+"&sortBy=newArrival");
sortByPriceHL.setAttribute("href", "/women.html?page="+currentPage+"&sortBy=priceHL");
sortByPriceLH.setAttribute("href", "/women.html?page="+currentPage+"&sortBy=priceLH");


if(isNaN(currentPage))
{
    currentPage = 1;
    window.open("/women.html?page="+currentPage+"&sortBy=newArrival","_self")
}

function previousButtonPress(){
    currentPage--;
    window.open("/women.html?page="+currentPage+"&sortBy="+sortBy,"_self")
}

function nextButtonPress(){
    currentPage++;
    window.open("/women.html?page="+currentPage+"&sortBy="+sortBy,"_self")
}

if(currentPage == 1)
{
    previousButton.disabled = true;

    box1.style.backgroundColor = "#E3C8FF"; //selected
    dots1.style.display = "none";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+currentPage+"&sortBy="+sortBy);
    box2.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy));
    box3.setAttribute("href", "/women.html?page="+(currentPage+2+"&sortBy="+sortBy));
    box4.setAttribute("href", "/women.html?page="+(currentPage+3+"&sortBy="+sortBy));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy);
}
if(currentPage == 2)
{
    box2.style.backgroundColor = "#E3C8FF"; //selected
    dots1.style.display = "none";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy));
    box2.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy));
    box3.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy));
    box4.setAttribute("href", "/women.html?page="+(currentPage+2+"&sortBy="+sortBy));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy);
}
if(currentPage == 3)
{
    box3.style.backgroundColor = "#E3C8FF"; //selected
    dots1.style.display = "none";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+(currentPage-2+"&sortBy="+sortBy));
    box2.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy));
    box3.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy));
    box4.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy);
}
if(currentPage >= 4 && currentPage <=maxPages-4)
{
    box2.innerText = currentPage-1;
    box3.innerText = currentPage;
    box4.innerText = currentPage+1;
    box3.style.backgroundColor = "#E3C8FF";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+1+"&sortBy="+sortBy);
    box2.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy));
    box3.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy));
    box4.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy);
}
if(currentPage == maxPages-3)
{
    dots2.style.display = "none";
    box2.innerText = currentPage
    box2.style.backgroundColor = "#E3C8FF";
    box3.innerText = currentPage+1
    box4.innerText = currentPage+2;
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+1+"&sortBy="+sortBy);
    box2.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy));
    box3.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy));
    box4.setAttribute("href", "/women.html?page="+(currentPage+2+"&sortBy="+sortBy));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy);
}
if(currentPage == maxPages-2)
{
    dots2.style.display = "none";
    box2.innerText = currentPage-1;
    box3.style.backgroundColor = "#E3C8FF";
    box3.innerText = currentPage;
    box4.innerText = currentPage+1;
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+1+"&sortBy="+sortBy);
    box2.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy));
    box3.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy));
    box4.setAttribute("href", "/women.html?page="+(currentPage+1+"&sortBy="+sortBy));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy);
}
if(currentPage == maxPages-1)
{
    dots2.style.display = "none";
    box2.innerText = currentPage-2;
    box3.innerText = currentPage-1;
    box4.innerText = currentPage;
    box4.style.backgroundColor = "#E3C8FF";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+1+"&sortBy="+sortBy);
    box2.setAttribute("href", "/women.html?page="+(currentPage-2+"&sortBy="+sortBy));
    box3.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy));
    box4.setAttribute("href", "/women.html?page="+(currentPage+"&sortBy="+sortBy));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy);
}
if(currentPage == maxPages)
{
    nextButton.disabled = true;
    
    dots2.style.display = "none";
    box2.innerText = currentPage-3;
    box3.innerText = currentPage-2;
    box4.innerText = currentPage-1;
    boxLast.style.backgroundColor = "#E3C8FF";
    boxLast.innerText = maxPages;

    box1.setAttribute("href", "/women.html?page="+1);
    box2.setAttribute("href", "/women.html?page="+(currentPage-3+"&sortBy="+sortBy));
    box3.setAttribute("href", "/women.html?page="+(currentPage-2+"&sortBy="+sortBy));
    box4.setAttribute("href", "/women.html?page="+(currentPage-1+"&sortBy="+sortBy));
    boxLast.setAttribute("href", "/women.html?page="+maxPages+"&sortBy="+sortBy);
}
