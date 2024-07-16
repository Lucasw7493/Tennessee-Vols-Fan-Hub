document.addEventListener('DOMContentLoaded', function() {
    // Load cart items when the page loads
    loadCartItems();
    updateCartDropdown();

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const modal = new bootstrap.Modal(document.getElementById('orderCompleteModal'));
            modal.show();
        });
    }

    document.getElementById('orderCompleteModal').addEventListener('hidden.bs.modal', function () {
        clearCart();
        window.location.href = 'store.html';
    });

    const returnToStoreButton = document.getElementById('returnToStore');
    if (returnToStoreButton) {
        returnToStoreButton.addEventListener('click', function() {
            clearCart();
            window.location.href = 'store.html';
        });
    }
});

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsElement = document.getElementById('cart-items');
    if (cartItemsElement) {
        cartItemsElement.innerHTML = ''; // Clear previous items
        if (cartItems.length === 0) {
            cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItems.forEach((item, index) => {
                cartItemsElement.innerHTML += `
                    <div class="cart-item-main">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details-main">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">$${item.price}</p>
                        </div>
                        <div class="cart-item-actions-main">
                            <span>$${item.price}</span>
                            <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
                        </div>
                    </div>
                `;
            });
        }
    }
}

function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    loadCartItems();
    updateCartDropdown();
}

function addToCart(productName, productPrice, productImage) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ name: productName, price: productPrice, image: productImage });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.location.href = 'cart.html'; // Navigate to the cart page
}

function updateCartDropdown() {
    const cartDropdownMenu = document.getElementById('cart-dropdown-menu');
    const cartCount = document.getElementById('cart-count');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartDropdownMenu) {
        cartDropdownMenu.innerHTML = '';
        if (cartItems.length === 0) {
            cartDropdownMenu.innerHTML = '<li><p class="text-center mb-0">Your cart is empty.</p></li>';
        } else {
            cartItems.forEach((item, index) => {
                cartDropdownMenu.innerHTML += `
                    <li class="cart-item-dropdown w-100">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details-dropdown">
                            <span>${item.name}</span>
                        </div>
                        <div class="cart-item-actions-dropdown">
                            <span>$${item.price}</span>
                            <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
                        </div>
                    </li>
                `;
            });
            cartDropdownMenu.innerHTML += `
                <li><a href="cart.html" class="btn btn-primary w-100 mt-2 checkout-btn">Check Out</a></li>
            `;
        }
        cartCount.textContent = cartItems.length.toString();
    }
}

function clearCart() {
    localStorage.removeItem('cartItems');
    loadCartItems();
    updateCartDropdown();
}
