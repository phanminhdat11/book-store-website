const header = document.querySelector(".header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const loginModal = document.getElementById("loginModal");

document.addEventListener("click", (e) => {
    const btnSignin = e.target.closest(".btn-signin");

    if (btnSignin && loginModal) {
        loginModal.classList.add("show");
    }
});

if (header && navToggle && nav) {
    const icon = navToggle.querySelector("i");

    const setMenuOpen = (isOpen) => {
        header.classList.toggle("header--nav-open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }
    };

    navToggle.addEventListener("click", () => {
        setMenuOpen(!header.classList.contains("header--nav-open"));
    });

    nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            setMenuOpen(false);
        }
    });
}
