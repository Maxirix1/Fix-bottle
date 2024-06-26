document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const navCheck = document.getElementById('nav_check');
    const header = document.querySelector('header');
    const isClickInsideNav = nav.contains(event.target);
    const isClickInsideHeader = header.contains(event.target);
    const isHamburger = event.target.matches('.hamburger, .hamburger *');
    
    if (!isClickInsideNav && !isClickInsideHeader && !isHamburger) {
        navCheck.checked = false;
        nav.style.left = '-300px';
    }
});

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('nav').style.left = '-300px';
        document.getElementById('nav_check').checked = false;
    });
});
