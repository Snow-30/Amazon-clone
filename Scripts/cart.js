export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
		cart = [
			{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 2,
				id: '1',
			},
			{
				productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
				quantity: 1,
				id: '2',
			},
		];
    }
}


export function addToCart(productId) {
    let matchingProduct;
    const quantitySelect = document.querySelector(
        `.js-dropdown-${productId}`
    );
    let quantity = 1;
    if (quantitySelect !== null) {
		const quantitySelected = quantitySelect.value;
		quantity = Number(quantitySelected);
    }
    cart.forEach((product) => {
        if (product.productId === productId) {
            matchingProduct = product;
        }
    });
    if (matchingProduct) {
        matchingProduct.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            id: '1'
        });
    }
    saveToLocalStorage(); 
}

export function removeFromCart(productId){
    const newCart = []; 

    cart.forEach((cartItem) => {
        if(productId !== cartItem.productId){
            newCart.push(cartItem); 
        }
    })
    cart = newCart; 
    saveToLocalStorage(); 
    console.log(cart); 
}

function saveToLocalStorage(){
    localStorage.setItem('cart' , JSON.stringify(cart)); 
}

export function calculateCartQuantity(){
    let cartQuantity = 0;
    
	cart.forEach((item) => {
		cartQuantity += item.quantity;
	});
    return cartQuantity; 
}
export function updateQuantity(productId, updatedQuantity) {
    cart.forEach((item) => {
        if (item.productId === productId) {
            item.quantity = updatedQuantity; 
        }
        saveToLocalStorage(); 
    })
}
export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingProduct; 
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingProduct = cartItem; 
        }
    })
    matchingProduct.id = deliveryOptionId; 

    saveToLocalStorage();
}
