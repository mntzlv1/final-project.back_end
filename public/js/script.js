// This file contains common JavaScript scripts used throughout the application.

// Example function to handle form submissions
function handleFormSubmission(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Perform an AJAX request or fetch API call here
    console.log('Form submitted:', data);
}

// Example function to toggle navigation menu
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('my-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }

    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }
});

