let cart = JSON.parse(localStorage.getItem('SKYO_CART')) || [];

function displayProducts(items) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <i class="far fa-heart wishlist-icon"></i>
            <img src="${p.image}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <p class="product-price">Tk ${p.price.toLocaleString()}</p>
                <button class="btn-choose" onclick="addToCart(${p.id})">ADD TO BAG</button>
            </div>
        </div>
    `).join('');
}

function toggleMenu() { document.getElementById('sideMenu').classList.toggle('active'); }

function toggleCart() { document.getElementById('cartSidebar').classList.toggle('active'); }

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const inCart = cart.find(i => i.id === id);
    if(inCart) inCart.qty++;
    else cart.push({...product, qty: 1});
    
    updateCart();
    toggleCart(); // ওপেন করবে সাইডবার
}

function updateCart() {
    localStorage.setItem('SKYO_CART', JSON.stringify(cart));
    document.getElementById('cartCount').innerText = cart.length;
    renderCart();
}

function renderCart() {
    const items = document.getElementById('cartItems');
    items.innerHTML = cart.map(i => `
        <div style="display:flex; gap:10px; padding:15px; border-bottom:1px solid #eee;">
            <img src="${i.image}" width="50">
            <div>
                <h5 style="margin:0">${i.name}</h5>
                <p>Tk ${i.price} x ${i.qty}</p>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    document.getElementById('subtotal').innerText = `Tk ${total.toLocaleString()}`;
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCart();
});