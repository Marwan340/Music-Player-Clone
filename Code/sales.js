document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // stop form from submitting

    let quantity = document.getElementById('quantity').value;
    let productCost = 299.99; // the cost of the product

    let shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
    let shippingCost = 0;

    switch(shippingMethod) {
        case 'overnight':
            shippingCost = 19.99;
            break;
        case '2day':
            shippingCost = 9.99;
            break;
        default:
            shippingCost = 0;
            break;
    }

    let totalCost = (productCost * quantity) + shippingCost;
    alert(`Total Cost: $${totalCost.toFixed(2)}`);
});

document.getElementById('same-address').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('saddress').value = document.getElementById('baddress').value;
        document.getElementById('scity').value = document.getElementById('bcity').value;
        document.getElementById('sstate').value = document.getElementById('bstate').value;
        document.getElementById('szip').value = document.getElementById('bzip').value;
    } else {
        document.getElementById('saddress').value = '';
        document.getElementById('scity').value = '';
        document.getElementById('sstate').value = '';
        document.getElementById('szip').value = '';
    }
});

document.getElementById('email').addEventListener('input', function (event) {
    console.log(event);
    let email = event.target.value;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(pattern)) {
        document.getElementById('email-error').style.display = 'block';
        document.getElementById('email-error').innerHTML = "<p>Please make sure your email is correct.</p>";
    } else {
        document.getElementById('email-error').style.display = 'none';
        document.getElementById('email-error').innerHTML = "";
    }
});

document.getElementById('paypal').addEventListener('change', function() {
    document.getElementById('credit-card-fields').style.display = 'none';
    document.getElementById('paypal-fields').style.display='block';
});

document.getElementById('credit-card').addEventListener('change', function() {
    document.getElementById('credit-card-fields').style.display = 'block';
    document.getElementById('paypal-fields').style.display='none';
});
