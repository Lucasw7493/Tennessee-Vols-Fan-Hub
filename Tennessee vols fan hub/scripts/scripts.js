document.addEventListener('DOMContentLoaded', function() {
    // Existing cart functionalities
    getCartItems();

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

    // Update cart count and dropdown content
    updateCartDropdown();
});

function getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItems.forEach((item, index) => {
            cartItemsElement.innerHTML += `
                <div class="col-md-4">
                    <div class="card mb-4">
                        <img src="${item.image}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">$${item.price}</p>
                            <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}

function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    getCartItems();
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

    cartDropdownMenu.innerHTML = '';

    if (cartItems.length === 0) {
        cartDropdownMenu.innerHTML = '<li><p class="text-center mb-0">Your cart is empty.</p></li>';
        cartCount.textContent = '0';
    } else {
        cartItems.forEach((item, index) => {
            cartDropdownMenu.innerHTML += `
                <li class="d-flex justify-content-between align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="img-thumbnail" style="width: 50px;">
                    <span>${item.name}</span>
                    <span>$${item.price}</span>
                    <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
                </li>
            `;
        });
        cartDropdownMenu.innerHTML += `
            <li><a href="cart.html" class="btn btn-primary w-100 mt-2 checkout-btn">Check Out</a></li>
        `;
        cartCount.textContent = cartItems.length.toString();
    }
}

function clearCart() {
    localStorage.removeItem('cartItems');
}
