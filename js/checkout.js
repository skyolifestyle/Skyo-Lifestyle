// Open Checkout Modal
function openCheckout() {
    if (cart.length === 0) {
        alert("Your bag is empty.");
        return;
    }
    document.getElementById('checkoutModal').style.display = 'block';
    updateOrderSummary();
    setupPaymentTiles();
}

function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none';
}

// Update Order Summary in Checkout
function updateOrderSummary() {
    const summaryList = document.getElementById('orderSummaryItems');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = 100; 

    summaryList.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} (x${item.qty})</span>
            <span>৳${(item.price * item.qty).toLocaleString()}</span>
        </div>
    `).join('');

    document.getElementById('orderTotal').innerText = `৳${(subtotal + shipping).toLocaleString()}`;
}

// Payment Option Selection Effect
function setupPaymentTiles() {
    const options = document.querySelectorAll('.payment-option');
    options.forEach(opt => {
        opt.addEventListener('click', function() {
            options.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input').checked = true;
        });
    });
}

// Place Order & Generate WhatsApp Message
function validateAndPlaceOrder() {
    const name = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const payment = document.querySelector('input[name="paymentMethod"]:checked').value;

    if (!name || !phone || !address) {
        alert("Please fill in your delivery details.");
        return;
    }

    const orderId = 'SKYO-' + Math.floor(1000 + Math.random() * 9000);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const total = subtotal + 100;

    // Create Premium WhatsApp Message
    let message = `✨ *NEW ORDER: ${orderId}* ✨\n\n`;
    message += `👤 *Customer:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `📍 *Address:* ${address}\n`;
    message += `💳 *Payment:* ${payment.toUpperCase()}\n\n`;
    message += `📦 *Products:*\n`;
    
    cart.forEach(item => {
        message += `- ${item.name} (x${item.qty}): ৳${(item.price * item.qty).toLocaleString()}\n`;
    });

    message += `\n💰 *Total Amount: ৳${total.toLocaleString()}*`;
    message += `\n\n_Thank you for shopping with Skyo Lifestyle!_`;

    const waUrl = `https://wa.me/8801601193696?text=${encodeURIComponent(message)}`;
    
    // Clear cart and redirect
    localStorage.removeItem('SKYO_CART');
    window.open(waUrl, '_blank');
    location.reload();
}

// Standard WhatsApp Order (Directly from Cart)
function orderViaWhatsApp() {
    if (cart.length === 0) return alert("Bag is empty");
    openCheckout(); // Redirecting to checkout for better info gathering
}