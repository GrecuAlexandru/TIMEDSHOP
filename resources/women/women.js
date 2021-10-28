// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
// import { doc, where, collection,deleteDoc, setDoc, addDoc, getDoc, deleteField, updateDoc, getDocs, getFirestore, query, orderBy, limit, startAfter, startAt } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
// import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCkBvDNzSvorpEdz2twDAVI09x-FaVsDGg",
//   authDomain: "timedshop-a5a66.firebaseapp.com",
//   projectId: "timedshop-a5a66",
//   storageBucket: "timedshop-a5a66.appspot.com",
//   messagingSenderId: "172835576987",
//   appId: "1:172835576987:web:2e588ca7a77cc008affa3e",
//   measurementId: "G-3VCHXLRX5K"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore();
// const storage = getStorage(app);
// let querySnapshot;
// let params = new URLSearchParams(location.search);
// // if(params.get("maxPages")==null)
// // {
// //   const docRef = doc(db, "women", "pages");
// //   const docSnap = await getDoc(docRef);

// //   if (docSnap.exists()) {
// //     params.append("maxPages",docSnap.data().numberOfPages);
// //     location.search = params;
// //   } else {
// //     // doc.data() will be undefined in this case
// //     console.log("No such document!");
// //   }
// // }
// var minPrice,maxPrice;
// if(params.get("minPrice")==null&&params.get("maxPrice")==null)
// {
//   const docRef = doc(db, "women", "pages");
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     document.getElementById("sliderMin").value = docSnap.data().minPrice;
//     document.getElementById("sliderMin").min = docSnap.data().minPrice;
//     document.getElementById("sliderMin").max = docSnap.data().maxPrice;
//     document.getElementById("numberInputLeft").value = docSnap.data().minPrice;
//     document.getElementById("numberInputLeft").min = docSnap.data().minPrice;
//     document.getElementById("numberInputLeft").max = docSnap.data().maxPrice;

//     document.getElementById("sliderMax").value = docSnap.data().maxPrice;
//     document.getElementById("sliderMax").max = docSnap.data().maxPrice;
//     document.getElementById("sliderMax").min = docSnap.data().minPrice;
//     document.getElementById("numberInputRight").value = docSnap.data().maxPrice;
//     document.getElementById("numberInputRight").max = docSnap.data().maxPrice;
//     document.getElementById("numberInputRight").min = docSnap.data().minPrice;

//     console.log('coco', minPrice);
//     localStorage.setItem("minPriceFromDatabase", JSON.stringify(docSnap.data().minPrice));
//     localStorage.setItem("maxPriceFromDatabase", JSON.stringify(docSnap.data().maxPrice));
//     if(params.get("minPrice")==null && params.get("maxPrice")==null)
//     {
//       params.append("minPrice",docSnap.data().minPrice);
//       params.append("maxPrice", docSnap.data().maxPrice);
//       location.search = params;
//     }
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }
// else
// {
//   minPrice = params.get("minPrice");
//   maxPrice = params.get("maxPrice");
//   var minPriceDatabase = localStorage.getItem("minPriceFromDatabase");
//   var maxPriceDatabase = localStorage.getItem("maxPriceFromDatabase");
//   console.log(minPriceDatabase);
//   document.getElementById("sliderMin").value = minPrice;
//   document.getElementById("sliderMin").min = minPriceDatabase;
//   document.getElementById("sliderMin").max = maxPriceDatabase;
//   document.getElementById("numberInputLeft").value = minPrice;
//   document.getElementById("numberInputLeft").min = minPriceDatabase;
//   document.getElementById("numberInputLeft").max = maxPriceDatabase;

//   document.getElementById("sliderMax").value = maxPrice;
//   document.getElementById("sliderMax").max = maxPriceDatabase;
//   document.getElementById("sliderMax").min = minPriceDatabase;
//   document.getElementById("numberInputRight").value = maxPrice;
//   document.getElementById("numberInputRight").max = maxPriceDatabase;
//   document.getElementById("numberInputRight").min = minPriceDatabase;

// }
// minPrice = parseInt(minPrice);
// maxPrice = parseInt(maxPrice);
// console.log("minprice=",minPrice);
// console.log("maxprice=",maxPrice)
// var currentPage;
// var sortBy = params.get("sortBy");
// var type;
// var size
// if(params.get("type")!=null)
//   type = params.get("type");
// if(params.get("size")!=null)
//   size = params.get("size");
// let whereType = [];
// let whereSize = [];
// whereSize[0] = "coco";
// let q;
// const productOutput = document.getElementById("productOutput");
// const paginationDiv = document.getElementById("paginationDiv");
// var idd = 1203;

// if(type!=undefined)
// {
//   if(type.includes("hoodies"))
//     whereType.push("hoodie");
//   if(type.includes("tshir"))
//     whereType.push("tshirt");
//   if(type.includes("shirts"))
//     whereType.push("shirt");
//   if(type.includes("sweatsh"))
//     whereType.push("sweatshirt");
// }
// if(size!=undefined)
// {
//   if(size.includes("small"))
//     whereSize.push("S");
//   if(size.includes("medium"))
//     whereSize.push("M");
//   if(size.includes("large"))
//     whereSize.push("L");
//   if(size.includes("extral"))
//     whereSize.push("XL");
//   if(size.includes("extraxl"))
//     whereSize.push("XXL");
// }
// // select the target node
// var target = document.getElementById("dropdownTitle");
//   // create an observer instance
//   if(sortBy=="newArrival")
//   {
//     if(currentPage > 1)
//     {
//       var lastVisibleQueryFromPrevPage = q.docs[q.docs.length - 1];
//       console.log(lastVisibleQueryFromPrevPage.id);

//       if(whereSize.length-1 != 0)
//       {
//         if(whereType.length != 0)
//         {
//           q = query(collection(db, "women"), orderBy("price", "asc"), where("price", "<=", maxPrice),where("price", ">=", minPrice), orderBy("date", "desc"), where("type", "in", whereType), startAfter(lastVisibleQueryFromPrevPage));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             q = query(q,where(whereSize[i],"==",true));
//           }
//           q = query(q, limit(18));
//         }
//         else
//         {
//           q = query(collection(db, "women"), orderBy("price", "asc"), where("price", "<=", maxPrice),where("price", ">=", minPrice), orderBy("date", "desc"), startAfter(lastVisibleQueryFromPrevPage));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             q = query(q,where(whereSize[i],"==",true));
//           }
//           q = query(q, limit(18));
//         }
//       }
//       else if(whereType.length != 0)
//         q = query(collection(db, "women"), orderBy("price", "asc"), where("price", "<=", maxPrice),where("price", ">=", minPrice), orderBy("date", "desc"), where("type", "in", whereType), startAfter(lastVisibleQueryFromPrevPage), limit(18));
//       else
//         q = query(collection(db, "women"), orderBy("price", "asc"), where("price", "<=", maxPrice),where("price", ">=", minPrice), orderBy("date", "desc"), startAfter(lastVisibleQueryFromPrevPage), limit(18));
//     }
//     else
//     {
//       if(whereSize.length-1 != 0)
//       {
//         if(whereType.length != 0)
//         {
//             q = query(collection(db, "women"), orderBy("price", "asc"), where("price", "<=", maxPrice),where("price", ">=", minPrice), orderBy("date", "desc"), where("type", "in", whereType));
//             for(var i=1;i<=whereSize.length-1;i++)
//             {
//               q = query(q,where(whereSize[i],"==",true));
//             }
//             q = query(q, limit(18));
//         }
//         else
//         {
//           q = query(collection(db, "women"), orderBy("price", "asc"), where("price", "<=", maxPrice),where("price", ">=", minPrice), limit(18));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             q = query(q,where(whereSize[i],"==",true));
//           }
//           q = query(q, limit(18))
//         }
//       }
//       else if(whereType.length != 0)
//         q = query(collection(db, "women"), orderBy("price", "asc"), where("price", "<=", maxPrice),where("price", ">=", minPrice), orderBy("date", "desc"), where("type", "in", whereType), limit(18));
//       else
//         q = query(collection(db, "women"), orderBy("price", "asc"), where("price", "<=", maxPrice),where("price", ">=", minPrice), orderBy("date", "desc"), limit(18));

//         var lastVisibleQueryFromPrevPage = q.docs[q.docs.length - 1];
//     }
//     var idd = 1201;
//     querySnapshot = await getDocs(q);
//     querySnapshot.forEach((qdoc) => {
//       //var docRef;
//       //console.log(new Date(qdoc.data().date * 1000));
//       // for(var x = 1; x<=1; x++)
//       // {
//       //   idd++;
//       //   if(idd <= 1220)
//       //     docRef = setDoc(doc(db, "women",idd.toString()),qdoc.data());
//       // }

//       //product item
//       var product = document.createElement("div");
//       product.className = "product";

//       //productImageDiv
//       var productImageDiv = document.createElement("div");
//       productImageDiv.className = "productImageDiv";
//       product.appendChild(productImageDiv);

//       //productFirstImage
//       var productFirstImage = document.createElement("img");
//       productFirstImage.className = "productImage";
//       getDownloadURL(ref(storage, qdoc.id+"01.jpg"))
//       .then((url) => {
//         productFirstImage.src = url;
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//       //productSecondImage
//       var productSecondImage = document.createElement("img");
//       productSecondImage.className = "productSecondImage";
//       getDownloadURL(ref(storage, qdoc.id+"02.jpg"))
//       .then((url) => {
//         productSecondImage.src = url;
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//       //Append First and Second Image to productImageDiv
//       productImageDiv.appendChild(productFirstImage);
//       productImageDiv.appendChild(productSecondImage);
//       product.appendChild(productImageDiv);

//       //productDividerLine
//       var productDividerLine = document.createElement("div");
//       productDividerLine.className = "productDividerLine";
//       product.appendChild(productDividerLine);

//       //productName
//       var productName = document.createElement("a");
//       productName.className = "productName";
//       productName.innerText = qdoc.data().name;
//       productDividerLine.appendChild(productName);

//       //productPriceBeforeSale
//       if(!isNaN(qdoc.data().priceBeforeSale))
//       {
//         var productPriceBeforeSale = document.createElement("a");
//         productPriceBeforeSale.className = "productPriceBeforeSale";
//         productPriceBeforeSale.innerText = "$" + qdoc.data().priceBeforeSale + ".00";
//         productDividerLine.appendChild(productPriceBeforeSale);
//       }

//       //productPrice
//       var productPrice = document.createElement("a");
//       productPrice.className = "productPrice";
//       var price =  qdoc.data().price;
//       productPrice.innerText =  "$" + price + ".00";
//       productDividerLine.appendChild(productPrice);

//       //productAvailableSizes
//       var productAvailableSizes = document.createElement("a");
//       productAvailableSizes.className = "productAvailableSizes";
//       let sizes = "";
//       var arraySize = qdoc.data().sizes.length;
//       for(let i = 0; i< arraySize; i++)
//       {
//         if(i == arraySize-1)
//         {
//           sizes = sizes + qdoc.data().sizes[i];
//         }
//         else
//         {
//           sizes = sizes + qdoc.data().sizes[i] + ", ";
//         }

//       }
//       productAvailableSizes.innerText = "Available sizes: " + sizes;
//       productDividerLine.appendChild(productAvailableSizes);

//       //productAvailableColors
//       var productAvailableColors = document.createElement("div");
//       productAvailableColors.className = "productColors";
//       var productAvailableColorsText = document.createElement("a");
//       productAvailableColorsText.innerText = "Available colors:";
//       productAvailableColorsText.className = "productAvailableColorsText";
//       productAvailableColors.appendChild(productAvailableColorsText);
//       var productColorsLength = qdoc.data().colors.length;
//       var productColorCircle;
//       for(let i=0; i< productColorsLength; i++)
//       {
//         productColorCircle = document.createElement("div");
//         productColorCircle.className = "productColorCircle";
//         productColorCircle.style.backgroundColor = qdoc.data().colors[i];
//         productAvailableColors.appendChild(productColorCircle);
//       }
//       productDividerLine.appendChild(productAvailableColors);

//       product.appendChild(productDividerLine);

//       document.getElementById("productOutput").insertBefore(product, paginationDiv);
//     });
//   }else if(sortBy=="priceHL")
//   {
//     if(currentPage > 1)
//     {
//       var resultsUntilStart = ((currentPage-1)*18)-1;
//       let preQuery;
//       if(whereSize.length-1 != 0)
//       {
//         if(whereType.length != 0)
//         {
//           preQuery = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "desc"), where("type","in",whereType));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             preQuery = query(preQuery,where(whereSize[i],"==",true));
//           }
//           preQuery = query(preQuery, limit(resultsUntilStart));
//         }

//         else
//         {
//           preQuery = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "desc"));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             preQuery = query(preQuery,where(whereSize[i],"==",true));
//           }
//           preQuery = query(preQuery, limit(resultsUntilStart));
//         }
//       }
//       else if(whereType.length != 0)
//         preQuery = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "desc"), where("type", "in", whereType), limit(resultsUntilStart));
//       else
//         preQuery = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "desc"), limit(resultsUntilStart));

//       const preQuerySnapshots = await getDocs(preQuery);
//       var lastVisibleQueryFromPrevPage = preQuerySnapshots.docs[preQuerySnapshots.docs.length - 1];
//       console.log(lastVisibleQueryFromPrevPage.id);

//       if(whereSize.length-1 != 0)
//       {
//         if(whereType.length != 0)
//         {
//           q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "desc"), where("type", "in", whereType), startAfter(lastVisibleQueryFromPrevPage));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             q = query(q,where(whereSize[i],"==",true));
//           }
//           q = query(q, limit(18));
//         }
//         else
//         {
//           q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "desc"), startAfter(lastVisibleQueryFromPrevPage));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             q = query(q,where(whereSize[i],"==",true));
//           }
//           q = query(q, limit(18));
//         }
//       }
//       else if(whereType.length != 0)
//         q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "desc"), where("type", "in", whereType), startAfter(lastVisibleQueryFromPrevPage), limit(18));
//       else
//         q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "desc"), startAfter(lastVisibleQueryFromPrevPage), limit(18));
//     }
//     else
//     {
//       if(whereSize.length-1 != 0)
//       {
//         if(whereType.length != 0)
//         {
//             q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "desc"), where("type", "in", whereType));
//             for(var i=1;i<=whereSize.length-1;i++)
//             {
//               q = query(q,where(whereSize[i],"==",true));
//             }
//             q = query(q, limit(18));
//         }
//         else
//         {
//           q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), limit(18));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             q = query(q,where(whereSize[i],"==",true));
//           }
//           q = query(q, limit(18))
//         }
//       }
//       else if(whereType.length != 0)
//         q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "desc"), where("type", "in", whereType), limit(18));
//       else
//         q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "desc"), limit(18));
//     }
//     document.querySelectorAll('.product').forEach(e => e.remove());
//     querySnapshot = await getDocs(q);
//     querySnapshot.forEach((qdoc) => {
//       //console.log(new Date(qdoc.data().date * 1000));
//       // idd++;
//       // const docRef = setDoc(doc(db, "women",idd.toString()),qdoc.data());

//       //product item
//       var product = document.createElement("div");
//       product.className = "product";

//       //productImageDiv
//       var productImageDiv = document.createElement("div");
//       productImageDiv.className = "productImageDiv";
//       product.appendChild(productImageDiv);

//       //productFirstImage
//       var productFirstImage = document.createElement("img");
//       productFirstImage.className = "productImage";
//       getDownloadURL(ref(storage, qdoc.id+"01.jpg"))
//       .then((url) => {
//         productFirstImage.src = url;
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//       //productSecondImage
//       var productSecondImage = document.createElement("img");
//       productSecondImage.className = "productSecondImage";
//       getDownloadURL(ref(storage, qdoc.id+"02.jpg"))
//       .then((url) => {
//         productSecondImage.src = url;
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//       //Append First and Second Image to productImageDiv
//       productImageDiv.appendChild(productFirstImage);
//       productImageDiv.appendChild(productSecondImage);
//       product.appendChild(productImageDiv);

//       //productDividerLine
//       var productDividerLine = document.createElement("div");
//       productDividerLine.className = "productDividerLine";
//       product.appendChild(productDividerLine);

//       //productName
//       var productName = document.createElement("a");
//       productName.className = "productName";
//       productName.innerText = qdoc.data().name;
//       productDividerLine.appendChild(productName);

//       //productPriceBeforeSale
//       if(!isNaN(qdoc.data().priceBeforeSale))
//       {
//         var productPriceBeforeSale = document.createElement("a");
//         productPriceBeforeSale.className = "productPriceBeforeSale";
//         productPriceBeforeSale.innerText = "$" + qdoc.data().priceBeforeSale + ".00";
//         productDividerLine.appendChild(productPriceBeforeSale);
//       }

//       //productPrice
//       var productPrice = document.createElement("a");
//       productPrice.className = "productPrice";
//       var price =  qdoc.data().price;
//       productPrice.innerText =  "$" + price + ".00";
//       productDividerLine.appendChild(productPrice);

//       //productAvailableSizes
//       var productAvailableSizes = document.createElement("a");
//       productAvailableSizes.className = "productAvailableSizes";
//       let sizes = "";
//       var arraySize = qdoc.data().sizes.length;
//       for(let i = 0; i< arraySize; i++)
//       {
//         if(i == arraySize-1)
//         {
//           sizes = sizes + qdoc.data().sizes[i];
//         }
//         else
//         {
//           sizes = sizes + qdoc.data().sizes[i] + ", ";
//         }

//       }
//       productAvailableSizes.innerText = "Available sizes: " + sizes;
//       productDividerLine.appendChild(productAvailableSizes);

//       //productAvailableColors
//       var productAvailableColors = document.createElement("div");
//       productAvailableColors.className = "productColors";
//       var productAvailableColorsText = document.createElement("a");
//       productAvailableColorsText.innerText = "Available colors:";
//       productAvailableColorsText.className = "productAvailableColorsText";
//       productAvailableColors.appendChild(productAvailableColorsText);
//       var productColorsLength = qdoc.data().colors.length;
//       var productColorCircle;
//       for(let i=0; i< productColorsLength; i++)
//       {
//         productColorCircle = document.createElement("div");
//         productColorCircle.className = "productColorCircle";
//         productColorCircle.style.backgroundColor = qdoc.data().colors[i];
//         productAvailableColors.appendChild(productColorCircle);
//       }
//       productDividerLine.appendChild(productAvailableColors);

//       product.appendChild(productDividerLine);

//       document.getElementById("productOutput").insertBefore(product, paginationDiv);
//     });
//   } else if(sortBy=="priceLH")
//   {
//     if(currentPage > 1)
//     {
//       var resultsUntilStart = ((currentPage-1)*18)-1;
//       let preQuery;
//       if(whereSize.length-1 != 0)
//       {
//         if(whereType.length != 0)
//         {
//           preQuery = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "asc"), where("type","in",whereType));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             preQuery = query(preQuery,where(whereSize[i],"==",true));
//           }
//           preQuery = query(preQuery, limit(resultsUntilStart));
//         }

//         else
//         {
//           preQuery = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "asc"));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             preQuery = query(preQuery,where(whereSize[i],"==",true));
//           }
//           preQuery = query(preQuery, limit(resultsUntilStart));
//         }
//       }
//       else if(whereType.length != 0)
//         preQuery = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "asc"), where("type", "in", whereType), limit(resultsUntilStart));
//       else
//         preQuery = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "asc"), limit(resultsUntilStart));

//       const preQuerySnapshots = await getDocs(preQuery);
//       var lastVisibleQueryFromPrevPage = preQuerySnapshots.docs[preQuerySnapshots.docs.length - 1];
//       console.log(lastVisibleQueryFromPrevPage.id);

//       if(whereSize.length-1 != 0)
//       {
//         if(whereType.length != 0)
//         {
//           q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "asc"), where("type", "in", whereType), startAfter(lastVisibleQueryFromPrevPage));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             q = query(q,where(whereSize[i],"==",true));
//           }
//           q = query(q, limit(18));
//         }
//         else
//         {
//           q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "asc"), startAfter(lastVisibleQueryFromPrevPage));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             q = query(q,where(whereSize[i],"==",true));
//           }
//           q = query(q, limit(18));
//         }
//       }
//       else if(whereType.length != 0)
//         q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "asc"), where("type", "in", whereType), startAfter(lastVisibleQueryFromPrevPage), limit(18));
//       else
//         q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "asc"), startAfter(lastVisibleQueryFromPrevPage), limit(18));
//     }
//     else
//     {
//       if(whereSize.length-1 != 0)
//       {
//         if(whereType.length != 0)
//         {
//             q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "asc"), where("type", "in", whereType));
//             for(var i=1;i<=whereSize.length-1;i++)
//             {
//               q = query(q,where(whereSize[i],"==",true));
//             }
//             q = query(q, limit(18));
//         }
//         else
//         {
//           q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), limit(18));
//           for(var i=1;i<=whereSize.length-1;i++)
//           {
//             q = query(q,where(whereSize[i],"==",true));
//           }
//           q = query(q, limit(18))
//         }
//       }
//       else if(whereType.length != 0)
//         q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "asc"), where("type", "in", whereType), limit(18));
//       else
//         q = query(collection(db, "women"), where("price", "<=", maxprice),where("price", ">=", minprice), orderBy("price", "asc"), limit(18));
//     }
//     document.querySelectorAll('.product').forEach(e => e.remove());
//     querySnapshot = await getDocs(q);
//     querySnapshot.forEach((qdoc) => {
//       console.log(qdoc.data().price);
//       //console.log(new Date(qdoc.data().date * 1000));
//       // idd++;
//       // const docRef = setDoc(doc(db, "women",idd.toString()),qdoc.data());

//       //product item
//       var product = document.createElement("div");
//       product.className = "product";

//       //productImageDiv
//       var productImageDiv = document.createElement("div");
//       productImageDiv.className = "productImageDiv";
//       product.appendChild(productImageDiv);

//       //productFirstImage
//       var productFirstImage = document.createElement("img");
//       productFirstImage.className = "productImage";
//       getDownloadURL(ref(storage, qdoc.id+"01.jpg"))
//       .then((url) => {
//         productFirstImage.src = url;
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//       //productSecondImage
//       var productSecondImage = document.createElement("img");
//       productSecondImage.className = "productSecondImage";
//       getDownloadURL(ref(storage, qdoc.id+"02.jpg"))
//       .then((url) => {
//         productSecondImage.src = url;
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//       //Append First and Second Image to productImageDiv
//       productImageDiv.appendChild(productFirstImage);
//       productImageDiv.appendChild(productSecondImage);
//       product.appendChild(productImageDiv);

//       //productDividerLine
//       var productDividerLine = document.createElement("div");
//       productDividerLine.className = "productDividerLine";
//       product.appendChild(productDividerLine);

//       //productName
//       var productName = document.createElement("a");
//       productName.className = "productName";
//       productName.innerText = qdoc.data().name;
//       productDividerLine.appendChild(productName);

//       //productPriceBeforeSale
//       if(!isNaN(qdoc.data().priceBeforeSale))
//       {
//         var productPriceBeforeSale = document.createElement("a");
//         productPriceBeforeSale.className = "productPriceBeforeSale";
//         productPriceBeforeSale.innerText = "$" + qdoc.data().priceBeforeSale + ".00";
//         productDividerLine.appendChild(productPriceBeforeSale);
//       }

//       //productPrice
//       var productPrice = document.createElement("a");
//       productPrice.className = "productPrice";
//       var price =  qdoc.data().price;
//       productPrice.innerText =  "$" + price + ".00";
//       productDividerLine.appendChild(productPrice);

//       //productAvailableSizes
//       var productAvailableSizes = document.createElement("a");
//       productAvailableSizes.className = "productAvailableSizes";
//       let sizes = "";
//       var arraySize = qdoc.data().sizes.length;
//       for(let i = 0; i< arraySize; i++)
//       {
//         if(i == arraySize-1)
//         {
//           sizes = sizes + qdoc.data().sizes[i];
//         }
//         else
//         {
//           sizes = sizes + qdoc.data().sizes[i] + ", ";
//         }

//       }
//       productAvailableSizes.innerText = "Available sizes: " + sizes;
//       productDividerLine.appendChild(productAvailableSizes);

//       //productAvailableColors
//       var productAvailableColors = document.createElement("div");
//       productAvailableColors.className = "productColors";
//       var productAvailableColorsText = document.createElement("a");
//       productAvailableColorsText.innerText = "Available colors:";
//       productAvailableColorsText.className = "productAvailableColorsText";
//       productAvailableColors.appendChild(productAvailableColorsText);
//       var productColorsLength = qdoc.data().colors.length;
//       var productColorCircle;
//       for(let i=0; i< productColorsLength; i++)
//       {
//         productColorCircle = document.createElement("div");
//         productColorCircle.className = "productColorCircle";
//         productColorCircle.style.backgroundColor = qdoc.data().colors[i];
//         productAvailableColors.appendChild(productColorCircle);
//       }
//       productDividerLine.appendChild(productAvailableColors);

//       product.appendChild(productDividerLine);

//       document.getElementById("productOutput").insertBefore(product, paginationDiv);
//     });
//   }
