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

document.addEventListener('DOMContentLoaded', function () {
    const title = document.getElementById('homeTitle');
    const text = title.textContent;
    title.innerHTML = '';

    for (let i = 0; i < text.length; i++) {
        let character = text[i];
        let span = document.createElement('span');
        span.className = 'character';
        span.textContent = character === ' ' ? '\u00A0' : character;  // Replace ' ' with a non-breaking space
        title.appendChild(span);
    }

    const characters = document.querySelectorAll('.character');
    characters.forEach((character, index) => {
        setTimeout(() => {
            character.style.opacity = '1';
            character.style.transform = 'translateY(0)';
        }, index * 150);  // 100ms delay between each
    });
});