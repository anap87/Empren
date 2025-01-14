//Usuarioooooooooooooooooooooooooo
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVwQO4CJKFns0btIZRRch-hkJTpuaFCr0",
  authDomain: "kickoffscholars-88767.firebaseapp.com",
  projectId: "kickoffscholars-88767",
  storageBucket: "kickoffscholars-88767.firebasestorage.app",
  messagingSenderId: "307881292779",
  appId: "1:307881292779:web:5adb5b37acbbbb11a59fae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const auth = getAuth();

// Registro de usuario
document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert(`¡Usuario registrado exitosamente, ${username}!`);
        document.getElementById('register').reset();
    } catch (error) {
        alert(`Error al registrar: ${error.message}`);
    }
});

// Inicio de sesión
document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        alert(`¡Bienvenido, ${user.email}!`);
        if (user.email === 'apor2209@gmail.com') {
            window.location.href = "admin.html"; // Redirigir al admin
        } else {
            window.location.href = "portal.html"; // Redirigir al portal del cliente
        }
    } catch (error) {
        alert(`Error al iniciar sesión: ${error.message}`);
    }
});

// Cerrar sesión
document.querySelector('.menu-items2 a[href="login.html"]').addEventListener('click', async () => {
    await signOut(auth);
    alert('Sesión cerrada exitosamente.');
});

//Secciones nuestros servicios........................

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
