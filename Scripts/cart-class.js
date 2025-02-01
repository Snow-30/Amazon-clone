class Cart {
	cartItems = undefined;
	#localStorageKey = undefined;

	constructor(localStorageKey) {
		this.#localStorageKey = localStorageKey;
		this.#loadFromStorage();
	}

	#loadFromStorage() {
		this.cartItems = JSON.parse(
			localStorage.getItem(this.#localStorageKey)
		);

		if (!this.cartItems) {
			this.cartItems = [
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

	saveToLocalStorage() {
		localStorage.setItem(
			this.#localStorageKey,
			JSON.stringify(this.cartItems)
		);
	}

	addToCart(productId) {
		let matchingProduct;
		const quantitySelect = document.querySelector(
			`.js-dropdown-${productId}`
		);
		let quantity = 1;
		if (quantitySelect !== null) {
			const quantitySelected = quantitySelect.value;
			quantity = Number(quantitySelected);
		}
		this.cartItems.forEach((product) => {
			if (product.productId === productId) {
				matchingProduct = product;
			}
		});
		if (matchingProduct) {
			matchingProduct.quantity += quantity;
		} else {
			this.cartItems.push({
				productId,
				quantity,
				id: '1',
			});
		}
		this.saveToLocalStorage();
	}

	removeFromCart(productId) {
		const newCart = [];

		this.cartItems.forEach((cartItem) => {
			if (productId !== cartItem.productId) {
				newCart.push(cartItem);
			}
		});
		this.cartItems = newCart;
		this.saveToLocalStorage();
	}

	calculateCartQuantity() {
		let cartQuantity = 0;

		this.cartItems.forEach((item) => {
			cartQuantity += item.quantity;
		});
		return cartQuantity;
	}

	updateQuantity(productId, updatedQuantity) {
		this.cartItems.forEach((item) => {
			if (item.productId === productId) {
				item.quantity = updatedQuantity;
			}
			this.saveToLocalStorage();
		});
	}
	updateDeliveryOption(productId, deliveryOptionId) {
		let matchingProduct;
		this.cartItems.forEach((cartItem) => {
			if (cartItem.productId === productId) {
				matchingProduct = cartItem;
			}
		});
		matchingProduct.id = deliveryOptionId;

		this.saveToLocalStorage();
	}
}

export const cart = new Cart('cart-oop');
const businessCart = new Cart('businessCart');
console.log(cart);
console.log(businessCart);
