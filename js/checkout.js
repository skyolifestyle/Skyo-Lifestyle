// Open Checkout Modal
function openCheckout() {
    if (typeof cart === 'undefined' || cart.length === 0) {
        alert("Your bag is empty.");
        return;
    }
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.style.display = 'block';
        updateOrderSummary();
    }
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Update Order Summary in Checkout
function updateOrderSummary() {
    const summaryList = document.getElementById('orderSummaryItems');
    const orderTotal = document.getElementById('orderTotal');
    
    if (!summaryList || !orderTotal) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = 100; 

    summaryList.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} (x${item.qty})</span>
            <span>৳${(item.price * item.qty).toLocaleString()}</span>
        </div>
    `).join('');

    orderTotal.innerText = `৳${(subtotal + shipping).toLocaleString()}`;
}

// Payment Option Selection Effect (বাহিরে নিয়ে আসা হয়েছে পারফরম্যান্সের জন্য)
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

// Place Order & Generate WhatsApp Message
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

    // 🟢 ফিক্স: পেমেন্ট মেথড সিলেক্ট না করা থাকলে ক্যাশ অন ডেলিভারি ডিফল্ট ধরে নেবে
    const payment = checkedPayment ? checkedPayment.value : 'cod';

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
    if (typeof cart === 'undefined' || cart.length === 0) {
        alert("Bag is empty");
        return;
    }
    openCheckout();
}

// 🟢 পেজ লোড হওয়ার সাথে সাথে পেমেন্ট বাটন এবং প্লেস অর্ডার বাটনের ইভেন্ট চালু হবে
document.addEventListener('DOMContentLoaded', () => {
    setupPaymentTiles();

    // প্লেস অর্ডার বাটনে ক্লিক কানেক্ট করা
    const placeOrderBtn = document.querySelector('.place-order-btn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', validateAndPlaceOrder);
    }
});
