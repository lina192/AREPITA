document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('miFormulario');
    const mensaje = document.getElementById('mensaje');
    const passwordField = document.getElementById('contraseña');
    const togglePasswordButton = document.getElementById('togglePassword');

    // Función para validar la contraseña
    function validarContraseña(contraseña) {
        // Expresión regular para una contraseña segura
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(contraseña);
    }

    // Función para mostrar/ocultar la contraseña
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', () => {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                togglePasswordButton.textContent = 'Ocultar'; // Cambiar el texto del botón
            } else {
                passwordField.type = 'password';
                togglePasswordButton.textContent = 'Mostrar'; // Cambiar el texto del botón
            }
        });
    }

    // Manejo del evento submit del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombres = document.getElementById('nombres').value;
        const apellidos = document.getElementById('apellidos').value;
        const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseña').value;
        const telefono = document.getElementById('telefono').value;

        // Validar la contraseña
        if (!validarContraseña(contraseña)) {
            mensaje.textContent = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
            mensaje.style.color = '#d9534f'; // Rojo para error
            return;
        }

        const datos = {
            nombres,
            apellidos,
            correo,
            contraseña,
            telefono,
            rol: 'cliente' // El rol es siempre 'cliente'
        };

        fetch('/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.text())
        .then(data => {
            mensaje.textContent = data;

            if (data.includes('Datos guardados con éxito')) {
                mensaje.style.color = '#edb97f'; // Color para éxito
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000); // Espera 2 segundos antes de redirigir
            } else {
                mensaje.style.color = '#d9534f'; // Color para error
            }
        })
        .catch(error => {
            console.error('Error:', error);
            mensaje.textContent = 'Ocurrió un error al procesar la solicitud.';
            mensaje.style.color = '#d9534f'; // Rojo para error
        });
    });
});
