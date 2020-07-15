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
                    <router-link v-bind:to="`/inventory/create`" class="button is-primary" href="inventory/create">
                        Create
                    </router-link>
                </div>

            </div>
            <br>
            <li v-for="item in items" v-bind:key="item.id">
                <div v-bind:class="{'has-background-warning-light': belowThreshold(item)}" class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            {{ item.name }} - {{ item.size }} {{ item.size_unit }}
                        </p>
                        <i v-if="belowThreshold(item)" class="fa fa-exclamation-triangle has-text-danger" aria-hidden="true"></i>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{ +item.num_count }} remaining
                            <br>
                            <time>
                                Updated {{ relativeTime(item.last_updated) }}
                            </time>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <router-link v-bind:to=" `/inventory/${item.id}/update` " class="card-footer-item">Update</router-link>
                        <a href="#" class="card-footer-item">Edit (link not working)</a>
                    </footer>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    data() {
        return {
            items: []
        }
    },
    created() {
        axios.get('http://localhost:3000/api/inventory')
            .then((response) => {
                //console.log(response);
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
    },
    methods: {
        relativeTime: function (dateTime) {
            return moment(dateTime).fromNow();
        },
        belowThreshold: function (item) {
            return +item.num_count < +item.threshold;
        }
    },
    computed: {
        // belowThreshold: function () {
        //     return +this.items.num_count < + this.items.threshold;
        // }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li { /* remove bullet points for li */
  list-style-type : none;
  margin-bottom: 0.9rem;
}

.low-stock { /* NOT USED CURRENTLY */
    background-color: yellow;
}

.fa-exclamation-triangle { /* Red font-awesome exclamation triangle to show low stock */
    margin-top: 1em;
    margin-right: 1em;
}
</style>
