


document.addEventListener("DOMContentLoaded", async () => {
    await renderBooks({
        containerId: "featuredGrid",
        filterFn: book => book.isFeatured
    });

    await renderBooks({
        containerId: "bestsellersGrid",
        filterFn: book => book.isBestSeller
    });
    await renderBooks({
        containerId: "arrivalsGrid",
        filterFn: book => book.isNew
    });

});

async function getBooks() {
    const response = await fetch("../data/data.json");
    return await response.json();
}

async function renderBooks({
    containerId,
    filterFn,
    limit = null
}) {
    try {
        const books = await getBooks();

        let filteredBooks = filterFn
            ? books.filter(filterFn)
            : books;

        if (limit) {
            filteredBooks = filteredBooks.slice(0, limit);
        }

        const container =
            document.getElementById(containerId);

        if (!container) {
            return;
        }

        container.innerHTML = filteredBooks
            .map(book => createBookCard(book))
            .join("");

    } catch (error) {
        console.error(error);
    }
}
window.renderBooks = renderBooks;

function createBookCard(book) {

    const badges = `
    ${book.isBestSeller ? `
        <span class="book-badge bestseller">
            BESTSELLER
        </span>
    ` : ''}

    ${book.isNew ? `
        <span class="book-badge new">
            NEW
        </span>
    ` : ''}
`;

    return `
        <a href="/pages/detail.html?id=${book.id}" class="book-card">

            <div
                class="book-cover"
                style="background-image: url('${book.cover}')"
            >

                <div class="book-badges">
                    ${badges}
                </div>

                <div class="book-cover-content">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </div>

            </div>

            <div class="book-info">

                <h4>${book.title}</h4>

                <p class="author">
                    ${book.author}
                </p>

                <div class="book-meta">

                    <div class="price">
                        <span class="current-price">
                            $${book.price.toFixed(2)}
                        </span>

                        <span class="old-price">
                            $${book.originalPrice.toFixed(2)}
                        </span>
                    </div>

                    <div class="rating">
                        ★ ${book.rating}
                    </div>

                </div>

            </div>

        </a>
    `;
}


// DOM render cac chu de cua sach
async function renderGenres() {
    try {
        // dung lai fucn getbook
        const books = await getBooks();

        const genreCounts = books.reduce((acc, book) => {
            acc[book.category] = (acc[book.category] || 0) + 1;
            return acc;
        }, {});

        const genresGrid = document.getElementById('genresGrid');

        if (!genresGrid) {
            return;
        }

        genresGrid.innerHTML = Object.entries(genreCounts)
            .map(([genre, count]) => {
                const slug = genre
                    .toLowerCase()
                    .replace(/\s+/g, '-');

                return `
                    <a href="/pages/books.html?genre=${slug}"
                       class="genre-card ${slug}">
                        <h3>${genre}</h3>
                        <span>${count} titles</span>
                    </a>
                `;
            })
            .join('');

    } catch (error) {
        console.error('Loi', error);
    }
}

renderGenres();
