function productDetails(type) {
    let productSpecificType = document.getElementById("productSpecificType");
    let titleOfCriteria = document.getElementById("titleOfCriteria");
    let criteriaUL = document.getElementById("criteriaUL");
    let typeOf = document.getElementById("typeof");
    let madeOf = document.getElementById("madeOf");
    let criteriaLI = document.createElement("li");
    switch (type) {
        case "cruiser":
            productSpecificType.innerText = "Cruiser";

            titleOfCriteria = "THE ICONIC UNISEX HOODIE SWEATSHIRT";

            criteriaLI.innerText = "Set-in sleeve";
            criteriaUL.appendChild(criteriaLI);
            criteriaLI = document.createElement("li");
            criteriaLI.innerText = "Double layered hood in self fabric";
            criteriaUL.appendChild(criteriaLI);
            criteriaLI = document.createElement("li");
            criteriaLI.innerText =
                "Round drawcords in matching body colour with metal tipping";
            criteriaUL.appendChild(criteriaLI);
            criteriaLI = document.createElement("li");
            criteriaLI.innerText = "Metal eyelets";
            criteriaUL.appendChild(criteriaLI);
            criteriaLI = document.createElement("li");
            criteriaLI.innerText = "Inside herringbone back neck tape";
            criteriaUL.appendChild(criteriaLI);
            criteriaLI = document.createElement("li");
            criteriaLI.innerText = "Self fabric half moon at back neck";
            criteriaUL.appendChild(criteriaLI);
            criteriaLI = document.createElement("li");
            criteriaLI.innerText =
                "Single needle topstitch at neckline and along hood opening";
            criteriaUL.appendChild(criteriaLI);
            criteriaLI = document.createElement("li");
            criteriaLI.innerText = "1x1 rib at sleeve hem and bottom hem";
            criteriaUL.appendChild(criteriaLI);
            criteriaLI = document.createElement("li");
            criteriaLI.innerText =
                "Armhole, sleeve hem and bottom hem with twin needle topstitch";
            criteriaUL.appendChild(criteriaLI);
            criteriaLI = document.createElement("li");
            criteriaLI.innerText = "Kangaroo pocket at front";
            criteriaUL.appendChild(criteriaLI);

            typeOf.innerText = "BRUSHED SWEATSHIRT";
            madeOf.innerText =
                "85% ORGANIC RING-SPUN COMBED COTTON, 15% RECYCLED POLYESTER";
            break;
    }
}
