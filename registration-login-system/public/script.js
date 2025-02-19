document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    const title = document.getElementById('form-title');
    const toggleLink = document.getElementById('toggle-link');

    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        const isRegistering = title.textContent === 'Register';

        form.action = isRegistering ? '/login' : '/register';
        title.textContent = isRegistering ? 'Login' : 'Register';
        form.querySelector('button').textContent = isRegistering ? 'Login' : 'Register';
        toggleLink.textContent = isRegistering
            ? "Don't have an account? Register"
            : "Already have an account? Login";
    });
});
