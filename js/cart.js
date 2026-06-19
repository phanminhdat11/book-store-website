const AUTH_STORAGE_KEY = "pagesCoIsLoggedIn";
const BAG_STORAGE_KEY = "pagesCoBag";

function isLoggedIn() {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

function saveLogin() {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
}

function getBag() {
    const savedBag = sessionStorage.getItem(BAG_STORAGE_KEY);

    if (!savedBag) {
        return [];
    }

    try {
        return JSON.parse(savedBag);
    } catch (error) {
        console.error("Failed to read bag:", error);
        return [];
    }
}

function saveBag(bag) {
    sessionStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(bag));
    updateBagCount();
}

function addToBag(book) {
    const bag = getBag();
    const existingItem = bag.find(item => item.id === book.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        bag.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            cover: book.cover,
            quantity: 1
        });
    }

    saveBag(bag);
}

function updateBagItemQuantity(bookId, quantity) {
    const nextBag = getBag()
        .map(item => item.id === bookId ? { ...item, quantity } : item)
        .filter(item => item.quantity > 0);

    saveBag(nextBag);
}

function removeFromBag(bookId) {
    const nextBag = getBag().filter(item => item.id !== bookId);
    saveBag(nextBag);
}

function getBagCount() {
    return getBag().reduce((total, item) => total + item.quantity, 0);
}

function updateBagCount() {
    document.querySelectorAll(".cart-count").forEach(countElement => {
        countElement.textContent = getBagCount();
    });
}

document.addEventListener("DOMContentLoaded", updateBagCount);

window.PagesCoCart = {
    addToBag,
    getBag,
    getBagCount,
    isLoggedIn,
    removeFromBag,
    saveLogin,
    updateBagCount,
    updateBagItemQuantity
};
