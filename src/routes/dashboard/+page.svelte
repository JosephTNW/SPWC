<script>
  import { authStore } from "../../stores/authStore";
  import Nav from "../../components/Nav.svelte";
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../../lib/firebase/firebase.client";
  import { browser } from "$app/environment";

  let username, userId, docRef;

  const userData = {
    trashThrown: 666,
  };

  authStore.subscribe((curr) => {
    username = curr?.currentUser?.displayName;
  });

  userId = browser && localStorage.getItem("userId");

  try {
    docRef = doc(db, "user", userId);
    getDoc(docRef)
      .then((docSnap) => {
        userData.trashThrown = docSnap.data().trashThrown;
      })
      .catch(() => {});
  } catch (error) {
    console.log(error);
  }
</script>

<Nav />

<div class="container mt-7">
  <h1>Hi, {username} let's help clean the world</h1>
  <img
    src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      userId}
  />
  <h2>Total trash thrown  : {userData.trashThrown}</h2>
</div>
