// Payment Instructions Management
function updatePaymentInstructions() {
    const selected = document.querySelector('input[name="paymentMethod"]:checked').value;
    const instructionsDiv = document.getElementById('paymentInstructions');
    
    let html = '';
    
    switch(selected) {
        case 'cod':
            html = `
                <div class="payment-instructions active">
                    <h4>💵 Cash on Delivery (COD)</h4>
                    <p>✓ No payment needed right now</p>
                    <p>✓ Pay when you receive your order</p>
                    <p>✓ Our delivery person will call you before arrival</p>
                    <p>✓ Verify the product before making payment</p>
                </div>
            `;
            break;
        
        case 'bkash':
            html = `
                <div class="payment-instructions active">
                    <h4>🏦 bKash Payment Instructions</h4>
                    <p><strong>Send Money to:</strong></p>
                    <div class="payment-number">01601193696</div>
                    <p><strong>Steps:</strong></p>
                    <p>1. Go to MENU > Send Money</p>
                    <p>2. Enter the bKash number: 01601193696</p>
                    <p>3. Enter the amount: <strong id="bkashAmount">৳0</strong></p>
                    <p>4. Enter reference: <strong id="bkashRef">Order Amount</strong></p>
                    <p>5. Complete the transaction</p>
                    <p><strong>⚠️ Important:</strong> Share your transaction ID with us via WhatsApp after payment</p>
                </div>
            `;
            updatePaymentAmount('bkash');
            break;
        
        case 'nagad':
            html = `
                <div class="payment-instructions active">
                    <h4>📱 Nagad Payment Instructions</h4>
                    <p><strong>Send Money to:</strong></p>
                    <div class="payment-number">01601193696</div>
                    <p><strong>Steps:</strong></p>
                    <p>1. Open Nagad App</p>
                    <p>2. Select "Send Money"</p>
                    <p>3. Enter the Nagad number: 01601193696</p>
                    <p>4. Enter the amount: <strong id="nagadAmount">৳0</strong></p>
                    <p>5. Complete the transaction</p>
                    <p><strong>⚠️ Important:</strong> Share your transaction ID with us via WhatsApp after payment</p>
                </div>
            `;
            updatePaymentAmount('nagad');
            break;
        
        case 'whatsapp':
            html = `
                <div class="payment-instructions active">
                    <h4>💬 WhatsApp Order Instructions</h4>
                    <p>✓ Your order details will be sent to WhatsApp</p>
                    <p>✓ You'll receive payment options and confirmation</p>
                    <p>✓ Our team will guide you through the payment process</p>
                    <p><strong>WhatsApp Number:</strong></p>
                    <div class="payment-number">01601193696</div>
                    <p>✓ Chat will be available 9 AM to 9 PM daily</p>
                </div>
            `;
            break;
    }
    
    instructionsDiv.innerHTML = html;
}

function updatePaymentAmount(method) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + DELIVERY_CHARGE;
    
    if (method === 'bkash') {
        document.getElementById('bkashAmount').textContent = `৳${total}`;
    } else if (method === 'nagad') {
        document.getElementById('nagadAmount').textContent = `৳${total}`;
    }
}

// Form validation
function validateCheckoutForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const postcode = document.getElementById('postcode').value.trim();
    
    if (!fullName) {
        alert('Please enter your full name');
        return false;
    }
    
    if (!phone) {
        alert('Please enter your phone number');
        return false;
    }
    
    if (!phone.match(/^(01|\+8801)[0-9]{9}$/)) {
        alert('Please enter a valid Bangladeshi phone number (01XXXXXXXXX)');
        return false;
    }
    
    if (!address) {
        alert('Please enter your delivery address');
        return false;
    }
    
    if (!city) {
        alert('Please enter your city');
        return false;
    }
    
    if (!postcode) {
        alert('Please enter your postcode');
        return false;
    }
    
    return true;
}

// Enhanced checkout modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize payment instructions
    updatePaymentInstructions();
    
    // Handle form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateAndPlaceOrder();
        });
    }
});

// Close modal by clicking outside
document.addEventListener('click', function(e) {
    const checkoutModal = document.getElementById('checkoutModal');
    const confirmationModal = document.getElementById('confirmationModal');
    
    if (e.target === checkoutModal) {
        closeCheckout();
    }
    if (e.target === confirmationModal) {
        goToHome();
    }
});