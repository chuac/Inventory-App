<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="#">
                <h1 class="title is-4">Acme Co.</h1>
            </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

            <div id="navbar" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="/">
                        Home
                    </a>

                    <router-link v-bind:to="`/inventory`" class="navbar-item">
                        Inventory
                    </router-link>
                    

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                        </a>

                        <div class="navbar-dropdown">
                            <router-link v-bind:to="`/inventory/purchasing`" class="navbar-item">
                                Purchasing List
                            </router-link>
                            <a class="navbar-item">
                                Contact
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-danger" href="/signout">
                    SIGN OUT
                  </a>
                  <a class="button is-primary" href="/signup">
                    <strong>Sign up</strong>
                  </a>
                  <a class="button is-light" href="/signin">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
    </div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
