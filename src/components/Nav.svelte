<script>
  import { authHandlers, authStore } from "../stores/authStore";
  let currUser;
  authStore.subscribe((curr) => {
    currUser = curr?.currentUser;
  });

  async function handleLogout() {
    try {
      await authHandlers.logout();
    } catch (error) {
      console.log(error);
    }

    if (!currUser) {
      window.location.href = "/auth";
    }
  }
</script>

<nav class="navbar bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNavbar"
      aria-controls="offcanvasNavbar"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <a
      class="navbar-brand"
      href="#"
      on:click={() => {
        home = true;
        window.location.href = "/";
      }}>SPWC</a
    >
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">SPWC</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href="#"
              on:click={() => {
                window.location.href = "/";
              }}>Home</a
            >
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              on:click={() => {
                window.location.href = "/profile";
              }}>Profile</button
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        {#if currUser}
          <button class="btn btn-outline-danger" on:click={handleLogout}
            >Logout</button
          >
        {:else}
          <button
            class="btn btn-outline-success"
            on:click={() => {
              window.location.href = "/auth";
            }}>Register</button
          >
        {/if}
      </div>
    </div>
  </div>
</nav>
