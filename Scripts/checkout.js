import { cart } from './cart-class.js';

import { getProduct, LoadProducts } from '../Data/products.js';

import '../Data/car.js';

import {
	deliveryOptions,
	getDeliveryOption,
	calculateDeliveryDate,
} from './deliveryOptions.js';

import { renderCheckoutHeader } from './checkoutHeader.js';

// import './cart-class.js';

new Promise((resolve) => {
    LoadProducts(() => {
        resolve();
    });
}).then(() => {
    LoadProductGrid();
})



function LoadProductGrid() {

    initializeCart();
    setUpDeleteButton();
    setUpQuantityButton();
    setUpUpdateButton();
    setUpSaveButton();
    updateCartQuantity();

	function initializeCart() {
		renderOrderSummary();
		renderPaymentSummary();
		renderCheckoutHeader();
		setUpEventListeners();
	}

	function renderOrderSummary() {
		let cartHTML = '';

		cart.cartItems.forEach((product) => {
			const { productId } = product;
			const matchingProduct = getProduct(productId);

			let deliveryOptionId = product.id;

			const deliveryOption =
				getDeliveryOption(deliveryOptionId);

			const deliveryDateString =
				calculateDeliveryDate(deliveryOption);
			cartHTML += `
    
        <div class="product-delivery product-delivery-${matchingProduct.id}">
            <div class="delivery-time">
                Delivery date: ${deliveryDateString}
            </div>
            <div class="delivery-info">
                <div class="left-part">
                    <div
                        class="product-image"
                    >
                        <img
                            class="image"
                            src="../${matchingProduct.image}"
                        />
                    </div>
                    <div
                        class="product-details"
                    >
                        <div
                            class="product-name"
                        >
                            ${matchingProduct.name}
                        </div>
                        <div
                            class="product-cost"
                        >
                            $${(matchingProduct.priceCents / 100).toFixed(2)}
                        </div>
                        <div
                            class="product-updation"
                        >
                            <div
                                class="quantity"
                            >
                                Quantity:
                                <span class = "quantity-num">
                                ${product.quantity}
                                </span>
                            </div>
                            <div
                                class="update update-js"
                                data-product-id = "${matchingProduct.id}"
                            >
                                Update
                            </div>
                            <div class = "quantity-input-container quantity-input-container-${
					matchingProduct.id
				}">
                            <input class = "quantity-input quantity-input-${
					matchingProduct.id
				}" data-product-id = "${matchingProduct.id}">
                            </div>
                            <span class = "save-quantity-link link-primary" data-product-id = "${
					matchingProduct.id
				}">
                            Save
                            </span>
                            <div
                                class="delete delete-js" 
                                data-product-id = "${matchingProduct.id}"
                            >
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
                <div class="delivery">
                    <div
                        class="delivery-heading"
                    >
                        Choose a
                        delivery
                        option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, product)}
                </div>
            </div>
        </div>

    `;
			document.querySelector('.checkout-grid-js').innerHTML =
				cartHTML;
		});
		function deliveryOptionsHTML(matchingProduct, product) {
			let optionHTML = '';
			deliveryOptions.forEach((deliveryOption) => {
				const deliveryDateString =
					calculateDeliveryDate(deliveryOption);
				const priceCents =
					deliveryOption.costCents === 0
						? 'Free'
						: `$${(
								deliveryOption.costCents /
								100
						  ).toFixed(2)}`;
				const isChecked =
					deliveryOption.id === product.id;
				optionHTML += `<div
            class="delivery-option">
            <div
                class="radio-input js-radio-input" data-product-id = "${
			matchingProduct.id
		}" data-delivery-option-id = "${deliveryOption.id}"
            >
                <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-input-${matchingProduct.id}"
                    ${isChecked ? 'checked' : ''}
                />
            </div>
            <div
                class="delivery-details"
            >
                <div
                    class="delivery-date"
                >
                    ${deliveryDateString}
                </div>
                <div
                    class="delivery-cost"
                >
                    ${priceCents}
                    -
                    Shipping
                </div>
            </div>
        </div>`;
			});
			return optionHTML;
		}
	}
	function setUpDeleteButton() {
		document.querySelectorAll('.delete-js').forEach((link) => {
			link.addEventListener('click', () => {
				const productId = link.dataset.productId;
				cart.removeFromCart(productId);
				const container = document.querySelector(
					`.product-delivery-${productId}`
				);
				container.remove();
				updateCartQuantity();
			});
		});
	}

	function updateCartQuantity() {
		const cartQuantity = cart.calculateCartQuantity();

		document.querySelector('.totalItems-js').innerHTML =
			cartQuantity;
		renderPaymentSummary();
	}
	updateCartQuantity();

	function setUpQuantityButton() {
		document.querySelectorAll('.quantity-input').forEach(
			(input) => {
				input.addEventListener('click', () => {
					const productId =
						input.dataset.productId;
					document.querySelector(
						`.quantity-input-container-${productId}`
					).classList.toggle('clicked');
				});
			}
		);
		document.querySelectorAll('.quantity-input').forEach(
			(input) => {
				input.addEventListener('blur', () => {
					const productId =
						input.dataset.productId;
					document.querySelector(
						`.quantity-input-container-${productId}`
					).classList.remove('clicked');
				});
			}
		);
	}
	setUpQuantityButton();
	function setUpUpdateButton() {
		document.querySelectorAll('.update-js').forEach((update) => {
			update.addEventListener('click', () => {
				const productId = update.dataset.productId;
				document.querySelector(
					`.product-delivery-${productId}`
				).classList.add('is-editing-quantity');
			});
		});
	}
	setUpUpdateButton();
	function setUpSaveButton() {
		document.querySelectorAll('.save-quantity-link').forEach(
			(save) => {
				save.addEventListener('click', () => {
					const { productId } = save.dataset;
					updateOnClick(productId);
				});
			}
		);
		document.querySelectorAll('.save-quantity-link').forEach(
			(save) => {
				const { productId } = save.dataset;
				document.querySelectorAll(
					`.quantity-input-${productId}`
				).forEach((input) => {
					input.addEventListener(
						'keydown',
						(event) => {
							const keyPressed =
								event.key;
							if (
								keyPressed ===
								'Enter'
							) {
								updateOnClick(
									productId
								);
							}
						}
					);
				});
			}
		);
	}
	setUpSaveButton();
	function updateOnClick(productId) {
		document.querySelectorAll(
			`.quantity-input-${productId}`
		).forEach((input) => {
			const value = input.value;
			if (value >= 0 && value < 1000) {
				document.querySelector(
					`.product-delivery-${productId}`
				).classList.remove('is-editing-quantity');
				cart.updateQuantity(productId, Number(value));
				document.querySelector(
					'.quantity-num'
				).innerHTML = Number(value);
				updateCartQuantity();
			}
		});
		renderPaymentSummary();
	}
	function setUpEventListeners() {
		document.querySelectorAll('.js-radio-input').forEach(
			(element) => {
				element.addEventListener('click', () => {
					const { productId, deliveryOptionId } =
						element.dataset;
					cart.updateDeliveryOption(
						productId,
						deliveryOptionId
					);
					renderOrderSummary();
					setUpDeleteButton();
					setUpQuantityButton();
					setUpSaveButton();
					setUpUpdateButton();
					renderPaymentSummary();
					setUpEventListeners();
				});
			}
		);
	}

	function renderPaymentSummary() {
		let priceCents = 0;
		let shippingCostCents = 0;
		let quantity = 0;
		cart.cartItems.forEach((cartItem) => {
			const product = getProduct(cartItem.productId);
			priceCents += product.priceCents * cartItem.quantity;
			const deliveryOption = getDeliveryOption(cartItem.id);
			shippingCostCents += deliveryOption.costCents;
			quantity += cartItem.quantity;
		});
		const totalBeforeTaxCents = priceCents + shippingCostCents;
		const taxCents = totalBeforeTaxCents * 0.1;
		const totalCents = totalBeforeTaxCents + taxCents;

		let paymentSummaryHTML = `
        <div class="orderSummary">
            <div class="heading">
                Order Summary
            </div>
            <div class="itemCost">
                <div class="items">
                    Items (${quantity}):
                </div>
                <div class="price">
                    $${(Math.round(priceCents) / 100).toFixed(2)}
                </div>
            </div>
            <div class="shippingCost">
                <div class="shipping">
                    Shipping &
                    handling:
                </div>
                <div class="cost">
                    $${(Math.round(shippingCostCents) / 100).toFixed(2)}
                </div>
            </div>
            <div class="totalBeforeTax">
                <div class="totalb4Tax">
                    Total before
                    tax:
                </div>
                <div class="totalPrice">
                    $${(Math.round(totalBeforeTaxCents) / 100).toFixed(2)}
                </div>
            </div>
            <div class="afterTax">
                <div class="tax">
                    Estimated
                    tax(10%):
                </div>
                <div class="taxPrice">
                    $${(Math.round(taxCents) / 100).toFixed(2)}
                </div>
            </div>
            <div class="totalCost">
                <div class="totalOrder">
                    Order total:
                </div>
                <div class="finalPrice">
                    $${(Math.round(totalCents) / 100).toFixed(2)}
                </div>
            </div>
            <div class="paypal">
                Use PayPal
                <input
                    class="checkbox"
                    type="checkbox"
                />
            </div>
            <div class="placeOrder">
                <button
                    class="orderButton"
                >
                    Place your order
                </button>
            </div>
        </div>  
    `;

		document.querySelector('.orderPart-js').innerHTML =
			paymentSummaryHTML;
	}

}