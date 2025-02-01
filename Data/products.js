export function getProduct(productId) {
	let matchingProduct;

	products.forEach((Product) => {
		if (productId === Product.id) {
			matchingProduct = Product;
		}
	});

	return matchingProduct;
}

class Product {
	id;
	image;
	name;
	rating;
	priceCents;

	constructor(ProductDetails) {
		this.id = ProductDetails.id;
		this.image = ProductDetails.image;
		this.name = ProductDetails.name;
		this.rating = ProductDetails.rating;
		this.priceCents = ProductDetails.priceCents;
	}
	getStarsURL() {
		return `../images/ratings/rating-${this.rating.stars * 10}.png`;
	}
	getPrice() {
		return `$${(this.priceCents / 100).toFixed(2)}`;
	}

	extraInfoHTML() {
		return '';
	}
} 


class Clothing extends Product{
	sizeChartLink; 
	
	constructor(productDetails) {
		super(productDetails);
		this.sizeChartLink = productDetails.sizeChartLink;
	}

	extraInfoHTML() {
		return `
		<a href="../${this.sizeChartLink}"  target = "_blank">Size chart</a>
		`
	}
}

class Appliances extends Product{
	instructionsLink; 
	warrantyLink;

	constructor(productDetails) {
		super(productDetails);
		this.instructionsLink = productDetails.instructionsLink;
		this.warrantyLink = productDetails.warrantyLink;
	}

	extraInfoHTML() {
		return `<a href="${this.instructionsLink}">Instructions</a>
		<a href = "${this.warrantyLink}">Warranty</a>`
	}
}

export let products = []

export function LoadProducts(fun) {
	const xhr = new XMLHttpRequest();
	
	xhr.addEventListener('load', () => {
		products = JSON.parse(xhr.response).map((productDetails) => {
			if (productDetails.type === 'clothing') {
				return new Clothing(productDetails);
			} else if (productDetails.type === 'appliances') {
				return new Appliances(productDetails);
			}
			return new Product(productDetails);
		});

		console.log('loaded the products');

		fun();
	});

	xhr.open('GET', 'https://supersimplebackend.dev/products');
	xhr.send();
}
