const { validationResult } = require("express-validator");
const inputs = document.querySelectorAll('input');

function addClass(input) {
    const errors = validationResult(req);
    errors ? input.clasName('inputError')
}

inputs.forEach(input => {
    input.addEventListener('change', addClass)
    
});

