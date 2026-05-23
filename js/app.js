// LocalStorage থেকে কার্ট ডাটা লোড করা
let cart = JSON.parse(localStorage.getItem('SKYO_CART')) || [];

// ১. প্রোডাক্ট গ্রিডে প্রোডাক্ট দেখানোর ফাংশন (Buy Now এবং Image Click সহ)
function displayProducts(items) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <i class="far fa-heart wishlist-icon"></i>
            <img src="${p.image}" class="product-image" onclick="openProductDetails(${p.id})" style="cursor:pointer;">
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <p class="product-price">Tk ${p.price.toLocaleString()}</p>
                <div style="display: flex; gap: 8px; margin-top: 10px;">
                    <button class="btn-choose" onclick="addToCart(${p.id})" style="flex: 1;">ADD TO BAG</button>
                    <button class="btn-buy-now" onclick="buyNow(${p.id})" style="background: #000; color: #fff; border: none; padding: 0 10px; font-weight: 600; border-radius: 4px; cursor: pointer; font-size: 11px;">BUY NOW</button>
                </div>
            </div>
        </div>
    `).join('');
}

// মেনু ও কার্ট সাইডবার টগল
function toggleMenu() { document.getElementById('sideMenu').classList.toggle('active'); }
function toggleCart() { document.getElementById('cartSidebar').classList.toggle('active'); }

// ২. কার্টে প্রোডাক্ট যোগ করার মেইন ফাংশন (ফিক্সড)
function addToCart(id) {
    // নিশ্চিত হওয়া যে products ভেরিয়েবলটি products-data.js থেকে পাচ্ছে
    const product = products.find(p => p.id === id);
    if (!product) return;

    const inCart = cart.find(i => i.id === id);
    if(inCart) {
        inCart.qty++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1
        });
    }
    
    updateCart();
    // কার্টে অ্যাড করার পর সাইডবার ওপেন হবে
    document.getElementById('cartSidebar').classList.add('active');
}

// ৩. সরাসরি বাই নাও বাটনের কাজ
function buyNow(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const inCart = cart.find(i => i.id === id);
    if(!inCart) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1
        });
    }
    updateCart();
    openCheckout(); // সরাসরি চেকাউট ফর্ম ওপেন হবে
}

// ৪. কার্ট রিমুভ করার ফাংশন (স্ক্রিনশটের ক্রসের জন্য)
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// ৫. কার্ট আপডেট ও কাউন্ট ফিক্স
function updateCart() {
    localStorage.setItem('SKYO_CART', JSON.stringify(cart));
    
    // 🟢 ফিক্স: টোটাল আইটেমের সংখ্যা (কোয়ান্টিটি সহ) কাউন্ট করবে
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartCount').innerText = totalQty;
    
    renderCart();
}

// ৬. সাইডবার কার্ট রেন্ডার করা (ডিজাইন ফিক্সড)
function renderCart() {
    const itemsContainer = document.getElementById('cartItems');
    if (!itemsContainer) return;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p style="text-align:center; color:#888; padding:20px;">Your bag is empty</p>`;
        document.getElementById('subtotal').innerText = `৳0`;
        return;
    }

    itemsContainer.innerHTML = cart.map(i => `
        <div style="display:flex; gap:15px; padding:15px; border-bottom:1px solid #eee; position:relative; align-items:center;">
            <img src="${i.image}" width="60" height="60" style="object-fit:cover; border-radius:4px;">
            <div style="flex:1;">
                <h5 style="margin:0; font-size:14px; color:#1a1a1a;">${i.name}</h5>
                <p style="margin:5px 0 0 0; font-size:13px; color:#666;">Tk ${i.price.toLocaleString()} &times; ${i.qty}</p>
            </div>
            <span onclick="removeFromCart(${i.id})" style="cursor:pointer; font-size:20px; color:#999; padding:0 5px;">&times;</span>
        </div>
    `).join('');
    
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    document.getElementById('subtotal').innerText = `৳${total.toLocaleString()}`;
}

// -------------------------------------------------------------
// 🟢 চেকাউট এবং হোয়াটসঅ্যাপ অর্ডার মডাল ফাংশনসমূহ
// -------------------------------------------------------------

function openCheckout() {
    if (cart.length === 0) {
        alert("Your bag is empty.");
        return;
    }
    // কার্ট সাইডবার খোলা থাকলে তা বন্ধ করে দেবে
    document.getElementById('cartSidebar').classList.remove('active');
    
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.style.display = 'block';
        updateOrderSummary();
    }
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.style.display = 'none';
}

function updateOrderSummary() {
    const summaryList = document.getElementById('orderSummaryItems');
    const orderTotal = document.getElementById('orderTotal');
    
    if (!summaryList || !orderTotal) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = 100; // ডেলিভারি চার্জ ১০০ টাকা

    summaryList.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} (x${item.qty})</span>
            <span>৳${(item.price * item.qty).toLocaleString()}</span>
        </div>
    `).join('');

    orderTotal.innerText = `৳${(subtotal + shipping).toLocaleString()}`;
}

function setupPaymentTiles() {
    const options = document.querySelectorAll('.payment-option');
    options.forEach(opt => {
        opt.addEventListener('click', function() {
            options.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            
            const radioInput = this.querySelector('input[name="paymentMethod"]');
            if (radioInput) radioInput.checked = true;
        });
    });
}

function validateAndPlaceOrder() {
    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const checkedPayment = document.querySelector('input[name="paymentMethod"]:checked');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const address = addressInput ? addressInput.value.trim() : '';

    if (!name || !phone || !address) {
        alert("Please fill in your delivery details.");
        return;
    }

    const payment = checkedPayment ? checkedPayment.value : 'cod';
    const orderId = 'SKYO-' + Math.floor(1000 + Math.random() * 9000);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const total = subtotal + 100;

    let message = `✨ *NEW ORDER: ${
