const form = document.getElementsByClassName('formAdd')

function test() {
    console.log('test desde el home.js');
}

const addProduct = async (productId,userId) => {

    // localStorage.setItem('cart', JSON.stringify(product));
    
    try {

        const add = {
            productId,
            quantity: 1,
            userId
        }
        const url = 'http://localhost:3000/api/shopcar/add'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(add)
        }
        const response = await fetch(url, options)
        console.log(response);

        if (!response.ok) {
            throw new Error('Error al agregar el producto')
        }

        const data = await response.json()
        console.log(data);

        alert('Producto agregado correctamente')
    } catch (error) {
        console.error('Error:', error)
    }
}

console.log('log desde el home.js');
