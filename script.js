var swiper1 = new Swiper(".mySwiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: { 
        delay: 3000, 
        disableOnInteraction: false, 
    },
});





function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex'; // Make sure the modal is visible before applying animation
    modal.classList.add('modal--visible');
    modal.classList.remove('modal--hidden'); // Ensure the modal does not have the hidden class
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('modal--hidden');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('modal--hidden', 'modal--visible');
    }, 600); // Match the transition duration
}

document.getElementById('open-modal').addEventListener('click', openModal);
document.getElementById('miLogin').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from being submitted normally

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mensaje = document.getElementById('mensaje'); // Get the message container

    fetch('/autenticar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.redirectUrl; // Redirect based on the server response

        } else {
            mensaje.innerHTML = '<p style="color:#edb97f;">Usuario no encontrado o credenciales incorrectas</p>'; // Show error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mensaje.innerHTML = '<p style="color:#edb97f;;">Error al autenticar</p>'; // Show general error message
    });
});


document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('modal-close-btn').addEventListener('click', closeModal);

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal')) {
        closeModal();
    }
});





/* Favoritos */ 

    function addToFavorites(productId) {
        // Obtener los favoritos actuales del almacenamiento local
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Agregar el producto al array de favoritos si no está ya en él
        if (!favorites.includes(productId)) {
            favorites.push(productId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }

        // Mostrar un mensaje de éxito o hacer alguna otra acción
        Swal.fire({
            title: '¡Ya en Tus Favoritos!',
            text: 'Este producto ya está en tus favoritos.',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: 'Aceptar',
            customClass: {
                confirmButton: 'custom-btn' // Aplica la clase personalizada
            }
        });
    }












    

/* Función Boton Comprar */ 

function addToCart(productId) {
    // Obtener el carrito del localStorage o inicializarlo como un array vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Añadir el producto al carrito
    cart.push(productId);

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

      // Mostrar una alerta que indique que el producto ha sido añadido al carrito usando SweetAlert
      Swal.fire({
        title: '¡Producto Añadido!',
        text: 'El producto ha sido añadido a tu carrito.',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false, // No mostrar el botón de confirmación por defecto
        footer: `
            <div style="display: flex; justify-content: center; gap: 40px; margin-top: 10px;">
                <button id="moreButton" class="btn-custom" style="margin: 0;">Más</button>
                <button id="payButton" class="btn-custom" style="margin: 0;">Pagar</button>
            </div>
        `
    });

    // Agregar listener al botón "Más"
    document.getElementById('moreButton')?.addEventListener('click', () => {
        Swal.close(); // Cierra la alerta
    });

    // Agregar listener al botón "Pagar"
    document.getElementById('payButton')?.addEventListener('click', () => {
        window.location.href = '../vista_cliente/carrito3.html';
    });
}



