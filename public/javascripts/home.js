const form = document.getElementById('formAdd')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    console.log(formData);
    
})

console.log('log desde el home.js');
