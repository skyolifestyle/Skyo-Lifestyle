// Cart Management
let cart = [];
const DELIVERY_CHARGE = 100;
const WHATSAPP_NUMBER = '8801601193696';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('cartIcon').addEventListener('click', toggleCart);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Payment method selection
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', updatePaymentInstructions);
    });
}

// Load and display products
function loadProducts(category = 'all') {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

function createProductCard(product) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            ${product.emoji}
            ${discount > 0 ? `<span class="product-badge">-${discount}%</span>` : ''}
        </div>
        <div class="product-info">
            <div class="product-category">${product.subcategory}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                <span class="stars">★★★★★</span>
                <span class="rating-text">(${product.reviews})</span>
            </div>
            <div class="product-price">৳${product.price}</div>
            ${product.originalPrice > product.price ? `<div class="product-original-price">৳${product.originalPrice}</div>` : ''}
            <div class="product-actions">
                <button class="btn-buy" onclick="buyNow(${product.id})">🛒 Buy Now</button>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">+Cart</button>
                <button class="btn-whatsapp-order" onclick="orderViaWhatsAppDirect(${product.id})" title="Order via WhatsApp"><i class="fab fa-whatsapp"></i></button>
            </div>
        </div>
    `;
    
    return card;
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Update cart display
function updateCart() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function updateCartItems() {
    const container = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">৳${item.price} x ${item.quantity}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑</button>
        </div>
    `).join('');
}

function updateCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + DELIVERY_CHARGE;
    
    document.getElementById('subtotal').textContent = `৳${subtotal}`;
    document.getElementById('deliveryCharge').textContent = `৳${DELIVERY_CHARGE}`;
    document.getElementById('total').textContent = `৳${total}`;
}

// Toggle cart
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('active');
}

// Filter by category
function filterCategory(category) {
    loadProducts(category);
    document.getElementById('cartSidebar').classList.remove('active');
}

// Search functionality
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const grid = document.getElementById('productsGrid');
    
    if (!query) {
        loadProducts();
        return;
    }
    
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subcategory.toLowerCase().includes(query)
    );
    
    grid.innerHTML = '';
    filtered.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Buy Now - Direct checkout
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    cart = [{ ...product, quantity: 1 }];
    updateCart();
    proceedToCheckout();
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    updateOrderSummary();
    document.getElementById('checkoutModal').classList.add('active');
    document.getElementById('cartSidebar').classList.remove('active');
}

// Update order summary in checkout
function updateOrderSummary() {
    const summary = document.getElementById('orderSummaryItems');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + DELIVERY_CHARGE;
    
    summary.innerHTML = cart.map(item => `
        <div class="summary-item-row">
            <span>${item.name} x${item.quantity}</span>
            <span>৳${item.price * item.quantity}</span>
        </div>
    `).join('') + `
        <div class="summary-item-row">
            <span><strong>Delivery Charge</strong></span>
            <span>৳${DELIVERY_CHARGE}</span>
        </div>
    `;
    
    document.getElementById('orderTotal').textContent = `৳${total}`;
}

// Close checkout
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// Validate and place order
function validateAndPlaceOrder() {
    const form = document.getElementById('checkoutForm');
    
    if (!form.checkValidity()) {
        alert('Please fill all required fields');
        return false;
    }
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postcode: document.getElementById('postcode').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
    };
    
    // Validate phone number format
    if (!formData.phone.match(/^01[0-9]{9}$/) && !formData.phone.match(/^\+880[0-9]{9}$/)) {
        alert('Please enter a valid Bangladeshi phone number (01XXXXXXXXX)');
        return false;
    }
    
    placeOrder(formData);
}

// Place order
function placeOrder(formData) {
    const orderId = generateOrderId();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + DELIVERY_CHARGE;
    
    const orderData = {
        orderId: orderId,
        date: new Date().toLocaleString('bn-BD'),
        customerName: formData.fullName,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        address: formData.address,
        city: formData.city,
        postcode: formData.postcode,
        items: cart,
        subtotal: subtotal,
        deliveryCharge: DELIVERY_CHARGE,
        total: total,
        paymentMethod: formData.paymentMethod
    };
    
    // Send WhatsApp message
    sendOrderToWhatsApp(orderData);
    
    // Show confirmation
    showOrderConfirmation(orderData);
    
    // Reset form and cart
    document.getElementById('checkoutForm').reset();
    document.getElementById('checkoutModal').classList.remove('active');
}

// Generate Order ID
function generateOrderId() {
    return 'SKY' + Date.now() + Math.floor(Math.random() * 1000);
}

// Send order to WhatsApp
function sendOrderToWhatsApp(orderData) {
    let message = `*🎉 New Order from Skyo Lifestyle*\n\n`;
    message += `*Order ID:* ${orderData.orderId}\n`;
    message += `*Date:* ${orderData.date}\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${orderData.customerName}\n`;
    message += `Phone: ${orderData.customerPhone}\n`;
    message += `Email: ${orderData.customerEmail}\n\n`;
    message += `*Delivery Address:*\n${orderData.address}\n${orderData.city}, ${orderData.postcode}\n\n`;
    message += `*Order Items:*\n`;
    
    orderData.items.forEach(item => {
        message += `• ${item.name} x${item.quantity} = ৳${item.price * item.quantity}\n`;
    });
    
    message += `\n*Order Summary:*\n`;
    message += `Subtotal: ৳${orderData.subtotal}\n`;
    message += `Delivery: ৳${orderData.deliveryCharge}\n`;
    message += `*Total: ৳${orderData.total}*\n\n`;
    message += `*Payment Method:* ${getPaymentMethodName(orderData.paymentMethod)}`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Show order confirmation
function showOrderConfirmation(orderData) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + DELIVERY_CHARGE;
    
    document.getElementById('orderId').textContent = orderData.orderId;
    document.getElementById('confirmationTotal').textContent = `৳${total}`;
    document.getElementById('confirmationPayment').textContent = getPaymentMethodName(orderData.paymentMethod);
    document.getElementById('confirmationAddress').textContent = `${orderData.address}, ${orderData.city}}`;
    
    document.getElementById('confirmationModal').classList.add('active');
}

// Get payment method name
function getPaymentMethodName(method) {
    const methods = {
        'cod': '💵 Cash on Delivery',
        'bkash': '🏦 bKash',
        'nagad': '📱 Nagad',
        'whatsapp': '💬 WhatsApp Order'
    };
    return methods[method] || method;
}

// Share order on WhatsApp
function shareOrderOnWhatsApp() {
    const orderId = document.getElementById('orderId').textContent;
    const message = `Hey! I just received my order ${orderId} from Skyo Lifestyle. Great products and fast delivery! ✨ Check them out: https://skyolifestyle.com`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Order via WhatsApp (direct)
function orderViaWhatsAppDirect(productId) {
    const product = products.find(p => p.id === productId);
    const message = `Hi Skyo Lifestyle! I'm interested in *${product.name}*\n\nPrice: ৳${product.price}\n\nPlease let me know more details and how to order.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Order via WhatsApp from cart
function orderViaWhatsApp() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let message = `*Hi Skyo Lifestyle!*\n\nI'd like to order the following items:\n\n`;
    
    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} = ৳${item.price * item.quantity}\n`;
    });
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + DELIVERY_CHARGE;
    
    message += `\nSubtotal: ৳${subtotal}\n`;
    message += `Delivery: ৳${DELIVERY_CHARGE}\n`;
    message += `*Total: ৳${total}*\n\n`;
    message += `Please send me payment details and delivery information.`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Go to home
function goToHome() {
    document.getElementById('confirmationModal').classList.remove('active');
    cart = [];
    updateCart();
    window.scrollTo(0, 0);
}

// Show notification
function showNotification(message) {
    // Simple notification (you can enhance this)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #25a244;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 500;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animation styles
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);