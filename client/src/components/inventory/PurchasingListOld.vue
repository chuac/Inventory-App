<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <button v-on:click="fetchItemsFromAPI">Create Purchasing List with ALL items</button>
            <button v-on:click="clearItems">Clear Items</button>
            <br>
            <ul>
                <li v-for="(object, index) in purchasingListItems" v-bind:key="object.item.id">
                    <div 
                        v-bind:class="{
                            'has-background-warning-light': belowThreshold(object.item),
                            'checked': object.checked
                        }"
                        v-on:click="itemChecked(index)"
                        class="card">
                        <header class="card-header">
                            <p class="card-header-title">
                                {{ object.item.name }} - {{ object.item.size }} {{ object.item.size_unit }}
                            </p>
                            <i v-if="belowThreshold(object.item)" class="fa fa-exclamation-triangle has-text-danger" aria-hidden="true"></i>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                {{ +object.item.num_count }} remaining
                                <br>
                                {{ +object.item.threshold }} is the low stock threshold
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        purchasingListItems() {
            return this.$store.state.purchasingListItems;
        },
        ...mapGetters([
        ])
    },
    methods: {
        ...mapActions([
            'insertItems',
            'clearItems',
            'itemChecked'
        ]),
        belowThreshold(item) {
            return +item.num_count < +item.threshold;
        },
        fetchItemsFromAPI() {
            axios.get('http://localhost:3000/api/inventory')
            .then((response) => {
                //console.log(response);
                //this.items = response.data;
                console.log(response.data);
                this.clearItems();
                this.insertItems(response.data);

                console.log(this.$store.state.purchasingListItems)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
    created() { // in the future, move the inserting item data to some buttons for user to select
        // if (this.$store.state.purchasingListItems.length === 0) {
        //     this.fetchItemsFromAPI();
        // }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li { /* remove bullet points for li */
  list-style-type : none;
  margin-bottom: 0.9rem;
}

.checked {
    background-color:#f1f1f1;
    opacity:0.5; 
}

.fa-exclamation-triangle { /* Red font-awesome exclamation triangle to show low stock */
    margin-top: 1em;
    margin-right: 1em;
}
</style>
