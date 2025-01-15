// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; 

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCVwQO4CJKFns0btIZRRch-hkJTpuaFCr0",
  authDomain: "kickoffscholars-88767.firebaseapp.com",
  projectId: "kickoffscholars-88767",
  storageBucket: "kickoffscholars-88767.firebasestorage.app",
  messagingSenderId: "307881292779",
  appId: "1:307881292779:web:5adb5b37acbbbb11a59fae"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Registrar nuevo usuario
document.getElementById("register").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Crea el usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guarda información adicional del usuario en Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      stage: "Etapa inicial",
      missingFiles: "Por definir",
      uploadedFiles: "Por definir",
      paidAmount: 0,
      pendingAmount: 100
    });

    alert("Registro exitoso. Bienvenido a Kick Off Scholars.");
    window.location.href = "portal.html";
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    alert("Error: " + error.message);
  }
});

// Manejar el estado de autenticación
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario autenticado:", user.email);
  } else {
    console.log("No hay usuario autenticado.");
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
