<template>
    <div id="app">
        <app-header></app-header>
        <button class="button is-primary">This is a button</button>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>

<style>

</style>
