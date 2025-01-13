
  
document.addEventListener("DOMContentLoaded", function () {
    
    let totalItemsInCart = 0;

   
    const cartCount = document.getElementById('cart-count');

    // All the product cards
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card) => {
        // Get individual elements for each product card
        const priceDisplay = card.querySelector('.price-display');
        const quantityDisplay = card.querySelector('.quantity-display');
        const incrementBtn = card.querySelector('.increment-btn');
        const decrementBtn = card.querySelector('.decrement-btn');
        const addToCartBtn = card.querySelector('.add-to-cart-btn');

        const unitPrice = parseInt(priceDisplay.textContent.trim(), 10);
        let quantity = parseInt(quantityDisplay.textContent, 10);

   
        const updatePrice = () => {
            const totalPrice = unitPrice * quantity;
            priceDisplay.textContent = totalPrice; 
        };

        
        incrementBtn.addEventListener("click", () => {
            quantity++;
            quantityDisplay.textContent = quantity; 
            updatePrice();
        });

        decrementBtn.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity; 
                updatePrice();
            }
        });

        
        addToCartBtn.addEventListener("click", () => {
            totalItemsInCart += quantity; 
            cartCount.textContent = totalItemsInCart;
           
        });
    });
});

