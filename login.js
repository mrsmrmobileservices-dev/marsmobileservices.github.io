import {
 auth
} from "./firebase-config.js";

import {
 signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

document
.getElementById("loginBtn")
.addEventListener("click", async () => {

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

   location.href = "admin.html";

 } catch {

   document.getElementById("error")
   .innerText =
   "Invalid email or password";

 }

});