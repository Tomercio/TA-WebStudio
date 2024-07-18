document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const popup = document.getElementById('popup');
    const closePopup = document.querySelector('.popup-content .close');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Create a FormData object from the form
        const formData = new FormData(form);
        
        // Send the form data using Fetch API
        fetch('https://formspree.io/f/xgvwvnpo', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Show the popup
                popup.style.display = 'flex';

                // Hide the popup after 3 seconds
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 3000);

                // Reset the form
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                });
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form");
        });
    });

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Existing menu code
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });
    };

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    // Hide menu when clicking on a menu item
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    const words = ["Web Developer", "Fullstack Developer", "People Person", "Sales Master", "Business Developer"];
    const textAnimations = document.querySelectorAll('.text-animation span');

    textAnimations.forEach((span, index) => {
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const currentText = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
            span.textContent = currentText;

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 100); // Typing speed
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50); // Deleting speed
            } else if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 1500); // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 100); // Pause before typing next word
            }
        }

        type();
    });
});
