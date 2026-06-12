import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const status =
document.getElementById("loginStatus");

onAuthStateChanged(auth, (user) => {

  if (user) {
    status.textContent = "✓ Logged In";
  } else {
    status.textContent = "";
  }

});