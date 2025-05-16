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
        //console.log(response);

        if (!response.ok) {
            throw new Error('Error al agregar el producto')
        }

        const data = await response.json()
        //console.log(data);

        alert('Producto agregado al carrito')
    } catch (error) {
        console.error('Error:', error)
    }
}

const deleteProduct = async (productId, userId)=> {
    try {
        const del = {
            productId,
            userId
        }

        const url = `http://localhost:3000/api/shopcar/remove/${productId}`
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application.json'
            },
            body: JSON.stringify({userId})
        }
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error("error al eliminar producto", error);            
        }

        const data = await response.json();
        alert('producto eliminado')
        window.location.reload()
    } catch (error) {
        console.error('error', error)
    }
}

const clearCart = async (orderId, userId) => {
    try {
        const del = {
            orderId,
            userId
        }

        const url = `http://localhost:3000/api/shopcar/clearShopCar`
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application.json'
            },
            body: JSON.stringify({userId})
        }
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error("error al eliminar producto", error);            
        }

        const data = await response.json();
        
        window.location.reload()
    } catch (error) {
        console.error('error', error)
    }
    
}