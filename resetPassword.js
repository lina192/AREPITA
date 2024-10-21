document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const email = document.getElementById('resetEmail').value;

    // Realizar la solicitud POST para restablecer la contraseña
    fetch('/solicitar-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        // Verificar que la respuesta sea exitosa
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            // Mostrar la nueva contraseña en una alerta
            alert(`Su nueva contraseña es: ${data.newPassword}`);
        } else {
            // Si el servidor devuelve un mensaje de error
            alert(data.message || 'Error al restablecer la contraseña.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al restablecer la contraseña.');
    });
});
