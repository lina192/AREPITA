// FUNCIONES DEL MODAL DE ENTREGA

function openDeliveryModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verifica si el carrito está vacío
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

    const deliveryModal = document.getElementById('delivery-modal');
    deliveryModal.style.display = 'flex'; // Mostrar modal
    deliveryModal.classList.add('modal--visible');
    deliveryModal.classList.remove('modal--hidden'); // Asegúrate de que el modal no tenga la clase hidden
}

function closeDeliveryModal() {
    const deliveryModal = document.getElementById('delivery-modal');
    deliveryModal.classList.add('modal--hidden');
    setTimeout(() => {
        deliveryModal.style.display = 'none';
        deliveryModal.classList.remove('modal--hidden', 'modal--visible');
    }, 600); // Duración de la transición
}

// Event listeners para abrir/cerrar modal
document.getElementById('open-modal').addEventListener('click', openDeliveryModal);
document.getElementById('close-btn').addEventListener('click', closeDeliveryModal); // Modificado para usar el id "close-btn"

// Cerrar el modal al hacer clic fuera de él, sin afectar el contenido
window.addEventListener('click', function(event) {
    const deliveryModal = document.getElementById('delivery-modal');
    const modalContent = document.querySelector('.modal__container');

    // Si se hace clic fuera del modal (en el fondo), cierra el modal
    if (event.target === deliveryModal) {
        closeDeliveryModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const homeDeliveryBtn = document.getElementById('home-delivery-btn');
    const pickUpBtn = document.getElementById('pick-up-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const addressSection = document.getElementById('address-section');
    const phoneSection = document.getElementById('phone-section');
    const commentsSection = document.getElementById('comments-section');
    const addressInput = document.getElementById('address');
    const addressError = document.getElementById('address-error');
    const backupPhoneInput = document.getElementById('backup-phone');
    const pickUpSection = document.getElementById('pick-up-section');
    const pickUpOptions = document.querySelectorAll('input[name="location"]');

    // Función para manejar selección entre "Domicilio" y "Recoger"
    function handleSelection(selectedButton) {
        homeDeliveryBtn.classList.remove('selected');
        pickUpBtn.classList.remove('selected');
        selectedButton.classList.add('selected');

        if (selectedButton === homeDeliveryBtn) {
            addressSection.classList.remove('hidden');
            phoneSection.classList.remove('hidden');
            commentsSection.classList.remove('hidden');
            pickUpSection.classList.add('hidden');
            validateFields();
        } else {
            addressSection.classList.add('hidden');
            phoneSection.classList.add('hidden');
            commentsSection.classList.remove('hidden');
            pickUpSection.classList.remove('hidden');
            confirmBtn.disabled = true;
        }
    }

    // Validación de la dirección (Bogotá)
    function validateAddress() {
        const address = addressInput.value.trim();
        const bogotaAddressPattern = /(calle|carrera|transversal|diagonal|av|avenida|cll|cra|cr|#)\s*\d{1,4}(-\d{1,4})?/i;
        return bogotaAddressPattern.test(address);
    }

    // Validación del número de respaldo (no debe ser 1234567, 1234567890, 0987654 o 0987654321)
    function validateBackupPhone() {
        const backupPhone = backupPhoneInput.value.trim();
        // Acepta 7 o 10 dígitos, y no permite 1234567, 1234567890, 0987654 ni 0987654321
        return (/^\d{7}$|^\d{10}$/.test(backupPhone)) &&
               backupPhone !== "1234567" &&
               backupPhone !== "1234567890" &&
               backupPhone !== "0987654" &&
               backupPhone !== "0987654321";
    }

    // Validación del número principal (no debe ser 1234567890 ni 0987654321)
    function validatePrimaryPhone() {
        const phoneInput = document.getElementById('phone');
        const phoneValue = phoneInput.value.trim();
        // Acepta solo 10 dígitos, y no permite 1234567890 ni 0987654321
        return /^\d{10}$/.test(phoneValue) &&
               phoneValue !== "1234567890" &&
               phoneValue !== "0987654321";
    }

    // Validación general de los campos
    function validateFields() {
        const isAddressValid = validateAddress();
        const isBackupPhoneValid = validateBackupPhone();
        const isPrimaryPhoneValid = validatePrimaryPhone();
        confirmBtn.disabled = !(isAddressValid && isPrimaryPhoneValid && isBackupPhoneValid);
    }

    // Event listeners para seleccionar opciones
    homeDeliveryBtn.addEventListener('click', () => handleSelection(homeDeliveryBtn));
    pickUpBtn.addEventListener('click', () => handleSelection(pickUpBtn));

    // Validar y habilitar/deshabilitar el botón de confirmar según selección de "Recoger"
    pickUpOptions.forEach(option => {
        option.addEventListener('change', () => {
            confirmBtn.disabled = ![...pickUpOptions].some(opt => opt.checked);
        });
    });

    // Validar y habilitar botón de confirmar al hacer clic
    confirmBtn.addEventListener('click', () => {
        if (homeDeliveryBtn.classList.contains('selected')) {
            if (validateAddress() && validateBackupPhone() && validatePrimaryPhone()) {
                window.location.href = 'carrito.html';  // Redirigir al carrito si es válido
            } else {
                addressError.classList.toggle('hidden', validateAddress());
            }
        } else if (pickUpBtn.classList.contains('selected')) {
            window.location.href = 'carrito.html';
        }
    });

    // Validación de teléfonos al ingresar
    const phoneInput = document.getElementById('phone');
    const errorMessagePhone = phoneInput.nextElementSibling;
    const errorMessageBackupPhone = backupPhoneInput.nextElementSibling;

    function validatePhone(input, errorMessage) {
        const value = input.value;
        const isValid = /^\d{10}$/.test(value) && value !== "1234567890" && value !== "0987654321"; // No permite 1234567890 ni 0987654321
        errorMessage.classList.toggle('hidden', isValid);
        return isValid;
    }

    function checkAllInputs() {
        const isPhoneValid = validatePhone(phoneInput, errorMessagePhone);
        const isBackupPhoneValid = validateBackupPhone();
        confirmBtn.disabled = !(isPhoneValid && isBackupPhoneValid);
    }

    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
        checkAllInputs();
    });

    backupPhoneInput.addEventListener('input', () => {
        backupPhoneInput.value = backupPhoneInput.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
        checkAllInputs();
    });
});


// ANIMACIÓN DE LOS TEXTOS DE EJ

// Función para mostrar el texto de ejemplo al enfocar el campo
function showExample(inputId, exampleId) {
    const input = document.getElementById(inputId);
    const example = document.getElementById(exampleId);

    input.addEventListener('focus', function() {
        if (input.value === '') {
            example.classList.remove('hidden');
        }
    });

    input.addEventListener('input', function() {
        if (input.value !== '') {
            example.classList.add('hidden');
        } else {
            example.classList.remove('hidden');
        }
    });

    input.addEventListener('blur', function() {
        if (input.value !== '') {
            example.classList.add('hidden');
        }
    });
}

// Aplicar a los diferentes campos
showExample('address', 'address-example');
showExample('phone', 'phone-example');
showExample('backup-phone', 'backup-phone-example');




















// INTENTO DE AÑADIR PRODUCTO DESDE FAVS


const cartContainer = document.getElementById('cart-container');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    cartContainer.innerHTML = '';
    cart.forEach(productId => {
        const product = productInfo[productId];
        if (product) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="content">
                    <h4>${product.name}</h4>
                    <span class="price">${product.price}</span>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        }
    });
}

// Renderiza el carrito
renderCart();

