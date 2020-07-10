<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <h1>
                Inventory Index!
            </h1>
            <div class="field">
                <div class="field is-grouped is-grouped-left">
                    <h1>
                        Inventory Index!
                    </h1>
                </div>
                <div class="field is-grouped is-grouped-right">
                    <a class="button is-primary" href="inventory/create">
                        Create
                    </a>
                </div>

            </div>
            <br>
            <li v-for="item in items" v-bind:key="item.id">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                             {{ item.name }} - {{ item.size }} {{ item.size_unit }}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{ item.num_count }}
                            <br>
                            <time datetime="2016-1-1"></time>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item">Update quantity</a>
                        <a href="#" class="card-footer-item">Edit</a>
                    </footer>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            items: []
        }
    },
    created() {
        axios.get('http://localhost:3000/api/inventory')
            .then((response) => {
                console.log(response);
                this.items = response.data;
                console.log(this.items);
            })
            .catch((error) => {
                console.log(error);
            })
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        // .then((data) => {
        //     this.items = data.data.slice(0, 10); // we want just first 10 elements
        //     //this.items = data;
        // }) http://localhost:3000/api/inventory
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li { /* remove bullet points for li */
  list-style-type : none;
}
</style>
