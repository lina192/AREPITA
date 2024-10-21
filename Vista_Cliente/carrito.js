// Funciones del Modal
function openModal() {

    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtener el carrito

    // Verificar si el carrito está vacío
    if (cart.length === 0) {
        // Mostrar alerta de carrito vacío
        Swal.fire({
            icon: 'warning',
            title: '¡Carrito vacío!',
            text: 'Añade productos al carrito.',
            customClass: {
                confirmButton: 'custom-btn' 
            },
            confirmButtonText: 'Añadir' 
        }).then(() => {
            // Redirigir a index.html después de que el usuario cierre la alerta
            window.location.href = 'index.html';
        });
        return; // No abrir el modal si el carrito está vacío
    }



    const modal = document.getElementById('modal');
    modal.style.display = 'flex'; // Asegura que el modal sea visible antes de aplicar la animación
    modal.classList.add('modal--visible');
    modal.classList.remove('modal--hidden'); // Asegura que el modal no tenga la clase oculta

    // Ocultar el checkbox y el texto al abrir el modal
    document.getElementById('payment-confirmation-container').style.display = 'none';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('modal--hidden');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('modal--hidden', 'modal--visible');
    }, 600); // Coincide con la duración de la transición
}

document.getElementById('open-modal').addEventListener('click', openModal);
document.getElementById('close-modal').addEventListener('click', closeModal);
document.getElementById('modal-close-btn').addEventListener('click', closeModal);

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal')) {
        closeModal();
    }
});

// Mostrar u ocultar el checkbox y su texto según el método de pago seleccionado
document.getElementById('payment-method').addEventListener('change', function() {
    const paymentMethod = this.value;
    const depositInfo = document.getElementById('deposit-info');
    const confirmationContainer = document.getElementById('payment-confirmation-container');

    if (paymentMethod === 'tarjeta' || paymentMethod === 'paypal') {
        depositInfo.classList.remove('hidden'); // Muestra el mensaje de depósito
        confirmationContainer.style.display = 'flex'; // Muestra el checkbox y el texto
    } else {
        depositInfo.classList.add('hidden'); // Oculta el mensaje de depósito
        confirmationContainer.style.display = 'none'; // Oculta el checkbox y el texto
    }

    validateForm(); // Verifica el estado del botón después de cambiar el método de pago
});

// Función para validar los campos requeridos
function validateForm() {
    const paymentMethod = document.getElementById('payment-method').value;
    const confirmationCheckbox = document.getElementById('payment-confirmation').checked;
    const modalPaymentBtn = document.getElementById('modal-payment-btn');

    // Verificar si se ha seleccionado un método de pago y si el checkbox está marcado, o si se selecciona efectivo
    if ((paymentMethod === 'tarjeta' || paymentMethod === 'paypal') && confirmationCheckbox) {
        modalPaymentBtn.disabled = false; // Habilitar el botón si ambas condiciones se cumplen
        modalPaymentBtn.style.backgroundColor = ''; // Restablecer el color del botón
        modalPaymentBtn.style.cursor = 'pointer'; // Cambiar el cursor a pointer cuando esté habilitado
    } else if (paymentMethod === 'efectivo') {
        // Si se selecciona efectivo, habilitar el botón sin necesidad del checkbox
        modalPaymentBtn.disabled = false; 
        modalPaymentBtn.style.backgroundColor = ''; 
        modalPaymentBtn.style.cursor = 'pointer'; 
    } else {
        modalPaymentBtn.disabled = true; // Deshabilitar el botón si no se cumplen las condiciones
        modalPaymentBtn.style.backgroundColor = '#ccc'; // Cambiar a gris
        modalPaymentBtn.style.cursor = 'not-allowed'; // Cambiar el cursor a "prohibido" cuando está deshabilitado
    }
}


// Inicializar el hover effect solo cuando el botón está deshabilitado
document.getElementById('modal-payment-btn').addEventListener('mouseover', function() {
    const modalPaymentBtn = document.getElementById('modal-payment-btn');
    if (modalPaymentBtn.disabled) {
        modalPaymentBtn.style.backgroundColor = '#f0d5ba'; // Usar el color específico en hover
    }
});

document.getElementById('modal-payment-btn').addEventListener('mouseout', function() {
    const modalPaymentBtn = document.getElementById('modal-payment-btn');
    if (modalPaymentBtn.disabled) {
        modalPaymentBtn.style.backgroundColor = '#ccc'; // Volver al color gris original cuando salga el hover
    }
});

// Evento de cambio para el checkbox de confirmación
document.getElementById('payment-confirmation').addEventListener('change', function() {
    validateForm(); // Verificar el estado del botón cuando se marque o desmarque el checkbox
});

// Función para añadir un producto al carrito
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));

    Swal.fire({
        title: '¡Producto Añadido!',
        text: 'El producto ha sido añadido a tu carrito.',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'custom-btn'
        }
    }).then(() => {
        window.location.href = '../Vista_Cliente/historial.html';
    });
}

// Función para finalizar la compra y mostrar la alerta de éxito
function completePurchase() {
    Swal.fire({ 
        title: '¡Venta Exitosa!',
        text: 'Código: 3761',
        icon: 'success',
        timerProgressBar: true,
        toast: true,
        position: 'top',
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: 'custom-btn'
        }
    }).then(() => {
        window.location.href = '../vista_cliente/historial.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('payment-form');
    const modalPaymentBtn = document.getElementById('modal-payment-btn');

    modalPaymentBtn.disabled = true; // Asegurarse de que el botón esté deshabilitado inicialmente
    modalPaymentBtn.style.backgroundColor = '#ccc'; // Cambiar a gris al cargar la página
    modalPaymentBtn.style.cursor = 'not-allowed'; // Cambiar a "prohibido" cuando está deshabilitado

    if (paymentForm) {
        paymentForm.addEventListener('submit', function (event) {
            event.preventDefault();
            completePurchase();
        });
    }
});

