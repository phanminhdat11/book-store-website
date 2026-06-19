const heroSlides = [
    {
        subtitle: "STAFF FAVOURITES",
        title: "The shelves we keep coming back to",
        description:
            "Our booksellers pick the titles they can't stop pressing into customers' hands.",
        buttonText: "Browse bestsellers",
        buttonLink: "#bestsellers"
    },
    {
        subtitle: "NEW ARRIVALS",
        title: "Fresh stories just landed",
        description:
            "Discover the latest books selected by our team.",
        buttonText: "Shop new arrivals",
        buttonLink: "#new-arrivals"
    },
    {
        subtitle: "AWARD WINNERS",
        title: "Books everyone is talking about",
        description:
            "Explore critically acclaimed titles and reader favourites.",
        buttonText: "Explore collection",
        buttonLink: "#awards"
    }
];
const heroContent = document.getElementById("heroContent");
const nextBtn = document.querySelector(".hero-slider__next");
const prevBtn = document.querySelector(".hero-slider__prev");
const pagination = document.getElementById("heroPagination");
function renderHero(index) {

    const slide = heroSlides[index];

    heroContent.innerHTML = `
        <div class="hero-content">

            <span class="hero-subtitle">
                ${slide.subtitle}
            </span>

            <h1 class="hero-title">
                ${slide.title}
            </h1>

            <p class="hero-description">
                ${slide.description}
            </p>

            <a href="${slide.buttonLink}"
               class="hero-btn">
                ${slide.buttonText}
            </a>

        </div>
    `;
}

function renderDots(activeIndex) {

    pagination.innerHTML = heroSlides
        .map((_, index) => `
            <span
                class="hero-dot ${index === activeIndex
                ? "hero-dot--active"
                : ""
            }"
                data-index="${index}"
            ></span>
        `)
        .join("");

}

let currentSlide = 0;
let autoSlide;
function goToSlide(index) {
    currentSlide = index;
    renderHero(currentSlide);
    renderDots(currentSlide);
}

function nextSlide() {
    const nextIndex =(currentSlide + 1) % heroSlides.length;
    goToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    goToSlide(prevIndex);
}

// tu chuyen slide sau 5s deplay
function startAutoSlide() {
    autoSlide = setInterval(() => {
        nextSlide();
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});


goToSlide(0);
startAutoSlide();