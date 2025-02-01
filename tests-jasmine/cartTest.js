import { addToCart, loadFromStorage, cart } from '../Scripts/cart.js';

describe('test suite: add to cart', () => {
    it('add to cart when product is existing', () => {
		spyOn(localStorage, 'setItem');
		spyOn(document, 'querySelector').and.callFake(() => ({
			value: '1', // Mock a dropdown element with a value of '1'
		}));
		spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
			{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1, 
                    id: 1, 
			},
		]);
		});
		loadFromStorage();

		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(cart[0].productId).toEqual(
			'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
		);
		expect(cart[0].quantity).toEqual(2); // The new product should have quantity 1
    });

    it('add to cart when product is new', () => {
		spyOn(localStorage, 'setItem');
		spyOn(document, 'querySelector').and.callFake(() => ({
			value: '1', // Mock a dropdown element with a value of '1'
		}));
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([]);
		});
		loadFromStorage();

		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(cart[0].productId).toEqual(
			'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
		);
		expect(cart[0].quantity).toEqual(1); // The new product should have quantity 1
    });
});
