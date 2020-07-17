<template>
    <div>
        <h1>Current tag is {{ tag }}</h1> 
        <button v-on:click="fetchItemsFromAPI">Create Purchasing List with items in current tag</button>
        <button v-on:click="clearItems">Clear Items</button>
        <br>
        <ul>
            <li v-for="(object, index) in items" v-bind:key="object.id">
                {{ object.name + ' ' + index}}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        tag: {
            type: String
        }
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        fetchItemsFromAPI: function () {
            axios.get(`http://localhost:3000/api/tags/inventory/${this.tag}`)
            .then((response) => {
                //console.log(response);
                this.items = response.data;
                console.log(response.data);
                //this.clearItems();
                //this.insertItems(response.data);

                //console.log(this.$store.state.purchasingListItems)
            })
            .catch((error) => {
                console.log(error);
            })
        },
        clearItems: function () {
            this.items = [];
        },
        belowThreshold(item) {
            return +item.num_count < +item.threshold;
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
