document.addEventListener('DOMContentLoaded', () => {
    const carouselContent = document.getElementById('carouselContent');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    scrollLeftBtn.addEventListener('click', () => {
        carouselContent.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        carouselContent.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
});