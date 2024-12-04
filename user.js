// Initialize user credentials in local storage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([{ username: 'admin', password: '1234' }]));
}

// Function to validate user login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        document.getElementById('loginMessage').textContent = 'Login successful!';
        showSection('home'); // Navigate to home after successful login
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid username or password.';
    }
});

// Function to add a new user
function addUser(newUsername, newPassword) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.username === newUsername)) {
        alert('Username already exists!');
        return;
    }
    users.push({ username: newUsername, password: newPassword });
    localStorage.setItem('users', JSON.stringify(users));
    alert('User added successfully!');
}

// Function to edit an existing user's password
function editPassword(username, newPassword) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex === -1) {
        alert('User not found!');
        return;
    }
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Password updated successfully!');
}

// Event Listeners for User Management Forms
document.getElementById('addUserForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    addUser(newUsername, newPassword);
});

document.getElementById('editPasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('edit-username').value;
    const newPassword = document.getElementById('edit-password').value;
    editPassword(username, newPassword);
});

// Navigation and Section Management
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section');

// Ensure login is the first visible section on page load
document.addEventListener('DOMContentLoaded', () => {
    showSection('login');
});

// Show the appropriate section
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
        section.classList.toggle('hidden', section.id !== sectionId);
    });
}

// Cart and Wishlist Functionality
let cart = [];
let wishlist = [];
let total = 0;

// Add to Cart
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    total += productPrice;
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = cart.length ? '' : '<li>Your cart is empty.</li>';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
}

// Checkout
function checkout() {
    if (!cart.length) {
        alert('Your cart is empty.');
        return;
    }
    alert('Thank you for your purchase!');
    cart = [];
    total = 0;
    updateCartUI();
}

// Add to Wishlist
function addToWishlist(productName, productPrice) {
    wishlist.push({ name: productName, price: productPrice });
    updateWishlistUI();
}

function updateWishlistUI() {
    const wishlistItems = document.getElementById('wishlist-items');
    wishlistItems.innerHTML = wishlist.length ? '' : '<li>Your wishlist is empty.</li>';
    wishlist.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        wishlistItems.appendChild(li);
    });
}

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        if (sectionId) showSection(sectionId);
    });
});

// Theme Toggle Functionality
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.querySelectorAll('.sticker').forEach(sticker => {
    sticker.addEventListener('mouseover', () => {
        sticker.style.transition = 'all 0.3s ease-in-out';
        sticker.style.transform = 'rotate(15deg) scale(1.2)';
    });

    sticker.addEventListener('mouseout', () => {
        sticker.style.transform = 'rotate(0deg) scale(1)';
    });
});

