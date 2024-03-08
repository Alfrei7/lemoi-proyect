// carrusel

document.addEventListener("DOMContentLoaded", function() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelector('.slides');
        const slideCount = slides.querySelectorAll('.slide').length;
        let currentIndex = 0;

        const showSlide = (index) => {
            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }
            const slideWidth = slides.querySelector('.slide').clientWidth;
            slides.style.transform = `translateX(-${index * slideWidth}px)`;
            currentIndex = index;
        };

        const prevSlide = () => {
            showSlide(currentIndex - 1);
        };

        const nextSlide = () => {
            showSlide(currentIndex + 1);
        };

        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Mostrar la primera imagen al cargar la página
        showSlide(currentIndex);
    });
});