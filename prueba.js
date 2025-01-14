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

// Manejar registro
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Guardar datos en localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
  registerForm.reset();
});

// Manejar inicio de sesión
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Verificar datos en localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    alert(`¡Bienvenido, ${user.username}!`);
    // Aquí puedes redirigir al usuario a su portal personalizado
  } else {
    alert('Credenciales incorrectas. Por favor, intenta nuevamente.');
  }
});

//POrtal

// Manejar inicio de sesión
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Verificar datos en localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // Guardar el usuario actual en localStorage para acceder a sus datos en portal.html
    localStorage.setItem('currentUser', JSON.stringify(user));

    alert(`¡Bienvenido, ${user.username}!`);
    
    // Redirigir a portal.html
    window.location.href = "portal.html";
  } else {
    alert('Credenciales incorrectas. Por favor, intenta nuevamente.');
  }
});


document.querySelector('.menu-items2 a[href="login.html"]').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
});

const user = users.find((u) => u.email === email);
if (user) {
    if (user.password === password) {
        // Redirigir
    } else {
        alert('Contraseña incorrecta. Inténtalo de nuevo.');
    }
} else {
    alert('El usuario no está registrado. Por favor, regístrate.');
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

if (currentUser) {
    document.getElementById('client-name').textContent = currentUser.username;
    // Supongamos que tienes datos adicionales guardados en currentUser
    document.getElementById('client-stage').textContent = currentUser.stage || "Inicial";
    document.getElementById('missing-files').textContent = currentUser.missingFiles || "Ninguno";
    document.getElementById('uploaded-files').textContent = currentUser.uploadedFiles || "Ninguno";
    document.getElementById('paid-amount').textContent = currentUser.paidAmount || "$0";
    document.getElementById('pending-amount').textContent = currentUser.pendingAmount || "$100";
}

