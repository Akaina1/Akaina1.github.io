//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load Event Listener

if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
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
                mainButtonText.style.fontFamily = '';
                mainButtonText.style.fontSize = '20px';

                submenu.classList.remove('show');
            }
        });
    });
};
////////////////////////////////////////////////////////////////////////////////////////
// dropdown menu & title animation
document.addEventListener("DOMContentLoaded", function () {
    const dropdownIcon = document.getElementById('dropdown-icon');
    const navbar = document.getElementById('navbar');

    // Timer to re-show dropdown icon
    let timer;

    // Event Listener to show navbar on hover over dropdown icon
    dropdownIcon.addEventListener('mouseover', function () {
        navbar.style.opacity = '1';
        navbar.classList.add('active');
    });

    // Event Listener to hide navbar on mouseleave
    navbar.addEventListener('mouseleave', function () {
        navbar.style.opacity = '0';
        navbar.classList.remove('active');
    });

    // Event Listener to cancel timer if mouse is back in navbar
    navbar.addEventListener('mouseover', function () {
        clearTimeout(timer);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    animateTitlesAndSubtitles();
});
////////////////////////////////////////////////////////////////////////////////////////
// sidebar
if (window.location.pathname !== '/index.html') {
    document.addEventListener("DOMContentLoaded", function () {
        // Wait for a set time after page load to start the animation (e.g., 2 seconds)
        setTimeout(function () {
            const sidebar = document.getElementById('sidebar-nav');
            const listItems = sidebar.querySelectorAll('ul li');

            // Slide in the sidebar container from the left
            sidebar.classList.add('show');

            // Fade in list items one after the other
            setTimeout(function () {
                listItems.forEach(function (item) {
                    item.classList.add('show');
                });
            }, 100);  // Starts fading in list items 1 second after the sidebar starts sliding in
        }, 100);
    });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
function prepareForAnimation(titleElement) {
    const text = titleElement.textContent;
    titleElement.innerHTML = '';
    titleElement.style.opacity = '0'; // Hide it

    for (let i = 0; i < text.length; i++) {
        let character = text[i];
        let span = document.createElement('span');
        span.className = 'character';
        span.style.opacity = '0';  // Keep it hidden
        span.textContent = character === ' ' ? '\u00A0' : character;
        titleElement.appendChild(span);
    }
}

function startAnimation(titleElement, delay = 0) {
    titleElement.style.opacity = '1'; // Show it

    const characters = titleElement.querySelectorAll('.character');
    characters.forEach((character, index) => {
        setTimeout(() => {
            character.style.opacity = '1';
            character.style.transform = 'translateY(0)';
        }, delay + index * 100);
    });

    return titleElement.textContent.length * 100;
}

async function animateTitlesAndSubtitles() {
    const pageTitle = document.querySelector('.page__title');
    const pageSubtitle = document.querySelector('.page__subtitle');

    prepareForAnimation(pageTitle);
    prepareForAnimation(pageSubtitle);

    const titleDuration = startAnimation(pageTitle);
    setTimeout(() => {
        startAnimation(pageSubtitle);
    }, titleDuration);
}



