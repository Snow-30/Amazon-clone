export function renderCheckoutHeader() {
    let headerHTML = `
    <div class="header-content">
        <div class="left-section">
            <a class="logo" href="amazonProject.html">
                <img
                    class="amazon"
                    src="../images/amazon-logo.png"
                />
                <img
                    class="amazon-mobile-logo"
                    src="../images/amazon-mobile-logo.png"
                />
            </a>
        </div>
        <div class="middle-section">
            <div class="pageHeading">
                Checkout (
                <div class="totalItems totalItems-js">
                    
                </div>
                )
            </div>
        </div>
        <div class="right-section">
            <img
                src="../images/icons/checkout-lock-icon.png"
            />
        </div>
    </div>
    `;

    document.querySelector('.header-js').innerHTML = headerHTML;
}