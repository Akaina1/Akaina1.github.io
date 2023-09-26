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
                mainButtonText.classList.add('activated-text');
                submenu.classList.add('show');
            } else {
                submenu.style.display = 'none';
                mainButton.classList.remove('nav__button--activated');
                mainButton.classList.add('nav__button--initial');
                mainButtonText.classList.remove('activated-text');
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

    let titleDuration = 0;

    // Check if the pageTitle element actually exists on this page
    if (pageTitle) {
        prepareForAnimation(pageTitle);
        titleDuration = startAnimation(pageTitle);
    }

    // Check if the pageSubtitle element actually exists on this page
    if (pageSubtitle) {
        prepareForAnimation(pageSubtitle);

        if (pageTitle) {
            // Wait for the pageTitle animation to finish
            setTimeout(() => {
                startAnimation(pageSubtitle);
            }, titleDuration);
        } else {
            // No pageTitle to wait for, start immediately
            startAnimation(pageSubtitle);
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Modal functions
document.addEventListener("DOMContentLoaded", function () {

    // 1. Open Main Modal Logic
    document.querySelectorAll('.category__container').forEach(container => {
        container.addEventListener('click', function (e) {
            const modalID = e.currentTarget.getAttribute('data-modal');
            const modal = document.querySelector(`[data-modal="${modalID}"]`); // targeting the .modal__container
            if (modal) {
                modal.classList.add('modal-visible');
            }
        });
    });

    // 2. Open Detail Modal Logic
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation();

            //// Close any currently open modals
            //document.querySelectorAll('.modal__container.modal-visible').forEach(openModal => {
            //    openModal.classList.remove('modal-visible');
            //});

            // Now open the targeted detail modal
            const targetModalId = this.getAttribute('data-detail-modal');
            const targetModal = document.getElementById(targetModalId);
            if (targetModal) {
                targetModal.classList.add('modal-visible');
            }
        });
    });

    // 3. Close Modal Button Logic
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const modal = this.closest('.modal__container');
            if (modal) {
                modal.classList.remove('modal-visible');
            }
        });
    });

    // Escape key functionality:
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === "Escape") {
            document.querySelectorAll('.modal__container.modal-visible').forEach(modal => {
                modal.classList.remove('modal-visible');
            });
        }
    });

    // Close Modal when clicking outside
    document.querySelectorAll('.modal__container').forEach(modalContainer => {
        modalContainer.addEventListener('click', function (e) {

            // Try to find the modal content within the modal container
            const modalContent = modalContainer.querySelector('.modal-content');

            // Check if the modal content exists and if the click was outside of it
            if (!modalContent || !modalContent.contains(e.target)) {

                // Try removing from the modal (main modal scenario)
                const innerModal = modalContent ? modalContent.querySelector('.modal') : null;
                if (innerModal && innerModal.classList.contains('modal-visible')) {
                    innerModal.classList.remove('modal-visible');
                    return;
                }

                // Try removing from the modal__container (detail modal scenario)
                if (modalContainer.classList.contains('modal-visible')) {
                    modalContainer.classList.remove('modal-visible');
                }
            }
        });
    });
});