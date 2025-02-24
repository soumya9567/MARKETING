document.addEventListener("DOMContentLoaded", () => {
  const cartCountElement = document.querySelector(".cart-count");
  const checkoutLink = document.querySelector("#checkout-link");
  const checkoutButton = document.querySelector("#checkout");
  const cartContainer = document.querySelector("#cart-container");

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCountElement) {
      cartCountElement.textContent = totalItems > 0 ? totalItems : "";
      cartCountElement.classList.toggle("hidden", totalItems === 0);
    }

    if (checkoutButton) {
      if (cart.length === 0) {
        checkoutButton.disabled = true;
        checkoutButton.classList.add("opacity-50", "cursor-not-allowed");
      } else {
        checkoutButton.disabled = false;
        checkoutButton.classList.remove("opacity-50", "cursor-not-allowed");
      }
    }
  }

  updateCartCount();

  if (checkoutLink) {
    checkoutLink.addEventListener("click", (event) => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        event.preventDefault();
        alert("Your cart is empty! Add items before proceeding to checkout.");
      }
    });
  }

  // Event delegation for add-to-cart button
  // document.addEventListener("click", (event) => {
  //   if (event.target.classList.contains("add-to-cart-btn")) {
  //     const button = event.target;
  //     const name = button.getAttribute("data-name");
  //     const image = button.getAttribute("data-image");
  //     const price = parseInt(button.getAttribute("data-price"), 10);

  //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //     let existingProduct = cart.find((item) => item.name === name);

  //     if (existingProduct) {
  //       existingProduct.quantity += 1;
  //     } else {
  //       cart.push({ name, image, price, quantity: 1 });
  //     }

  //     localStorage.setItem("cart", JSON.stringify(cart));
  //     updateCartCount();
  //     alert(`${name} has been added to your cart!`);
  //   }
  // });

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = ""; 

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p class="text-center text-gray-500 text-lg">Your cart is empty.</p>`;
    } else {
      cart.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add(
          "flex",
          "items-center",
          "justify-between",
          "bg-white",
          "p-4",
          "rounded-lg",
          "shadow-md",
          "space-x-4"
        );
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="w-20 h-20 object-cover rounded-lg">
          <p class="flex-grow text-gray-800 font-medium">${product.name}</p>
          <p class="text-gray-600 font-semibold">₹<span class="price-display">${product.price * product.quantity}</span></p>
          <div class="flex items-center space-x-2">
            <button class="bg-gray-300 text-gray-700 px-3 py-1 rounded decrement-btn" data-name="${product.name}">-</button>
            <span class="quantity-display">${product.quantity}</span>
            <button class="bg-gray-300 text-gray-700 px-3 py-1 rounded increment-btn" data-name="${product.name}">+</button>
          </div>
          <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none remove-btn" data-name="${product.name}">
            Remove
          </button>
        `;
        cartContainer.appendChild(productCard);
      });
    }
  }

  renderCart(); // Initial render

  // Event delegation for cart interactions
  cartContainer.addEventListener("click", (event) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const target = event.target;

    // Increment quantity
    if (target.classList.contains("increment-btn")) {
      const name = target.getAttribute("data-name");
      const product = cart.find((item) => item.name === name);
      if (product) {
        product.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      }
    }

    // Decrement quantity
    if (target.classList.contains("decrement-btn")) {
      const name = target.getAttribute("data-name");
      const product = cart.find((item) => item.name === name);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      }
    }

    // Remove item
    if (target.classList.contains("remove-btn")) {
      const name = target.getAttribute("data-name");
      cart = cart.filter((item) => item.name !== name);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
    }
  });
});
