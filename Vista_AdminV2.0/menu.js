document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.querySelector('.side-menu');
    const container = document.querySelector('.container');

    menuToggle.addEventListener('click', function () {
        sideMenu.classList.toggle('active');
        container.classList.toggle('menu-visible');
    });
});
