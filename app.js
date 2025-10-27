const auth = firebase.auth();

// UI Elements
const authContainer = document.getElementById('auth-container');
const helloContainer = document.getElementById('hello-container');
const userEmail = document.getElementById('user-email');
const errorMessage = document.getElementById('error-message');

// Auth buttons and inputs
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const emailSignup = document.getElementById('email-signup');
const passwordSignup = document.getElementById('password-signup');
const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login');

// Event listeners
signupBtn.addEventListener('click', async () => {
    try {
        await auth.createUserWithEmailAndPassword(emailSignup.value, passwordSignup.value);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});

loginBtn.addEventListener('click', async () => {
    try {
        await auth.signInWithEmailAndPassword(emailLogin.value, passwordLogin.value);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});

logoutBtn.addEventListener('click', async () => {
    await auth.signOut();
});

// Auth state observer
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        helloContainer.classList.remove('hidden');
        authContainer.classList.add('hidden');
        userEmail.textContent = user.email;
    } else {
        // User is signed out
        authContainer.classList.remove('hidden');
        helloContainer.classList.add('hidden');
        errorMessage.textContent = ''; // Clear any previous errors
    }
});
