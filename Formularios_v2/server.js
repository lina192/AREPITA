const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./db'); // Asegúrate de que este archivo de configuración de la base de datos esté correctamente configurado
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Servir archivos estáticos desde el directorio raíz
app.use(express.static(path.join(__dirname, '..'))); // Ajusta según sea necesario



// Ruta para manejar la solicitud POST (guardar datos)
app.post('/guardar', (req, res) => {
    const nuevoUsuario = req.body;
    const contraseña = nuevoUsuario.contraseña;

    console.log('Datos recibidos para registro:', nuevoUsuario);

    const verificarCorreoSql = `
        SELECT correo_cli AS correo FROM Cliente WHERE correo_cli = ?
        UNION 
        SELECT correo_msr AS correo FROM Mesero WHERE correo_msr = ?
        UNION 
        SELECT correo_domi AS correo FROM Domiciliario WHERE correo_domi = ?
        UNION 
        SELECT correo_admin AS correo FROM Administrador WHERE correo_admin = ?
    `;

    connection.query(verificarCorreoSql, [nuevoUsuario.correo, nuevoUsuario.correo, nuevoUsuario.correo, nuevoUsuario.correo], (err, results) => {
        if (err) {
            console.error('Error al verificar el correo:', err);
            return res.status(500).send('Error al verificar el correo');
        }

        if (results.length > 0) {
            return res.status(400).send('El correo ya está registrado. Intenta con otro.');
        }

        let sql = '';
        switch (nuevoUsuario.rol) {
            case 'cliente':
                sql = 'INSERT INTO Cliente (nombre_cli, apellido_cli, telefono_cli, correo_cli, contraseña_cli) VALUES (?, ?, ?, ?, ?)';
                break;
            case 'mesero':
                sql = 'INSERT INTO Mesero (nombre_msr, apellido_msr, telefono_msr, correo_msr, contraseña_msr) VALUES (?, ?, ?, ?, ?)';
                break;
            case 'domiciliario':
                sql = 'INSERT INTO Domiciliario (nombre_domi, apellido_domi, telefono_domi, correo_domi, contraseña_domi) VALUES (?, ?, ?, ?, ?)';
                break;
            case 'administrador':
                sql = 'INSERT INTO Administrador (nombre_admin, apellido_admin, telefono_admin, correo_admin, contraseña_admin) VALUES (?, ?, ?, ?, ?)';
                break;
            default:
                console.log('Rol no válido:', nuevoUsuario.rol);
                return res.status(400).send('Rol no válido');
        }

        connection.query(sql, [nuevoUsuario.nombres, nuevoUsuario.apellidos, nuevoUsuario.telefono, nuevoUsuario.correo, contraseña], (err, results) => {
            if (err) {
                console.error('Error al guardar el usuario:', err);
                return res.status(500).send('Error al guardar el usuario');
            }

            console.log('Usuario registrado con éxito:', {
                id: results.insertId,
                nombre: nuevoUsuario.nombres,
                apellido: nuevoUsuario.apellidos,
                telefono: nuevoUsuario.telefono,
                correo: nuevoUsuario.correo,
                rol: nuevoUsuario.rol
            });

            res.status(200).send('Datos guardados con éxito');
        });
    });
});

// Ruta para manejar la solicitud POST (autenticación)
// Ejemplo de cómo establecer una cookie en una ruta de autenticación
app.post('/autenticar', (req, res) => {
    const { email, password } = req.body;

    const sql = `
        SELECT 'Cliente' AS rol, correo_cli AS correo, contraseña_cli AS contraseña, id_cliente AS id FROM Cliente WHERE correo_cli = ?
        UNION 
        SELECT 'Mesero' AS rol, correo_msr AS correo, contraseña_msr AS contraseña, id_mesero AS id FROM Mesero WHERE correo_msr = ?
        UNION 
        SELECT 'Domiciliario' AS rol, correo_domi AS correo, contraseña_domi AS contraseña, id_domiciliario AS id FROM Domiciliario WHERE correo_domi = ?
        UNION 
        SELECT 'Administrador' AS rol, correo_admin AS correo, contraseña_admin AS contraseña, id_admin AS id FROM Administrador WHERE correo_admin = ?
    `;

    connection.query(sql, [email, email, email, email], (err, results) => {
        if (err) {
            console.error('Error en la autenticación:', err);
            return res.status(500).send('Error en la autenticación');
        }

        for (const result of results) {
            if (password === result.contraseña) {
                res.cookie('clientId', result.id); // Establecer la cookie del ID del cliente
                let redirectUrl;
                if (result.rol === 'Domiciliario') {
                    redirectUrl = '/Vista_EmpleadoV2.0/index.html'; 
                } else if (result.rol === 'Administrador') {
                    redirectUrl = '/Vista_AdminV2.0/index.html';
                } else if (result.rol == 'Cliente') {
                    redirectUrl = '/Vista_Cliente/index.html';
                } else {
                    return res.status(403).send('Rol no autorizado');
                }
                return res.json({ success: true, redirectUrl });
            }
        }

        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    });
});



// Ruta para servir el archivo formRegistro.html
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'formRegistro.html'));
});

// Ruta para servir el archivo index.html desde Vista_AdminV2.0
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'Vista_AdminV2.0', 'index.html'));
});

// Ruta para servir el archivo actualizarUsua.html desde Vista_AdminV2.0
app.get('/Vista_AdminV2.0/actualizarUsua.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Vista_AdminV2.0', 'actualizarUsua.html'));
});

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    const sql = `
        SELECT id_cliente AS id_usuario, nombre_cli AS nombre, apellido_cli AS apellido, telefono_cli AS telefono, correo_cli AS correo, 'cliente' AS rol
        FROM Cliente
        UNION
        SELECT id_mesero AS id_usuario, nombre_msr AS nombre, apellido_msr AS apellido, telefono_msr AS telefono, correo_msr AS correo, 'mesero' AS rol
        FROM Mesero
        UNION
        SELECT id_domiciliario AS id_usuario, nombre_domi AS nombre, apellido_domi AS apellido, telefono_domi AS telefono, correo_domi AS correo, 'domiciliario' AS rol
        FROM Domiciliario
        UNION
        SELECT id_admin AS id_usuario, nombre_admin AS nombre, apellido_admin AS apellido, telefono_admin AS telefono, correo_admin AS correo, 'administrador' AS rol
        FROM Administrador;
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).send('Error al obtener usuarios');
        }
        res.json(results);
    });
});

// Ruta para obtener un usuario por su ID
app.get('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;

    let sql;
    let values;

    // Determinar la tabla y los campos según el rol
    sql = `
        SELECT id_cliente AS id_usuario, nombre_cli AS nombre, apellido_cli AS apellido, telefono_cli AS telefono, correo_cli AS correo, 'cliente' AS rol
        FROM Cliente WHERE id_cliente = ?
        UNION
        SELECT id_mesero AS id_usuario, nombre_msr AS nombre, apellido_msr AS apellido, telefono_msr AS telefono, correo_msr AS correo, 'mesero' AS rol
        FROM Mesero WHERE id_mesero = ?
        UNION
        SELECT id_domiciliario AS id_usuario, nombre_domi AS nombre, apellido_domi AS apellido, telefono_domi AS telefono, correo_domi AS correo, 'domiciliario' AS rol
        FROM Domiciliario WHERE id_domiciliario = ?
        UNION
        SELECT id_admin AS id_usuario, nombre_admin AS nombre, apellido_admin AS apellido, telefono_admin AS telefono, correo_admin AS correo, 'administrador' AS rol
        FROM Administrador WHERE id_admin = ?
    `;
    
    connection.query(sql, [id, id, id, id], (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            return res.status(500).send('Error al obtener el usuario');
        }

        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.json(results);
    });
});

// Ruta para actualizar la información de un usuario
app.put('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, telefono, correo, contraseña, rol } = req.body;

    let sql;
    let values;

    // Determinar la tabla y los campos según el rol
    switch (rol) {
        case 'cliente':
            sql = 'UPDATE Cliente SET nombre_cli = ?, apellido_cli = ?, telefono_cli = ?, correo_cli = ?, contraseña_cli = ? WHERE id_cliente = ?';
            values = [nombre, apellido, telefono, correo, contraseña, id];
            break;
        case 'mesero':
            sql = 'UPDATE Mesero SET nombre_msr = ?, apellido_msr = ?, telefono_msr = ?, correo_msr = ?, contraseña_msr = ? WHERE id_mesero = ?';
            values = [nombre, apellido, telefono, correo, contraseña, id];
            break;
        case 'domiciliario':
            sql = 'UPDATE Domiciliario SET nombre_domi = ?, apellido_domi = ?, telefono_domi = ?, correo_domi = ?, contraseña_domi = ? WHERE id_domiciliario = ?';
            values = [nombre, apellido, telefono, correo, contraseña, id];
            break;
        case 'administrador':
            sql = 'UPDATE Administrador SET nombre_admin = ?, apellido_admin = ?, telefono_admin = ?, correo_admin = ?, contraseña_admin = ? WHERE id_admin = ?';
            values = [nombre, apellido, telefono, correo, contraseña, id];
            break;
        default:
            return res.status(400).send('Rol no válido');
    }

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            return res.status(500).send('Error al actualizar el usuario');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.status(200).send('Usuario actualizado con éxito');
    });
});

// Ruta para eliminar un usuario por su ID
app.delete('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;

    // Primero, intentamos eliminar de la tabla Cliente
    let sql = 'DELETE FROM Cliente WHERE id_cliente = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario de Cliente:', err);
            return res.status(500).send('Error al eliminar el usuario');
        }

        // Si no se eliminó ningún registro, intentamos con la siguiente tabla
        if (results.affectedRows === 0) {
            sql = 'DELETE FROM Mesero WHERE id_mesero = ?';
            connection.query(sql, [id], (err, results) => {
                if (err) {
                    console.error('Error al eliminar el usuario de Mesero:', err);
                    return res.status(500).send('Error al eliminar el usuario');
                }

                if (results.affectedRows === 0) {
                    sql = 'DELETE FROM Domiciliario WHERE id_domiciliario = ?';
                    connection.query(sql, [id], (err, results) => {
                        if (err) {
                            console.error('Error al eliminar el usuario de Domiciliario:', err);
                            return res.status(500).send('Error al eliminar el usuario');
                        }

                        if (results.affectedRows === 0) {
                            sql = 'DELETE FROM Administrador WHERE id_admin = ?';
                            connection.query(sql, [id], (err, results) => {
                                if (err) {
                                    console.error('Error al eliminar el usuario de Administrador:', err);
                                    return res.status(500).send('Error al eliminar el usuario');
                                }

                                if (results.affectedRows === 0) {
                                    return res.status(404).send('Usuario no encontrado');
                                }

                                res.status(200).send('Usuario eliminado con éxito');
                            });
                        } else {
                            res.status(200).send('Usuario eliminado con éxito');
                        }
                    });
                } else {
                    res.status(200).send('Usuario eliminado con éxito');
                }
            });
        } else {
            res.status(200).send('Usuario eliminado con éxito');
        }
    });
});

// Ruta para obtener la información del cliente por su ID
app.get('/api/clientes/:id', (req, res) => {
    const id = req.params.id;

    const sql = `
        SELECT nombre_cli AS nombre, apellido_cli AS apellido, correo_cli AS correo, telefono_cli AS telefono
        FROM Cliente
        WHERE id_cliente = ?
    `;
    
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener la información del cliente:', err);
            return res.status(500).send('Error al obtener la información del cliente');
        }

        if (results.length === 0) {
            return res.status(404).send('Cliente no encontrado');
        }

        res.json(results[0]);
    });
});


// Ruta para actualizar la información del cliente
app.put('/api/clientes/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, correo, telefono } = req.body;

    // SQL para actualizar la información del cliente
    const sql = `
        UPDATE Cliente
        SET nombre_cli = ?, apellido_cli = ?, correo_cli = ?, telefono_cli = ?
        WHERE id_cliente = ?
    `;

    // Ejecutar la consulta SQL
    connection.query(sql, [nombre, apellido, correo, telefono, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar la información del cliente:', err);
            return res.status(500).send('Error al actualizar la información del cliente');
        }

        // Verificar si se actualizó algún registro
        if (results.affectedRows === 0) {
            return res.status(404).send('Cliente no encontrado');
        }

        res.status(200).send('Información actualizada con éxito');
    });
});

// Ruta para obtener la información del domiciliario por su ID
app.get('/api/domiciliarios/:id', (req, res) => {
    const id = req.params.id;

    const sql = `
        SELECT nombre_domi AS nombre, apellido_domi AS apellido, correo_domi AS correo, telefono_domi AS telefono
        FROM Domiciliario
        WHERE id_domiciliario = ?
    `;
    
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener la información del domiciliario:', err);
            return res.status(500).send('Error al obtener la información del domiciliario');
        }

        if (results.length === 0) {
            return res.status(404).send('Domiciliario no encontrado');
        }

        res.json(results[0]);
    });
});

// Ruta para actualizar la información del domiciliario
// Ruta para actualizar la información del domiciliario
app.put('/api/domiciliarios/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, correo, telefono } = req.body;

    // SQL para actualizar la información del domiciliario
    const sql = `
        UPDATE Domiciliario
        SET nombre_domi = ?, apellido_domi = ?, correo_domi = ?, telefono_domi = ?
        WHERE id_domiciliario = ?
    `;

    // Ejecutar la consulta SQL
    connection.query(sql, [nombre, apellido, correo, telefono, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar la información del domiciliario:', err);
            return res.status(500).send('Error al actualizar la información del domiciliario');
        }

        // Verificar si se actualizó algún registro
        if (results.affectedRows === 0) {
            return res.status(404).send('Domiciliario no encontrado');
        }

        res.status(200).json({ success: true });
    });
});

function eliminarCuenta(userId) {
    fetch(`/eliminarCuenta/${userId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            // Actualiza la interfaz o redirige al usuario
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}




// Ruta para manejar la solicitud de restablecimiento de contraseña
app.post('/solicitar-reset', (req, res) => {
    const { email } = req.body;

    // Busca al usuario en la base de datos por su correo
    const sql = `
        SELECT 'Cliente' AS rol, id_cliente AS id FROM Cliente WHERE correo_cli = ?
        UNION 
        SELECT 'Mesero' AS rol, id_mesero AS id FROM Mesero WHERE correo_msr = ?
        UNION 
        SELECT 'Domiciliario' AS rol, id_domiciliario AS id FROM Domiciliario WHERE correo_domi = ?
        UNION 
        SELECT 'Administrador' AS rol, id_admin AS id FROM Administrador WHERE correo_admin = ?
    `;

    connection.query(sql, [email, email, email, email], (err, results) => {
        if (err) {
            console.error('Error en la búsqueda del usuario:', err);
            return res.status(500).json({ success: false, message: 'Error en la búsqueda del usuario' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró un usuario con ese correo' });
        }

        // Generar una nueva contraseña y actualizar en la base de datos
        const nuevaContraseña = generarNuevaContraseña(); // Debes implementar esta función

        let updateSql;
        const userId = results[0].id;

        switch (results[0].rol) {
            case 'Cliente':
                updateSql = 'UPDATE Cliente SET contraseña_cli = ? WHERE id_cliente = ?';
                break;
            case 'Mesero':
                updateSql = 'UPDATE Mesero SET contraseña_msr = ? WHERE id_mesero = ?';
                break;
            case 'Domiciliario':
                updateSql = 'UPDATE Domiciliario SET contraseña_domi = ? WHERE id_domiciliario = ?';
                break;
            case 'Administrador':
                updateSql = 'UPDATE Administrador SET contraseña_admin = ? WHERE id_admin = ?';
                break;
            default:
                return res.status(400).json({ success: false, message: 'Rol no válido' });
        }

        connection.query(updateSql, [nuevaContraseña, userId], (err) => {
            if (err) {
                console.error('Error al actualizar la contraseña:', err);
                return res.status(500).json({ success: false, message: 'Error al actualizar la contraseña' });
            }

            console.log('Contraseña restablecida con éxito para el usuario:', userId);
            // Enviar la nueva contraseña en la respuesta
            res.status(200).json({
                success: true,
                newPassword: nuevaContraseña // Enviar la nueva contraseña en la respuesta
            });
        });
    });
});

// Función para generar una nueva contraseña (puedes personalizar esto)
function generarNuevaContraseña() {
    return Math.random().toString(36).slice(-8); // Genera una contraseña aleatoria de 8 caracteres
}

app.get('/api/productos', (req, res) => {
    connection.query('SELECT * FROM Producto', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});















