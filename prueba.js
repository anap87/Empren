function mostrarSecciones(seccionID) {
    const secciones = document.querySelectorAll('.seccion');
    // Primero ocultamos todas las secciones
    secciones.forEach(seccion => seccion.classList.remove('activa'));

    // Buscamos la sección que se debe mostrar
    const seccionSeleccionada = document.getElementById(seccionID);
    if (seccionSeleccionada) {
        // Agregamos la clase activa para mostrarla
        seccionSeleccionada.classList.add('activa');
    } else {
        console.log("Sección no encontrada: " + seccionID); // Verifica si la sección no existe
    }
}

// Obtener formularios
const registerForm = document.getElementById('register');
const loginForm = document.getElementById('login');

// Manejo de Usuarios
function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function getUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email);
}

// Registro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (getUserByEmail(email)) {
        alert('Este correo ya está registrado. Intenta iniciar sesión.');
        return;
    }

    saveUser({ username, email, password });
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    registerForm.reset();
});

// Inicio de Sesión
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = getUserByEmail(email);

    if (user) {
        if (user.password === password) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert(`¡Bienvenido, ${user.username}!`);

            // Verificar si el usuario es el único que tiene acceso a admin.html
            if (email === 'apor2209@gmail.com' && password === '12345678Prueba') {
                window.location.href = "admin.html"; // Redirigir al admin
            } else {
                window.location.href = "portal.html"; // Redirigir al portal del cliente
            }
        } else {
            alert('Contraseña incorrecta. Inténtalo de nuevo.');
        }
    } else {
        alert('El usuario no está registrado. Por favor, regístrate.');
    }
});

// Cerrar sesión
document.querySelector('.menu-items2 a[href="login.html"]').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
});
