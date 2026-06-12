import {
 auth,
 db,
 doc,
 getDoc,
 collection,
 getDocs,
 addDoc,
 deleteDoc
}
from "./firebase-config.js";

import {
 onAuthStateChanged,
 signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const table =
document.getElementById("usersTable");

onAuthStateChanged(auth, async (user) => {

  console.log("USER:", user);

  if (!user) {
  console.log("Waiting for auth...");
  setTimeout(() => {
    if (!auth.currentUser) {
      location.href = "login.html";
    }
  }, 1500);
  return;
}

  alert("Logged in as: " + user.email);

 const adminRef = doc(
  db,
  "admins",
  user.email.toLowerCase()
);
  const adminDoc = await getDoc(adminRef);

  console.log("Admin exists:", adminDoc.exists());

  if (!adminDoc.exists()) {
    alert("Admins only");
    location.href = "index.html";
    return;
  }

  loadUsers();

});


async function loadUsers(){

 table.innerHTML = "";

 const snapshot =
 await getDocs(
 collection(db,"users")
 );

 snapshot.forEach((d)=>{

 const user =
 d.data();

 const row =
 document.createElement("tr");

 row.innerHTML = `
 <td>${user.name || ""}</td>
 <td>${user.email || ""}</td>
 <td>${user.phone || ""}</td>
 <td>
 <button
 onclick="deleteUser('${d.id}')">
 Delete
 </button>
 </td>
 `;

 table.appendChild(row);

 });

}

document
.getElementById("addUserBtn")
.addEventListener(
 "click",
 async ()=>{

 await addDoc(
 collection(db,"users"),
 {
   name:
   document.getElementById("name").value,

   email:
   document.getElementById("email").value,

   phone:
   document.getElementById("phone").value,

   created:
   new Date()
 }
 );

 loadUsers();

});

window.deleteUser =
async function(id){

 await deleteDoc(
 doc(db,"users",id)
 );

 loadUsers();

};

document
.getElementById("logoutBtn")
.addEventListener(
 "click",
 async ()=>{

 await signOut(auth);

 location.href =
 "login.html";

});