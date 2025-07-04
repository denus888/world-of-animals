document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Функція для підсвічування активного пункту меню при прокрутці
    function highlightNavOnScroll() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 20; // Віднімаємо висоту шапки
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Додаємо клас active до посилання меню при завантаженні сторінки, якщо воно відповідає секції
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Оновлюємо активний клас після кліку
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const header = document.querySelector('header');
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Викликаємо при завантаженні, щоб встановити активну секцію
});
