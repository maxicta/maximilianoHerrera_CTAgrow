document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.classList.remove('invalid', 'valid');
    });

    input.addEventListener('blur', function() {
        const isValid = validateInput(this);
        this.classList.toggle('invalid', !isValid);
        this.classList.toggle('valid', isValid);
        
        const errorMessage = document.getElementById(
            `${this.id}Error`
        );
        errorMessage.style.display = isValid ? 'none' : 'block';
    });
});

function validateInput(input) {
    const type = input.type;
    if (type === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    }
    if (type === 'password') {
        return input.value.length >= 6;
    }
    return input.value.trim().length > 0;
}