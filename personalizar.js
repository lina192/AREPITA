// Función para abrir un modal específico
function openModal(modalId, imageId, nameId, descriptionId, imageSrc, name, description, price) {
    document.getElementById(imageId).src = imageSrc; // Cambia la imagen
    document.getElementById(nameId).innerText = name; // Cambia el nombre
    document.getElementById(descriptionId).innerText = description; // Cambia la descripción
    document.getElementById(modalId).style.display = 'block'; // Muestra el modal
    currentQuantity = 1; // Restablece la cantidad a 1
    document.getElementById(`quantity${modalId.replace('customizationModal', '')}`).innerText = currentQuantity; // Actualiza la cantidad
    updateTotalPrice(modalId.replace('customizationModal', ''), price); // Actualiza el precio
}

// Función para cerrar un modal específico
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none'; // Oculta el modal
}

// Función para cambiar la cantidad de un producto
function changeQuantity(quantityId, amount, basePrice) {
    let quantityElement = document.getElementById(quantityId);
    let currentQuantity = parseInt(quantityElement.textContent);
    currentQuantity += amount;
    if (currentQuantity < 1) currentQuantity = 1; // Asegura que la cantidad no sea menor que 1
    quantityElement.textContent = currentQuantity;
    updateTotalPrice(quantityId.replace('quantity', ''), basePrice); // Actualiza el precio total basado en la nueva cantidad
}

// Función para actualizar el precio total
function updateTotalPrice(modalNumber, basePrice) {
    let quantity = parseInt(document.getElementById(`quantity${modalNumber}`).textContent);
    let totalPrice = basePrice * quantity;
    document.getElementById(`totalPrice${modalNumber}`).innerText = `$${totalPrice.toLocaleString()}`; // Actualiza el precio total
}

// Función para agregar producto al carrito con SweetAlert y más opciones
function addProductToCartWithAlert(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));

    Swal.fire({
        title: '¡Producto Añadido!',
        text: 'El producto ha sido añadido a tu carrito.',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        footer: `
            <div style="display: flex; justify-content: center; gap: 40px; margin-top: 10px;">
                <button id="moreButton" class="btn-custom" style="margin: 0;">Más</button>
                <button id="payButton" class="btn-custom" style="margin: 0;">Pagar</button>
            </div>
        `
    });

    document.getElementById('moreButton')?.addEventListener('click', () => Swal.close());
    document.getElementById('payButton')?.addEventListener('click', () => {
        window.location.href = '../Vista_Cliente/carrito2.html';
    });
}

// Función simple para agregar un producto al carrito
function addSimpleProductToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cerrar el modal al hacer clic en el icono de cerrar
document.getElementById('closeCustomModal1').addEventListener('click', () => closeModal('customizationModal1'));
document.getElementById('closeCustomModal2').addEventListener('click', () => closeModal('customizationModal2'));
document.getElementById('closeCustomModal3').addEventListener('click', () => closeModal('customizationModal3'));
document.getElementById('closeCustomModal4').addEventListener('click', () => closeModal('customizationModal4'));
document.getElementById('closeCustomModal5').addEventListener('click', () => closeModal('customizationModal5'));
document.getElementById('closeCustomModal6').addEventListener('click', () => closeModal('customizationModal6'));
document.getElementById('closeCustomModal7').addEventListener('click', () => closeModal('customizationModal7'));
document.getElementById('closeCustomModal8').addEventListener('click', () => closeModal('customizationModal8'));
document.getElementById('closeCustomModal9').addEventListener('click', () => closeModal('customizationModal9'));
document.getElementById('closeCustomModal10').addEventListener('click', () => closeModal('customizationModal10'));
document.getElementById('closeCustomModal11').addEventListener('click', () => closeModal('customizationModal11'));
document.getElementById('closeCustomModal12').addEventListener('click', () => closeModal('customizationModal12'));
document.getElementById('closeCustomModal13').addEventListener('click', () => closeModal('customizationModal13'));
document.getElementById('closeCustomModal14').addEventListener('click', () => closeModal('customizationModal14'));
document.getElementById('closeCustomModal15').addEventListener('click', () => closeModal('customizationModal15'));
document.getElementById('closeCustomModal16').addEventListener('click', () => closeModal('customizationModal16'));
document.getElementById('closeCustomModal17').addEventListener('click', () => closeModal('customizationModal17'));
document.getElementById('closeCustomModal18').addEventListener('click', () => closeModal('customizationModal18'));
document.getElementById('closeCustomModal19').addEventListener('click', () => closeModal('customizationModal19'));
document.getElementById('closeCustomModal20').addEventListener('click', () => closeModal('customizationModal20'));
document.getElementById('closeCustomModal21').addEventListener('click', () => closeModal('customizationModal21'));
document.getElementById('closeCustomModal22').addEventListener('click', () => closeModal('customizationModal22'));
document.getElementById('closeCustomModal23').addEventListener('click', () => closeModal('customizationModal23'));
document.getElementById('closeCustomModal24').addEventListener('click', () => closeModal('customizationModal24'));
document.getElementById('closeCustomModal25').addEventListener('click', () => closeModal('customizationModal25'));
document.getElementById('closeCustomModal26').addEventListener('click', () => closeModal('customizationModal26'));
document.getElementById('closeCustomModal27').addEventListener('click', () => closeModal('customizationModal27'));
document.getElementById('closeCustomModal28').addEventListener('click', () => closeModal('customizationModal28'));
document.getElementById('closeCustomModal29').addEventListener('click', () => closeModal('customizationModal29'));
document.getElementById('closeCustomModal30').addEventListener('click', () => closeModal('customizationModal30'));
document.getElementById('closeCustomModal31').addEventListener('click', () => closeModal('customizationModal31'));
document.getElementById('closeCustomModal32').addEventListener('click', () => closeModal('customizationModal32'));
document.getElementById('closeCustomModal33').addEventListener('click', () => closeModal('customizationModal33'));
document.getElementById('closeCustomModal34').addEventListener('click', () => closeModal('customizationModal34'));
document.getElementById('closeCustomModal35').addEventListener('click', () => closeModal('customizationModal35'));
document.getElementById('closeCustomModal36').addEventListener('click', () => closeModal('customizationModal36'));
document.getElementById('closeCustomModal37').addEventListener('click', () => closeModal('customizationModal37'));
document.getElementById('closeCustomModal38').addEventListener('click', () => closeModal('customizationModal38'));
document.getElementById('closeCustomModal39').addEventListener('click', () => closeModal('customizationModal39'));
document.getElementById('closeCustomModal40').addEventListener('click', () => closeModal('customizationModal40'));


// También puedes cerrar el modal al hacer clic fuera de él
document.getElementById('customizationModal1').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal1')) closeModal('customizationModal1');
});
document.getElementById('customizationModal2').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal2')) closeModal('customizationModal2');
});
document.getElementById('customizationModal3').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal3')) closeModal('customizationModal3');
});
document.getElementById('customizationModal4').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal4')) closeModal('customizationModal4');
});
document.getElementById('customizationModal5').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal5')) closeModal('customizationModal5');
});
document.getElementById('customizationModal6').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal6')) closeModal('customizationModal6');
});
document.getElementById('customizationModal7').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal7')) closeModal('customizationModal7');
});
document.getElementById('customizationModal8').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal8')) closeModal('customizationModal8');
});
document.getElementById('customizationModal9').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal9')) closeModal('customizationModal9');
});
document.getElementById('customizationModal10').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal0')) closeModal('customizationModal10');
});
document.getElementById('customizationModal11').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal11')) closeModal('customizationModal11');
});
document.getElementById('customizationModal12').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal12')) closeModal('customizationModal12');
});
document.getElementById('customizationModal13').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal13')) closeModal('customizationModal13');
});
document.getElementById('customizationModal14').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal14')) closeModal('customizationModal14');
});
document.getElementById('customizationModal15').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal15')) closeModal('customizationModal15');
});
document.getElementById('customizationModal16').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal16')) closeModal('customizationModal16');
});
document.getElementById('customizationModal17').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal17')) closeModal('customizationModal17');
});
document.getElementById('customizationModal18').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal18')) closeModal('customizationModal18');
});
document.getElementById('customizationModal19').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal19')) closeModal('customizationModal19');
});
document.getElementById('customizationModal20').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal20')) closeModal('customizationModal20');
});
document.getElementById('customizationModal21').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal21')) closeModal('customizationModal21');
});
document.getElementById('customizationModal22').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal22')) closeModal('customizationModal22');
});
document.getElementById('customizationModal23').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal23')) closeModal('customizationModal23');
});
document.getElementById('customizationModal24').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal24')) closeModal('customizationModal24');
});
document.getElementById('customizationModal25').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal25')) closeModal('customizationModal25');
});
document.getElementById('customizationModal26').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal26')) closeModal('customizationModal26');
});
document.getElementById('customizationModal27').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal27')) closeModal('customizationModal27');
});
document.getElementById('customizationModal28').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal28')) closeModal('customizationModal28');
});
document.getElementById('customizationModal29').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal29')) closeModal('customizationModal29');
});
document.getElementById('customizationModal30').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal30')) closeModal('customizationModal30');
});
document.getElementById('customizationModal31').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal31')) closeModal('customizationModal31');
});
document.getElementById('customizationModal32').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal32')) closeModal('customizationModal32');
});
document.getElementById('customizationModal33').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal33')) closeModal('customizationModal33');
});
document.getElementById('customizationModal34').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal34')) closeModal('customizationModal34');
});
document.getElementById('customizationModal35').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal35')) closeModal('customizationModal35');
});
document.getElementById('customizationModal36').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal36')) closeModal('customizationModal36');
});
document.getElementById('customizationModal37').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal37')) closeModal('customizationModal37');
});
document.getElementById('customizationModal38').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal38')) closeModal('customizationModal38');
});
document.getElementById('customizationModal39').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal39')) closeModal('customizationModal39');
});
document.getElementById('customizationModal40').addEventListener('click', (event) => {
    if (event.target === document.getElementById('customizationModal40')) closeModal('customizationModal40');
});
