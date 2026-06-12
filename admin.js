import {
    auth,
    db,
    doc,
    getDoc
} from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    collection,
    getDocs,
    addDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const usersTable =
document.getElementById("usersTable");

const userCount =
document.getElementById("userCount");

onAuthStateChanged(auth, async (user)=>{

    if(!user){
        window.location.href="login.html";
        return;
    }

    const adminRef =
    doc(db,"admins",user.email);

    const adminDoc =
    await getDoc(adminRef);

    if(!adminDoc.exists()){

        alert("Admin access only");

        window.location.href="index.html";

        return;
    }

    loadUsers();

});

async function loadUsers(){

    usersTable.innerHTML="";

    const snapshot =
    await getDocs(collection(db,"users"));

    userCount.textContent =
    snapshot.size;

    snapshot.forEach((docSnap)=>{

        const data =
        docSnap.data();

        const row =
        document.createElement("tr");

        row.innerHTML = `
        <td>${data.name || ""}</td>
        <td>${data.email || ""}</td>
        <td>${data.phone || ""}</td>
        <td>
            <button
            onclick="deleteUser('${docSnap.id}')">
            Delete
            </button>
        </td>
        `;

        usersTable.appendChild(row);

    });

}

document
.getElementById("addUserBtn")
.addEventListener("click", async ()=>{

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const phone =
    document.getElementById("phone").value;

    if(!email){
        alert("Email required");
        return;
    }

    await addDoc(
        collection(db,"users"),
        {
            name,
            email,
            phone,
            created:new Date()
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

}

document
.getElementById("logoutBtn")
.addEventListener("click", async ()=>{

    await signOut(auth);

    window.location.href =
    "login.html";

});