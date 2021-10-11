import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
import { doc, collection, setDoc, addDoc, deleteField, updateDoc, getDocs, getFirestore, query, orderBy, limit, startAfter, startAt } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"; 
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkBvDNzSvorpEdz2twDAVI09x-FaVsDGg",
  authDomain: "timedshop-a5a66.firebaseapp.com",
  projectId: "timedshop-a5a66",
  storageBucket: "timedshop-a5a66.appspot.com",
  messagingSenderId: "172835576987",
  appId: "1:172835576987:web:2e588ca7a77cc008affa3e",
  measurementId: "G-3VCHXLRX5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage(app);
let querySnapshot;

let params = new URLSearchParams(location.search);
var currentPage = parseInt(params.get('page'));
var sortBy = params.get("sortBy");
let q;
const productOutput = document.getElementById("productOutput");
const paginationDiv = document.getElementById("paginationDiv");
var idd = 1203;


// select the target node
var target = document.getElementById("dropdownTitle");
// create an observer instance
if(sortBy=="newArrival")
{
  if(currentPage > 1)
  {
    var resultsUntilStart = ((currentPage-1)*18)-1;
    const preQuery = query(collection(db, "women"), orderBy("date", "desc"), limit(resultsUntilStart)); 
    const preQuerySnapshots = await getDocs(preQuery);
    var lastVisibleQueryFromPrevPage = preQuerySnapshots.docs[preQuerySnapshots.docs.length - 1];
    console.log(lastVisibleQueryFromPrevPage.id);
    q = query(collection(db, "women"), orderBy("date", "desc"), startAfter(lastVisibleQueryFromPrevPage), limit(18)); 
  }
  else
  {
    q = query(collection(db, "women"), orderBy("date", "desc"), limit(18));
  }
  document.querySelectorAll('.product').forEach(e => e.remove());
  querySnapshot = await getDocs(q);
  querySnapshot.forEach((qdoc) => {
    //console.log(new Date(qdoc.data().date * 1000));
    // idd++;
    // const docRef = setDoc(doc(db, "women",idd.toString()),qdoc.data());

    //product item
    var product = document.createElement("div");
    product.className = "product";
    
    //productImageDiv
    var productImageDiv = document.createElement("div");
    productImageDiv.className = "productImageDiv";
    product.appendChild(productImageDiv);

    //productFirstImage
    var productFirstImage = document.createElement("img");
    productFirstImage.className = "productImage";
    getDownloadURL(ref(storage, qdoc.id+"01.jpg"))
    .then((url) => {
      productFirstImage.src = url;
    })
    .catch((error) => {
      console.log(error);
    });
    
    //productSecondImage
    var productSecondImage = document.createElement("img");
    productSecondImage.className = "productSecondImage";
    getDownloadURL(ref(storage, qdoc.id+"02.jpg"))
    .then((url) => {
      productSecondImage.src = url;
    })
    .catch((error) => {
      console.log(error);
    });

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
    productName.innerText = qdoc.data().name;
    productDividerLine.appendChild(productName);

    //productPriceBeforeSale
    if(!isNaN(qdoc.data().priceBeforeSale))
    {
      var productPriceBeforeSale = document.createElement("a");
      productPriceBeforeSale.className = "productPriceBeforeSale";
      productPriceBeforeSale.innerText = "$" + qdoc.data().priceBeforeSale + ".00";
      productDividerLine.appendChild(productPriceBeforeSale);
    }

    //productPrice
    var productPrice = document.createElement("a");
    productPrice.className = "productPrice";
    var price =  qdoc.data().price;
    productPrice.innerText =  "$" + price + ".00";
    productDividerLine.appendChild(productPrice);

    //productAvailableSizes
    var productAvailableSizes = document.createElement("a");
    productAvailableSizes.className = "productAvailableSizes";
    let sizes = "";
    var arraySize = qdoc.data().sizes.length;
    for(let i = 0; i< arraySize; i++)
    {
      if(i == arraySize-1)
      {
        sizes = sizes + qdoc.data().sizes[i];
      } 
      else
      {
        sizes = sizes + qdoc.data().sizes[i] + ", ";
      }
        
    }
    productAvailableSizes.innerText = "Available sizes: " + sizes;
    productDividerLine.appendChild(productAvailableSizes);


    //productAvailableColors
    var productAvailableColors = document.createElement("div");
    productAvailableColors.className = "productColors";
    var productAvailableColorsText = document.createElement("a");
    productAvailableColorsText.innerText = "Available colors:";
    productAvailableColorsText.className = "productAvailableColorsText";
    productAvailableColors.appendChild(productAvailableColorsText);
    var productColorsLength = qdoc.data().colors.length;
    var productColorCircle;
    for(let i=0; i< productColorsLength; i++)
    {
      productColorCircle = document.createElement("div");
      productColorCircle.className = "productColorCircle";
      productColorCircle.style.backgroundColor = qdoc.data().colors[i];
      productAvailableColors.appendChild(productColorCircle);
    }
    productDividerLine.appendChild(productAvailableColors);

    product.appendChild(productDividerLine);

    document.getElementById("productOutput").insertBefore(product, paginationDiv);
  });
}else if(sortBy=="priceHL")
{
  if(currentPage > 1)
  {
    var resultsUntilStart = ((currentPage-1)*18)-1;
    const preQuery = query(collection(db, "women"), orderBy("price", "desc"), limit(resultsUntilStart)); 
    const preQuerySnapshots = await getDocs(preQuery);
    var lastVisibleQueryFromPrevPage = preQuerySnapshots.docs[preQuerySnapshots.docs.length - 1];
    console.log(lastVisibleQueryFromPrevPage.id);
    q = query(collection(db, "women"), orderBy("price", "desc"), startAfter(lastVisibleQueryFromPrevPage), limit(18)); 
  }
  else
  {
    q = query(collection(db, "women"), orderBy("price", "desc"), limit(18));
  }
  document.querySelectorAll('.product').forEach(e => e.remove());
  querySnapshot = await getDocs(q);
  querySnapshot.forEach((qdoc) => {
    //console.log(new Date(qdoc.data().date * 1000));
    // idd++;
    // const docRef = setDoc(doc(db, "women",idd.toString()),qdoc.data());

    //product item
    var product = document.createElement("div");
    product.className = "product";
    
    //productImageDiv
    var productImageDiv = document.createElement("div");
    productImageDiv.className = "productImageDiv";
    product.appendChild(productImageDiv);

    //productFirstImage
    var productFirstImage = document.createElement("img");
    productFirstImage.className = "productImage";
    getDownloadURL(ref(storage, qdoc.id+"01.jpg"))
    .then((url) => {
      productFirstImage.src = url;
    })
    .catch((error) => {
      console.log(error);
    });
    
    //productSecondImage
    var productSecondImage = document.createElement("img");
    productSecondImage.className = "productSecondImage";
    getDownloadURL(ref(storage, qdoc.id+"02.jpg"))
    .then((url) => {
      productSecondImage.src = url;
    })
    .catch((error) => {
      console.log(error);
    });

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
    productName.innerText = qdoc.data().name;
    productDividerLine.appendChild(productName);

    //productPriceBeforeSale
    if(!isNaN(qdoc.data().priceBeforeSale))
    {
      var productPriceBeforeSale = document.createElement("a");
      productPriceBeforeSale.className = "productPriceBeforeSale";
      productPriceBeforeSale.innerText = "$" + qdoc.data().priceBeforeSale + ".00";
      productDividerLine.appendChild(productPriceBeforeSale);
    }

    //productPrice
    var productPrice = document.createElement("a");
    productPrice.className = "productPrice";
    var price =  qdoc.data().price;
    productPrice.innerText =  "$" + price + ".00";
    productDividerLine.appendChild(productPrice);

    //productAvailableSizes
    var productAvailableSizes = document.createElement("a");
    productAvailableSizes.className = "productAvailableSizes";
    let sizes = "";
    var arraySize = qdoc.data().sizes.length;
    for(let i = 0; i< arraySize; i++)
    {
      if(i == arraySize-1)
      {
        sizes = sizes + qdoc.data().sizes[i];
      } 
      else
      {
        sizes = sizes + qdoc.data().sizes[i] + ", ";
      }
        
    }
    productAvailableSizes.innerText = "Available sizes: " + sizes;
    productDividerLine.appendChild(productAvailableSizes);


    //productAvailableColors
    var productAvailableColors = document.createElement("div");
    productAvailableColors.className = "productColors";
    var productAvailableColorsText = document.createElement("a");
    productAvailableColorsText.innerText = "Available colors:";
    productAvailableColorsText.className = "productAvailableColorsText";
    productAvailableColors.appendChild(productAvailableColorsText);
    var productColorsLength = qdoc.data().colors.length;
    var productColorCircle;
    for(let i=0; i< productColorsLength; i++)
    {
      productColorCircle = document.createElement("div");
      productColorCircle.className = "productColorCircle";
      productColorCircle.style.backgroundColor = qdoc.data().colors[i];
      productAvailableColors.appendChild(productColorCircle);
    }
    productDividerLine.appendChild(productAvailableColors);

    product.appendChild(productDividerLine);

    document.getElementById("productOutput").insertBefore(product, paginationDiv);
  });
} else if(sortBy=="priceLH")
{
  if(currentPage > 1)
  {
    var resultsUntilStart = ((currentPage-1)*18)-1;
    const preQuery = query(collection(db, "women"), orderBy("price", "asc"), limit(resultsUntilStart)); 
    const preQuerySnapshots = await getDocs(preQuery);
    var lastVisibleQueryFromPrevPage = preQuerySnapshots.docs[preQuerySnapshots.docs.length - 1];
    console.log(lastVisibleQueryFromPrevPage.id);
    q = query(collection(db, "women"), orderBy("price", "asc"), startAfter(lastVisibleQueryFromPrevPage), limit(18)); 
  }
  else
  {
    q = query(collection(db, "women"), orderBy("price", "asc"), limit(18));
  }
  document.querySelectorAll('.product').forEach(e => e.remove());
  querySnapshot = await getDocs(q);
  querySnapshot.forEach((qdoc) => {
    console.log(qdoc.data().price);
    //console.log(new Date(qdoc.data().date * 1000));
    // idd++;
    // const docRef = setDoc(doc(db, "women",idd.toString()),qdoc.data());

    //product item
    var product = document.createElement("div");
    product.className = "product";
    
    //productImageDiv
    var productImageDiv = document.createElement("div");
    productImageDiv.className = "productImageDiv";
    product.appendChild(productImageDiv);

    //productFirstImage
    var productFirstImage = document.createElement("img");
    productFirstImage.className = "productImage";
    getDownloadURL(ref(storage, qdoc.id+"01.jpg"))
    .then((url) => {
      productFirstImage.src = url;
    })
    .catch((error) => {
      console.log(error);
    });
    
    //productSecondImage
    var productSecondImage = document.createElement("img");
    productSecondImage.className = "productSecondImage";
    getDownloadURL(ref(storage, qdoc.id+"02.jpg"))
    .then((url) => {
      productSecondImage.src = url;
    })
    .catch((error) => {
      console.log(error);
    });

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
    productName.innerText = qdoc.data().name;
    productDividerLine.appendChild(productName);

    //productPriceBeforeSale
    if(!isNaN(qdoc.data().priceBeforeSale))
    {
      var productPriceBeforeSale = document.createElement("a");
      productPriceBeforeSale.className = "productPriceBeforeSale";
      productPriceBeforeSale.innerText = "$" + qdoc.data().priceBeforeSale + ".00";
      productDividerLine.appendChild(productPriceBeforeSale);
    }

    //productPrice
    var productPrice = document.createElement("a");
    productPrice.className = "productPrice";
    var price =  qdoc.data().price;
    productPrice.innerText =  "$" + price + ".00";
    productDividerLine.appendChild(productPrice);

    //productAvailableSizes
    var productAvailableSizes = document.createElement("a");
    productAvailableSizes.className = "productAvailableSizes";
    let sizes = "";
    var arraySize = qdoc.data().sizes.length;
    for(let i = 0; i< arraySize; i++)
    {
      if(i == arraySize-1)
      {
        sizes = sizes + qdoc.data().sizes[i];
      } 
      else
      {
        sizes = sizes + qdoc.data().sizes[i] + ", ";
      }
        
    }
    productAvailableSizes.innerText = "Available sizes: " + sizes;
    productDividerLine.appendChild(productAvailableSizes);


    //productAvailableColors
    var productAvailableColors = document.createElement("div");
    productAvailableColors.className = "productColors";
    var productAvailableColorsText = document.createElement("a");
    productAvailableColorsText.innerText = "Available colors:";
    productAvailableColorsText.className = "productAvailableColorsText";
    productAvailableColors.appendChild(productAvailableColorsText);
    var productColorsLength = qdoc.data().colors.length;
    var productColorCircle;
    for(let i=0; i< productColorsLength; i++)
    {
      productColorCircle = document.createElement("div");
      productColorCircle.className = "productColorCircle";
      productColorCircle.style.backgroundColor = qdoc.data().colors[i];
      productAvailableColors.appendChild(productColorCircle);
    }
    productDividerLine.appendChild(productAvailableColors);

    product.appendChild(productDividerLine);

    document.getElementById("productOutput").insertBefore(product, paginationDiv);
  });
}

