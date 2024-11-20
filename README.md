# TIMEDSHOP

## LIVE WEBSITE:  
[https://timedshop.vercel.app/](https://timedshop.vercel.app/)

### Description  

The "TimedShop" webpage is a fully functional online clothing store, ready for a live launch.  
Its design is attractive, original, and user-friendly, with responsive capabilities that adapt seamlessly to any screen size.  

---

### Features  

1. **User Account Management:**  
   - Create and access user accounts with robust security measures.  

2. **Product Catalog Display:**  
   - View product details including images, prices, discounts, reduced prices, sizes, and available colors.  

3. **Dynamic Product Search:**  
   - Quickly search for products from the database.  

4. **Product Sorting:**  
   - Sort displayed products based on various criteria.  

5. **Product Customization:**  
   - Select size and color for any chosen product.  

6. **Cart Management:**  
   - Add products to the shopping cart, even without an account.  
   - Modify quantities, colors, or sizes of cart items before proceeding to checkout.  

7. **Wishlist:**  
   - Save favorite items to a wishlist.  

8. **Checkout Process:**  
   - Input email address, name, phone number, delivery address, and payment information for secure purchases.  

9. **Purchase History:**  
   - View detailed purchase history in the user's account after a successful order.  

10. **Error Handling:**  
    - Receive informative error messages with an option to report issues.  

11. **Responsive Design:**  
    - Fully optimized for phones, tablets, and monitors.  

---

### Technologies Used  

#### **Programming Languages:**  
- HTML5  
- JavaScript  
- CSS  

#### **Frameworks & APIs:**  

1. **Node.js:**  
   - Backend framework for server-side logic.  

2. **Firebase Database:**  
   - Securely stores user information, product details (e.g., prices, names, available sizes), new orders, reported issues, and user purchase history.  

3. **Stripe:**  
   - Used for checkout processes.  
   - Handles sensitive information like card credentials and financial transactions, ensuring data security.  
   - Other user details (e.g., name, delivery address, email, and phone) are sent securely to the database via Firebase Functions.  

4. **Firebase Functions:**  
   - Dynamically (and securely) adds completed orders to the database.  

5. **Bunny.net (Content Delivery Network):**  
   - Stores product images efficiently.  
   - Reduces traffic costs by leveraging browser caching.  

6. **Algolia:**  
   - Provides a dynamic and efficient search engine for the product database, ensuring a seamless user experience.  

#### **Security Focus:**  
The primary reason for choosing these APIs is user security. The site is fully prepared for a live launch, ensuring that sensitive user data remains inaccessible to unauthorized parties, including developers.  

---

### System Requirements  
- Internet access  
- Any modern browser
