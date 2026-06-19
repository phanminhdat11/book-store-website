
document.addEventListener("DOMContentLoaded", async () => {

    await renderCategories();
    await renderBooksPage();

    const sortSelect = document.getElementById("sortBooks");

    if (sortSelect) {
        sortSelect.addEventListener(
            "change",
            renderBooksPage
        );
    }

});


async function renderCategories() {
    try {

        const books = await getBooks();

        const params = new URLSearchParams(window.location.search);
        console.log(params)

        const currentGenre = params.get("genre");
        const categories = [...new Set(
                books.map(
                    book => book.category))].sort();

        const container =document.getElementById("categoryFilter");

        let html = `
            <li class="${!currentGenre
                ? "active"
                : ""
            }">
                <a href="/pages/books.html">
                    All
                </a>
            </li>
        `;

        html += categories.map(category => {

                const slug = category
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                return `
                    <li class="${currentGenre === slug
                        ? "active"
                        : ""
                    }">
                        <a href="/pages/books.html?genre=${slug}">
                            ${category}
                        </a>
                    </li>
                `;
            }).join("");

        container.innerHTML = html;

    } catch (error) {
        console.error("loi:",error);
    }
}

async function renderBooksPage() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const genre =
        params.get("genre");

    const sortValue =
        document.getElementById(
            "sortBooks"
        )?.value || "featured";

    await renderBooks({
        containerId: "booksGrid",

        filterFn: book => {

            if (!genre) {
                return true;
            }

            const slug =
                book.category
                    .toLowerCase()
                    .replace(/\s+/g, "-");

            return slug === genre;
        }
    });

    sortBooks(sortValue);
}

//render so luong sach theo chu de haoc tat ca
async function renderBooksPage() {

    const books = await getBooks();

    const params = new URLSearchParams(window.location.search);

    const genre = params.get("genre");

    let filteredBooks = books;

    if (genre) {
        filteredBooks = books.filter(book =>
            book.category
                .toLowerCase()
                .replace(/\s+/g, "-") === genre
        );
    }

    document.getElementById("collectionCount").textContent = `${filteredBooks.length} titles in the collection`;

    renderBooks({
        containerId: "booksGrid",
        filterFn: genre
            ? book =>
                book.category
                    .toLowerCase()
                    .replace(/\s+/g, "-") === genre
            : null
    });
}