document.addEventListener("DOMContentLoaded", function () {
    const navButton = document.querySelector('.nav__button');
    navButton.classList.add('nav__button--initial');

    // Remove the initial class on hover to trigger hover effect
    navButton.addEventListener('mouseover', function () {
        navButton.classList.remove('nav__button--initial');
    });

    // Re-add the initial class when the mouse moves out to restart the animation
    navButton.addEventListener('mouseout', function () {
        navButton.classList.add('nav__button--initial');
    });
});

