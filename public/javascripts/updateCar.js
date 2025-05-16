document.querySelectorAll('.update').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const body = new URLSearchParams(formData);
        const productId = formData.get('productId'); // Lo obtenés desde el hidden input

        const response = await fetch(`/api/shopcar/update/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });

        const result = await response.json();

        if (result.message) {
            const toast = document.getElementById('toast');
            toast.textContent = result.message;
            toast.classList.remove('hidden');
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                toast.classList.add('hidden');
            }, 3000);
        }
    });
});
