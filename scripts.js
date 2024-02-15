document.addEventListener('DOMContentLoaded', function() {
    const productBoxes = document.querySelectorAll('.product-box');

    productBoxes.forEach(box => {
        let slideIndex = 0;
        const slides = box.querySelectorAll('.product-box img');

        showSlides();
        function showSlides() {
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            } else if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
        
            slides.forEach((slide, index) => {
                if (index === slideIndex) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });
        }
        
        

        const prevBtn = box.querySelector('.gallery-prev');
        const nextBtn = box.querySelector('.gallery-next');

        prevBtn.addEventListener('click', () => {
            slideIndex--;
            if (slideIndex < 1) {
                slideIndex = slides.length;
            }
            showSlides();
        });

        nextBtn.addEventListener('click', () => {
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            showSlides();
        });
    });

    // Toggle sidebar function
    function toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('open');
    }

    // Event listener for toggle button
    const toggleBtn = document.querySelector('.toggle-btn');
    toggleBtn.addEventListener('click', toggleSidebar);
});

