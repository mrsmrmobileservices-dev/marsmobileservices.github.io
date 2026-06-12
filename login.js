import {
  auth,
  signInWithEmailAndPassword
} from "./firebase-config.js";

document.getElementById("loginBtn").addEventListener("click", async () => {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    window.location.href = "admin.html";

  } catch (error) {

    document.getElementById("error").innerText =
      "Incorrect email or password.";

  }

});