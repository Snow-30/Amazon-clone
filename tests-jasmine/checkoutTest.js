import { initializeCart } from '../Scripts/checkout.js';
import { loadFromStorage } from '../Scripts/cart.js';
describe('test suite: Display data in checkout page', () => {
    it('displays the cart', () => {
		document.querySelector('.test-container').innerHTML = `
            <div class = "checkout-grid-js"></div>
            <div class = "orderPart-js"></div>
            <div class="header-js"></div>
        `;
        if(document.querySelector('.test-container'))

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([
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
			]);
        });
         console.log('HEllo');
        loadFromStorage();
        initializeCart();
	});
});
