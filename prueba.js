// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification, 
    onAuthStateChanged, 
    sendPasswordResetEmail 
} from "firebase/auth";
import { 
    getFirestore, 
    setDoc, 
    doc 
} from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCVwQO4CJKFns0btIZRRch-hkJTpuaFCr0",
    authDomain: "kickoffscholars-88767.firebaseapp.com",
    projectId: "kickoffscholars-88767",
    storageBucket: "kickoffscholars-88767.firebasestorage.app",
    messagingSenderId: "307881292779",
    appId: "1:307881292779:web:5adb5b37acbbbb11a59fae"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Alternar entre formularios
window.toggleForms = function (formId) {
    document.getElementById("login-form").classList.remove("activo");
    document.getElementById("register-form").classList.remove("activo");
    document.getElementById(formId).classList.add("activo");
};

// Registrar usuario con verificación de correo
document.getElementById("register").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const messageEl = document.getElementById("register-message");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Enviar correo de verificación
        await sendEmailVerification(user);

        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, "clientes", user.uid), {
            nombre: username,
            email: email,
            etapa: "Etapa inicial",
            archivosFaltantes: "Por definir",
            archivosSubidos: "Por definir",
            montoAbonado: 0,
            montoPorAbonar: 100
        });

        alert("Registro exitoso. Verifica tu correo antes de iniciar sesión.");
        toggleForms("login-form");
    } catch (error) {
        messageEl.textContent = "Error: " + error.message;
    }
});

// Iniciar sesión
document.getElementById("login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const messageEl = document.getElementById("login-message");

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Verificar si el correo está confirmado
        if (!user.emailVerified) {
            messageEl.textContent = "Por favor verifica tu correo antes de iniciar sesión.";
            return;
        }

        if (user.email === "apor2209@gmail.com") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "portal.html";
        }
    } catch (error) {
        messageEl.textContent = "Error: " + error.message;
    }
});

// Recuperar contraseña
window.resetPassword = function () {
    const email = document.getElementById("login-email").value.trim();
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Te hemos enviado un enlace para restablecer tu contraseña.");
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    } else {
        alert("Por favor ingresa un correo electrónico.");
    }
};


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
