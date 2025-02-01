// Importing the modules from other files

import { cart } from './cart-class.js';

import { products, LoadProducts } from '../Data/products.js';

LoadProducts(MainPageGrid)

function MainPageGrid() {
    

    // Update the cart whenever the script loads
    updateCart();
    // Declare an element that will conatain all of the html code to display on the page
    let htmlDisplay = '';
    // Use .forEach to loop through the entire products array
    products.forEach((product) => {
        // Html code to display on the page
        htmlDisplay += `
        <div class="product">
            <div class="product-image">
            <!-- Since product array contains object use it to dynamically produce the images for all the objects-->
                <img src="../${product.image}" class="product-img">
            </div>
            <div class="product-text">
            <!-- Since product array contains object use it to dynamically produce the name for all the objects-->
                ${product.name}
            </div>
            <div class="rating-part">
            <!-- Since product array contains object use it to dynamically produce the rating stars for all the objects-->
                <img src="${product.getStarsURL()}"
                class="product-rating">
            <div class="rating-num">
            <!-- Since product array contains object use it to dynamically produce the rating count for all the objects-->
                ${product.rating.count}
            </div>
            </div>
            <div class="product-price">
            <!-- Since product array contains object use it to dynamically produce the price for all the objects-->
                ${product.getPrice()}
            </div>
            <div class="dropdown-menu">
            <!-- Since product array contains object use it to dynamically produce the dropdown for all the objects with different class name-->
                <select class="dropdown js-dropdown-${product.id}">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select>
            </div>
             ${product.extraInfoHTML()} 
            <!-- Since product array contains object use it to dynamically produce the class name for all the objects-->
            <div class="added-to-cart js-added-${product.id}">
                <img class = "tick" src="../images/icons/checkmark.png">Added
            </div>
            <div class="add">
            <!-- Since product array contains object use it to dynamically produce the class name for all the objects-->
                <button class="add-to-cart js-add-to-cart" data-product-id="${product.id
            }">
                    Add to Cart
                </button>
            </div>
        </div>`;
    });
    // Display the html on the page using DOM
    document.querySelector('.js-Products').innerHTML = htmlDisplay;
    // Create an array that will store all the ids since each product will have different id
    let Ids = {};
    // Create an updateCart Function to update the cart
    function updateCart() {
        const cartQuantity = cart.calculateCartQuantity();
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }
    // Create a function to display the added message whenever add to cart is clicked
    function displayMessage(productId) {
        const addedMessage = document.querySelector(`.js-added-${productId}`);
        addedMessage.classList.add('added-to-cart-visible');
        // Clear any previous timeout for this product
        const prevId = Ids[productId];
        if (prevId) {
            clearTimeout(prevId);
        }
        // Remove the message after 2 seconds
        const Id = setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-visible');
        }, 2000);
        // Store the timeout ID for this product
        Ids[productId] = Id;
    }
    // Add event listener to the add to cart button to call different functions
    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            // Retrieve the productId from the button dataset
            const { productId } = button.dataset;
            // Call the necessary function
            cart.addToCart(productId);
            updateCart();
            displayMessage(productId);
        });
    });
}
