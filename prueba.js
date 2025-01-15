// Importar las funciones necesarias de Firebase (usando la versión modular)
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

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

// Validación de entradas
function validateInputs(username, email, password) {
    if (!username || !email || !password) {
        return "Todos los campos son obligatorios.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "El correo electrónico no es válido.";
    }
    if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres.";
    }
    return null;
}

// Registrar nuevo usuario
document.getElementById("register").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const validationError = validateInputs(username, email, password);
    if (validationError) {
        alert(validationError);
        return;
    }

    try {
        // Crea el usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guarda información adicional del usuario en Firestore
        await setDoc(doc(db, "clientes", user.uid), {
            nombre: username,
            email: email,
            etapa: "Etapa inicial",
            archivosFaltantes: "Por definir",
            archivosSubidos: "Por definir",
            montoAbonado: 0,
            montoPorAbonar: 100
        });

        alert("Registro exitoso. Bienvenido a Kick Off Scholars.");
        window.location.href = "portal.html";
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        if (error.code === "auth/email-already-in-use") {
            alert("El correo electrónico ya está en uso.");
        } else if (error.code === "auth/weak-password") {
            alert("La contraseña es demasiado débil.");
        } else {
            alert("Error: " + error.message);
        }
    }
});

// Manejo del formulario de inicio de sesión
document.getElementById("login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    try {
        // Inicia sesión con Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        alert(`Bienvenido de nuevo, ${user.email}`);
        window.location.href = "portal.html"; // Redirige al portal del cliente
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        alert("Error: " + error.message);
    }
});

// Verificar autenticación y cargar datos en el portal del cliente
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        alert('No has iniciado sesión. Por favor, inicia sesión primero.');
        window.location.href = "login.html";
        return;
    }

    try {
        // Consultar Firestore con el UID del usuario
        const userDoc = await getDoc(doc(db, 'clientes', user.uid));

        if (!userDoc.exists()) {
            alert('No se encontró información del usuario.');
            return;
        }

        const userData = userDoc.data();
        document.getElementById('client-name').textContent = userData.nombre || "Cliente";
        document.getElementById('client-stage').textContent = userData.etapa || "Etapa desconocida";
        document.getElementById('missing-files').textContent = userData.archivosFaltantes || "Ninguno";
        document.getElementById('uploaded-files').textContent = userData.archivosSubidos || "Ninguno";
        document.getElementById('paid-amount').textContent = userData.montoAbonado || "0.00";
        document.getElementById('pending-amount').textContent = userData.montoPorAbonar || "0.00";
        document.getElementById('current-date').textContent = new Date().toLocaleDateString();
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
    }
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
