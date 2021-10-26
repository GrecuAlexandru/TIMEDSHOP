var selectedSize = "";
var selectedColor = "";

function selectSize(size)
{
    selectedSize = size.toString();
    let selectedSizeBox = document.getElementById(size);
    let sizeSelectDiv = document.getElementById("sizeSelectDiv");
    selectedSizeBox.style.backgroundColor = "#e3c8ff";

    var children = sizeSelectDiv.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if(child.id.toString() != size.toString())
        {
            child.style.backgroundColor = "white";
        }
    }
}

function selectColor(color)
{
    selectedColor = color.toString();
    let selectedColorBox = document.getElementById(color);
    let colorSelectDiv = document.getElementById("colorsDiv");
    selectedColorBox.style.outlineColor = "#5a189a";
    selectedColorBox.style.outlineWidth = "6px";
    selectedColorBox.style.borderWidth = "0";

    var children = colorSelectDiv.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if(child.id.toString() != color.toString())
        {
            child.style.outlineWidth = "0";
        }
    }
}

function addToCart()
{
    console.log(selectedColor, selectedSize);
    if(selectedSize == "" || selectedColor == "")
    {
        document.getElementById("addToCartError").innerText = "Error! You must select a size and a color!";
    }
    else
    {
        document.getElementById("addToCartError").innerText = "";
        console.log("ITEM ADDED");
    }
}