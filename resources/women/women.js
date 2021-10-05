import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
import { collection, addDoc, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"; 
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

const productOutput = document.getElementById("productOutput");

const querySnapshot = await getDocs(collection(db, "women"));
querySnapshot.forEach((doc) => {
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
  getDownloadURL(ref(storage, doc.id+"01.jpg"))
  .then((url) => {
    productFirstImage.src = url;
  })
  .catch((error) => {
    console.log(error);
  });
  
  //productSecondImage
  var productSecondImage = document.createElement("img");
  productSecondImage.className = "productSecondImage";
  getDownloadURL(ref(storage, doc.id+"02.jpg"))
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
  productName.innerText = doc.data().name;
  productDividerLine.appendChild(productName);

  //productPriceBeforeSale
  var productPriceBeforeSale = document.createElement("a");
  productPriceBeforeSale.className = "productPriceBeforeSale";
  productPriceBeforeSale.innerText = "$" + doc.data().price + ".00";
  productDividerLine.appendChild(productPriceBeforeSale);

  //productPrice
  var productPrice = document.createElement("a");
  productPrice.className = "productPrice";
  var price =  doc.data().price - (doc.data().price * (doc.data().sale / 100));
  productPrice.innerText =  "$" + price + ".00";
  productDividerLine.appendChild(productPrice);

  //productAvailableSizes
  var productAvailableSizes = document.createElement("a");
  productAvailableSizes.className = "productAvailableSizes";
  let sizes = "";
  var arraySize = doc.data().sizes.length;
  for(let i = 0; i< arraySize; i++)
  {
    if(i == arraySize-1)
    {
      sizes = sizes + doc.data().sizes[i];
    } 
    else
    {
      sizes = sizes + doc.data().sizes[i] + ", ";
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
  var productColorsLength = doc.data().colors.length;
  var productColorCircle;
  for(let i=0; i< productColorsLength; i++)
  {
    productColorCircle = document.createElement("div");
    productColorCircle.className = "productColorCircle";
    productColorCircle.style.backgroundColor = doc.data().colors[i];
    productAvailableColors.appendChild(productColorCircle);
  }
  productDividerLine.appendChild(productAvailableColors);

  product.appendChild(productDividerLine);

  document.getElementById("productOutput").appendChild(product);

});




