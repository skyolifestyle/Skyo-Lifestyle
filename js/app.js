let cart = JSON.parse(localStorage.getItem('SKYO_CART')) || [];

function displayProducts(items) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = items.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Bag</button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">৳${product.price.toLocaleString()}</p>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const inCart = cart.find(item => item.id === id);
    
    if(inCart) {
        inCart.qty++;
    } else {
        cart.push({...product, qty: 1});
    }
    updateCart();
    toggleCart(true);
}

function updateCart() {
    localStorage.setItem('SKYO_CART', JSON.stringify(cart));
    document.getElementById('cartCount').innerText = cart.length;
    renderCart();
}

function toggleCart(forceOpen = false) {
    const sidebar = document.getElementById('cartSidebar');
    if(forceOpen) sidebar.classList.add('active');
    else sidebar.classList.toggle('active');
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => displayProducts(products));