document.addEventListener("DOMContentLoaded", function () {
    const navButton = document.querySelector('.nav__button');
    navButton.classList.add('nav__button--initial');

    // Trigger reflow to restart the animation
    void navButton.offsetWidth;

    navButton.classList.remove('nav__button--initial');
});
