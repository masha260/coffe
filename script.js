/* JavaScript для зміни header при скролі */
window.addEventListener('scroll', function() {
    const header = document.querySelector('.glass-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});