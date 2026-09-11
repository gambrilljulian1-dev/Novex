import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const mainButton = document.getElementById("main-button");
const switchButton = document.getElementById("switch-button");

const formTitle = document.getElementById("form-title");
const message = document.getElementById("message");

let creatingAccount = false;

switchButton.addEventListener("click", () => {
  creatingAccount = !creatingAccount;

  document.querySelectorAll(".signup-only").forEach(input => {
    input.style.display = creatingAccount ? "block" : "none";
  });

  if (creatingAccount) {
    formTitle.textContent = "Create your account";
    mainButton.textContent = "Create account";
    switchButton.textContent = "Already have an account? Log in";
  } else {
    formTitle.textContent = "Log in";
    mainButton.textContent = "Log in";
    switchButton.textContent = "Create an account";
  }

  message.textContent = "";
});

mainButton.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const name = nameInput.value.trim();

  message.textContent = "";

  if (!email || !password) {
    message.textContent = "Please enter your email and password.";
    return;
  }

  if (creatingAccount && !name) {
    message.textContent = "Please enter your name.";
    return;
  }

  try {

    if (creatingAccount) {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: "student",
        createdAt: new Date()
      });

      message.textContent = "Account created!";

      window.location.href = "dashboard.html";

    } else {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      window.location.href = "dashboard.html";
    }

  } catch (error) {

    console.error(error);

    if (error.code === "auth/email-already-in-use") {
      message.textContent = "That email is already registered.";
    } else if (error.code === "auth/invalid-email") {
      message.textContent = "Please enter a valid email.";
    } else if (error.code === "auth/weak-password") {
      message.textContent = "Password must be at least 6 characters.";
    } else if (error.code === "auth/invalid-credential") {
      message.textContent = "Incorrect email or password.";
    } else {
      message.textContent = "Something went wrong. Try again.";
    }
  }
});
