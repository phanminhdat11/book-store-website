const closeBtn = document.querySelector(".close-btn");

if (closeBtn && loginModal) {
    closeBtn.addEventListener("click", () => {
        loginModal.classList.remove("show");
    });
}

// close mdoal khi click vao overlay
loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove("show");
    }
});



