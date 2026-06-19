let currentBook = null;
let pendingBook = null;

document.addEventListener("DOMContentLoaded", async () => {
    await renderBookDetail();
    setupDetailActions();
});

async function renderBookDetail() {
    try {
        const params = new URLSearchParams(window.location.search);
        const bookId = Number(params.get("id"));
        const response = await fetch("../data/data.json");
        const books = await response.json();
        const book = books.find(item => item.id === bookId);

        if (!book) {
            document.getElementById("productDetail").innerHTML = `
                <div class="container">
                    <h2>Book not found</h2>
                </div>
            `;
            return;
        }

        currentBook = book;

        document.getElementById("productDetail").innerHTML = `
            <div class="product-layout">
                <div class="book-cover-detail">
                    <div class="cover-detail"
                        style="
                            background-image: url('${book.cover}');
                            background-size: cover;
                            background-position: center;
                        ">
                        <div class="cover-content">
                            <h3>${book.title}</h3>
                            <p>${book.author}</p>
                        </div>
                    </div>
                </div>

                <div class="book-info-detail">
                    <span class="category">${book.category}</span>

                    <h1>${book.title}</h1>

                    <p class="author-detail">
                        by <em>${book.author}</em>
                    </p>

                    <div class="meta-detail">
                        <span>
                            <i class="fa-solid fa-star"></i>
                            ${book.rating}
                        </span>
                        <span>Stock: ${book.stock}</span>
                    </div>

                    <div class="price">
                        <span class="current">$${book.price.toFixed(2)}</span>
                        <span class="old">$${book.originalPrice.toFixed(2)}</span>
                    </div>

                    <p class="description-detail">
                        Discover why "${book.title}" by ${book.author}
                        has become a favorite among readers.
                        A captivating read for anyone interested in
                        ${book.category.toLowerCase()} books.
                    </p>

                    <div class="actions">
                        <button
                            type="button"
                            class="btn-cart-buy"
                            data-book-id="${book.id}"
                        >
                            Add to bag - $${book.price.toFixed(2)}
                        </button>

                        <button type="button" class="btn-wishlist">
                            <i class="fa-regular fa-heart"></i>
                            Wishlist
                        </button>
                    </div>

                    <div class="book-specs">
                        <div class="spec">
                            <span>CATEGORY</span>
                            <p>${book.category}</p>
                        </div>
                        <div class="spec">
                            <span>RATING</span>
                            <p>${book.rating}</p>
                        </div>
                        <div class="spec">
                            <span>STOCK</span>
                            <p>${book.stock}</p>
                        </div>
                        <div class="spec">
                            <span>PRICE</span>
                            <p>$${book.price.toFixed(2)}</p>
                        </div>
                        <div class="spec">
                            <span>ORIGINAL PRICE</span>
                            <p>$${book.originalPrice.toFixed(2)}</p>
                        </div>
                        <div class="spec">
                            <span>ID</span>
                            <p>#${book.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        await renderBooks({
            containerId: "relativeGrid",
            filterFn: item =>
                item.category === book.category &&
                item.id !== book.id,
            limit: 4
        });

        const breadcrumbTitle = document.querySelector(".breadcrumb p");

        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = book.title;
        }

        document.title = `${book.title} | Pages & Co`;
    } catch (error) {
        console.error("Failed to load book detail:", error);
    }
}

function setupDetailActions() {
    const loginModal = document.getElementById("loginModal");
    const loginForm = document.getElementById("loginForm");

    document.addEventListener("click", (event) => {
        if (event.target.closest(".btn-cart-buy")) {
            handleAddToBag(loginModal);
            return;
        }

        if (event.target.closest(".btn-wishlist") && loginModal) {
            loginModal.classList.add("show");
        }
    });

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const password = document.getElementById("password").value.trim();

        if (password !== "1234") {
            alert("Password phải là 1234!");
            return;
        }

        window.PagesCoCart.saveLogin();
        loginModal.classList.remove("show");

        if (pendingBook) {
            addBookToBag(pendingBook);
            pendingBook = null;
        }

        loginForm.reset();
    });
}

function handleAddToBag(loginModal) {
    if (!currentBook) {
        return;
    }

    if (!window.PagesCoCart.isLoggedIn()) {
        pendingBook = currentBook;

        if (loginModal) {
            loginModal.classList.add("show");
        }

        return;
    }

    addBookToBag(currentBook);
}

function addBookToBag(book) {
    window.PagesCoCart.addToBag(book);
    alert(`Đã thêm "${book.title}" vào bag!`);
}
