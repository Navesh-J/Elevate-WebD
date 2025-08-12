const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMsg = document.querySelector('.success-message');

function showError(input, message) {
  const errorElement = input.parentElement.querySelector('.error');
  errorElement.textContent = message;
}

function clearError(input) {
  const errorElement = input.parentElement.querySelector('.error');
  errorElement.textContent = '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  let isValid = true;
  successMsg.textContent = '';

  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Name is required');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  if (emailInput.value.trim() === '') {
    showError(emailInput, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, 'Enter a valid email');
    isValid = false;
  } else {
    clearError(emailInput);
  }

  if (messageInput.value.trim() === '') {
    showError(messageInput, 'Message cannot be empty');
    isValid = false;
  } else {
    clearError(messageInput);
  }

  if (isValid) {
    successMsg.textContent = '✅ Message sent';
    form.reset();
  }
});
