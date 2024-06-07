const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click',() =>{
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click',() =>{
        nav.classList.remove('active');
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const cartButtons = document.querySelectorAll('.cart');

    cartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            const img = this.getAttribute('data-img');

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name, price, img });

            localStorage.setItem('cart', JSON.stringify(cart));

            alert('Item added to cart');
        });
    });
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const product = button.closest('.pro');
            const productInfo = {
                image: product.querySelector('img').src,
                name: product.querySelector('.des h5').innerText,
                price: product.querySelector('.des h4').innerText.replace('$', ''),
                quantity: 1,
            };
            addToCart(productInfo);
        });
    });
});

function addToCart(product) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

// script.js

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#cart')) {
        loadCart();
    }
});

function loadCart() {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    const cartTableBody = document.querySelector('#cart tbody');
    cartTableBody.innerHTML = '';

    let total = 0;

    cart.forEach((product, index) => {
        const productTotal = product.price * product.quantity;
        total += productTotal;

        cartTableBody.innerHTML += `
            <tr>
                <td> <a href="#" onclick="removeFromCart(${index})"> <i class="far fa-times-circle"></i> </a></td>
                <td> <img src="${product.image}" alt=""></td>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td><input type="number" value="${product.quantity}" onchange="updateQuantity(${index}, this.value)"></td>
                <td>$${productTotal}</td>
            </tr>
        `;
    });

    document.querySelector('#subtotal table').innerHTML = `
        <tr>
            <td>Cart Subtotal</td>
            <td>$${total.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Shipping</td>
            <td>$100</td>
        </tr>
        <tr>
            <td><strong>Total</strong></td>
            <td><strong>$${(total + 100).toFixed(2)}</strong></td>
        </tr>
    `;
}

function removeFromCart(index) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function updateQuantity(index, quantity) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart[index].quantity = parseInt(quantity, 10);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.single-pro-details .normal');
    
    if (addToCartButton) {
        addToCartButton.addEventListener('click', (event) => {
            event.preventDefault();
            const productDetails = document.querySelector('.single-pro-details');
            const productInfo = {
                image: document.querySelector('.single-pro-image img').src,
                name: productDetails.querySelector('h4').innerText,
                price: productDetails.querySelector('h2').innerText.replace('$', ''),
                quantity: parseInt(productDetails.querySelector('input[type="number"]').value, 10),
                size: productDetails.querySelector('select').value,  // Ensure size is captured
            };
            addToCart(productInfo);
            alert("Product added to cart!");
        });
    }

    const addToCartButtons = document.querySelectorAll('.cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const product = button.closest('.pro');
            const productInfo = {
                image: product.querySelector('img').src,
                name: product.querySelector('.des h5').innerText,
                price: product.querySelector('.des h4').innerText.replace('$', ''),
                quantity: 1,
                size: '', // You may want to handle size for these products as well
            };
            addToCart(productInfo);
            alert("Product added to cart!");
        });
    });
});

function addToCart(product) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    
    const existingProductIndex = cart.findIndex(item => item.name === product.name && item.size === product.size);
    
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#cart')) {
        loadCart();
    }
});

function loadCart() {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    const cartTableBody = document.querySelector('#cart tbody');
    cartTableBody.innerHTML = '';

    let total = 0;

    cart.forEach((product, index) => {
        const productTotal = product.price * product.quantity;
        total += productTotal;

        cartTableBody.innerHTML += `
            <tr>
                <td> <a href="#" onclick="removeFromCart(${index})"> <i class="far fa-times-circle"></i> </a></td>
                <td> <img src="${product.image}" alt=""></td>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td><input type="number" value="${product.quantity}" onchange="updateQuantity(${index}, this.value)"></td>
                <td>${product.size}</td>
                <td>$${productTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    document.querySelector('#subtotal table').innerHTML = `
        <tr>
            <td>Cart Subtotal</td>
            <td>$${total.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Shipping</td>
            <td>$100</td>
        </tr>
        <tr>
            <td><strong>Total</strong></td>
            <td><strong>$${(total + 100).toFixed(2)}</strong></td>
        </tr>
    `;
}

function removeFromCart(index) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function updateQuantity(index, quantity) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart[index].quantity = parseInt(quantity, 10);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}
