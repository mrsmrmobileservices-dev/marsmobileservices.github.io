import {
 db,
 collection,
 getDocs,
 addDoc,
 deleteDoc,
 doc
}
from "./firebase-config.js";

import {
 auth,
 getDoc
}
from "./firebase-config.js";

import {
 onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const reviewsContainer =
document.getElementById("reviewsContainer");

let isAdmin = false;

async function checkAdmin(user){

 if(!user) return false;

 const adminDoc = await getDoc(
  doc(
   db,
   "admins",
   user.email.toLowerCase()
  )
 );

 return adminDoc.exists();
}

onAuthStateChanged(auth, async(user)=>{

 isAdmin = await checkAdmin(user);

 loadReviews();

});

document
.getElementById("submitReview")
.addEventListener("click", async()=>{

 const name =
 document.getElementById("reviewName").value;

 const rating =
 document.getElementById("reviewRating").value;

 const review =
 document.getElementById("reviewText").value;

 if(!name || !review){
  alert("Complete all fields");
  return;
 }

 await addDoc(
  collection(db,"reviews"),
  {
   name,
   rating,
   review,
   created: new Date()
  }
 );

 document.getElementById("reviewName").value="";
 document.getElementById("reviewText").value="";

 loadReviews();

});

async function loadReviews(){

 reviewsContainer.innerHTML="";

 const snapshot =
 await getDocs(
  collection(db,"reviews")
 );

 snapshot.forEach((d)=>{

  const data = d.data();

  const card =
  document.createElement("div");

  card.className="card";

  card.innerHTML = `
   <h3>${data.name}</h3>
   <p>${"★".repeat(data.rating)}</p>
   <p>${data.review}</p>
   ${
    isAdmin
    ? `<button onclick="deleteReview('${d.id}')">
       Delete Review
      </button>`
    : ""
   }
  `;

  reviewsContainer.appendChild(card);

 });

}

window.deleteReview =
async function(id){

 if(!confirm("Delete review?")) return;

 await deleteDoc(
  doc(db,"reviews",id)
 );

 loadReviews();

};