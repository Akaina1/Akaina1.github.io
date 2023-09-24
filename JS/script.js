//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load Event Listener
document.addEventListener("DOMContentLoaded", function () {
    // Initial Animation for navButton
    const navButton = document.querySelector('.nav__button');
    navButton.classList.add('nav__button--initial');

    navButton.addEventListener('mouseover', function () {
        if (submenu.style.display === 'none' || submenu.style.display === '') {
            navButton.classList.remove('nav__button--initial');
        }
    });

    navButton.addEventListener('mouseout', function () {
        if (submenu.style.display === 'none' || submenu.style.display === '') {
            navButton.classList.add('nav__button--initial');
        }
    });

    // Submenu Display for mainButton
    const mainButton = document.getElementById('mainButton');
    const submenu = document.querySelector('.nav__submenu');
    const mainButtonText = mainButton.querySelector('.nav__button-text');

    mainButton.addEventListener('click', function () {
        if (submenu.style.display === 'none' || submenu.style.display === '') {
            submenu.style.display = 'block';
            mainButton.classList.remove('nav__button--initial');
            mainButton.classList.add('nav__button--activated');

            // Update text style when activated
            mainButtonText.style.color = 'var(--primary-text-color)';
            mainButtonText.style.fontFamily = "'Nanum Gothic Coding', cursive";
            mainButtonText.style.fontSize = '32px';

            submenu.classList.add('show');
        } else {
            submenu.style.display = 'none';
            mainButton.classList.remove('nav__button--activated');
            mainButton.classList.add('nav__button--initial');

            // Revert text style when deactivated
            mainButtonText.style.color = 'transparent';
            mainButtonText.style.fontFamily = ''; // revert to whatever the default was
            mainButtonText.style.fontSize = '20px'; // revert to original size

            submenu.classList.remove('show');
        }
    });

    // Text Animation for page titles
    const pageTitles = document.querySelectorAll('.page__title');
    pageTitles.forEach(animateTitle); // Assuming you've defined animateTitle elsewhere
});
////////////////////////////////////////////////////////////////////////////////////////
// dropdown menu
document.addEventListener("DOMContentLoaded", function () {
    const dropdownIcon = document.getElementById('dropdown-icon');
    const navbar = document.getElementById('navbar');

    // Timer to re-show dropdown icon
    let timer;

    // Event Listener to show navbar on hover over dropdown icon
    dropdownIcon.addEventListener('mouseover', function () {
        navbar.style.opacity = '1';
    });

    // Event Listener to hide navbar on mouseleave
    navbar.addEventListener('mouseleave', function () {
        navbar.style.opacity = '0';
    });

    // Event Listener to cancel timer if mouse is back in navbar
    navbar.addEventListener('mouseover', function () {
        clearTimeout(timer);
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
function animateTitle(titleElement) {
    const text = titleElement.textContent;
    titleElement.innerHTML = '';

    for (let i = 0; i < text.length; i++) {
        let character = text[i];
        let span = document.createElement('span');
        span.className = 'character';
        span.textContent = character === ' ' ? '\u00A0' : character; // Replace ' ' with a non-breaking space
        titleElement.appendChild(span);
    }

    const characters = titleElement.querySelectorAll('.character');
    characters.forEach((character, index) => {
        setTimeout(() => {
            character.style.opacity = '1';
            character.style.transform = 'translateY(0)';
        }, index * 100); // 100ms delay between each
    });
};
