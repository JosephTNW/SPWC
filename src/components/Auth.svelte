<script>
  import { authHandlers, authStore } from '../stores/authStore';
  let register = false;
  let username = '';
  let email = "";
  let password = "";
  let confirmPassword = "";

  async function handleSubmit(){
    if(!email){
      alert('Please input email');
      return
    }

    if(!password){
      alert('Please input password')
      return
    }

    if(register && !username){
      alert('Please input username');
      return
    }

    if(register && !confirmPassword){
      alert('Please confirm password')
      return
    }

    if(register && password !== confirmPassword){
      alert('Password and Confirm Password doesn\'t match');
      return
    }

    if(register && password === confirmPassword){
      try {
        await authHandlers.signup(email, password, username);
      } catch(err) {
        console.log(err);
      }
    } else {
      try {
        await authHandlers.login(email, password)
      } catch (err) {
        console.log(err);
      }
    }

    if($authStore.currentUser) {
      window.location.href="/dashboard"
    }
  }
</script>

<form class="container mt-7">
  <h1>{register ? "Register" : "Sign Up"}</h1>
  {#if register}
    <div class="mb-3">
      <label for="username" class="form-label">Username</label>
      <input
        bind:value={username}
        type="text"
        class="form-control"
        id="username"
        aria-describedby="username"
      />
    </div>
  {/if}
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input
      bind:value={email}
      type="email"
      class="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
    />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input
      bind:value={password}
      type="password"
      class="form-control"
      id="exampleInputPassword1"
    />
  </div>
  {#if register}
    <div class="mb-3">
      <label for="confirmPass" class="form-label">Confirm Password</label>
      <input
        bind:value={confirmPassword}
        type="password"
        class="form-control"
        id="confirmPass"
        aria-describedby="emailHelp"
      />
    </div>
  {/if}
  <div class="mb-3 form-check">
    <input
      type="checkbox"
      class="form-check-input"
      id="tcCheck"
      onchange="isChecked(this, 'btnLogin')"
    />
    <label class="form-check-label" for="tcCheck"
      >By checking this, you agree to our <span
        ><a href="/pages/tc.html">terms and conditions</a></span
      ></label
    >
  </div>
  <button type="submit" class="btn btn-primary mb-2" id="btnLogin" disabled
    on:click={handleSubmit}>Submit</button
  >
  {#if register}
    <p>Already have an account? <span
      aria-roledescription="button"
      role="button"
      aria-pressed="false"
      tabindex="0"
      on:click={() => {
        register = false;
      }}
      on:keydown={() => {}}
    >
      <a href="#">Sign Up</a></span></p>
  {:else}
    <p>
      Don't have an account?
      <span
        aria-roledescription="button"
        role="button"
        aria-pressed="false"
        tabindex="0"
        on:click={() => {
          register = true;
        }}
        on:keydown={() => {}}
      >
        <a href="#">Register</a></span>
    </p>
  {/if}
</form>
