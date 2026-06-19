document.addEventListener("DOMContentLoaded", () => {
    const cartSection = document.querySelector(".cart-section");

    if (cartSection) {
        setupCheckoutActions(cartSection);
    }

    renderCheckout();
});

function renderCheckout() {
    const cartSection = document.querySelector(".cart-section");
    const summary = document.querySelector(".summary");

    if (!cartSection || !summary) {
        return;
    }

    const bag = window.PagesCoCart.getBag();

    if (bag.length === 0) {
        cartSection.innerHTML = `
            <div class="empty-bag">
                <h2>Your bag is empty</h2>
                <p>Books you add in this session will appear here.</p>
                <a href="/pages/books.html">Continue shopping</a>
            </div>
        `;
        renderSummary(summary, bag);
        return;
    }

    cartSection.innerHTML = bag.map(item => createCartItem(item)).join("");
    renderSummary(summary, bag);
}

function createCartItem(item) {
    return `
        <div class="cart-item" data-book-id="${item.id}">
            <div class="item-cover">
                <div
                    class="book-cover"
                    style="background-image: url('${item.cover}')"
                ></div>

                <div class="book-info">
                    <h3>${item.title}</h3>
                    <p class="author">${item.author}</p>
                    <button type="button" class="remove">Remove</button>
                </div>
            </div>

            <div class="item-buy">
                <div class="quantity">
                    <button type="button" class="quantity-btn" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button type="button" class="quantity-btn" data-action="increase">+</button>
                </div>

                <div class="price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        </div>
    `;
}

function renderSummary(summary, bag) {
    const itemCount = bag.reduce((total, item) => total + item.quantity, 0);
    const subtotal = bag.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    summary.innerHTML = `
        <h2>Order summary</h2>

        <div class="summary-row">
            <span>Subtotal (${itemCount} items)</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>

        <div class="summary-row">
            <span>Shipping</span>
            <span>Free</span>
        </div>

        <hr>

        <div class="summary-row total">
            <span>Total</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>

        <button class="checkout-btn" ${itemCount === 0 ? "disabled" : ""}>
            Checkout
        </button>

        <p class="note">
            You'll be asked to sign in to complete your order.
        </p>
    `;
}

function setupCheckoutActions(cartSection) {
    cartSection.addEventListener("click", (event) => {
        const cartItem = event.target.closest(".cart-item");

        if (!cartItem) {
            return;
        }

        const bookId = Number(cartItem.dataset.bookId);
        const bagItem = window.PagesCoCart.getBag().find(item => item.id === bookId);

        if (!bagItem) {
            return;
        }

        if (event.target.closest(".remove")) {
            window.PagesCoCart.removeFromBag(bookId);
            renderCheckout();
            return;
        }

        const quantityButton = event.target.closest(".quantity-btn");

        if (!quantityButton) {
            return;
        }

        const nextQuantity = quantityButton.dataset.action === "increase"
            ? bagItem.quantity + 1
            : bagItem.quantity - 1;

        window.PagesCoCart.updateBagItemQuantity(bookId, nextQuantity);
        renderCheckout();
    });
}
