<template>
    <div>
        <h1>Current tag is {{ tag }}</h1> 
        <button v-on:click="refreshItems">Create Purchasing List with items in current tag</button>
        <button v-on:click="clearItems">Clear Items</button>
        <br>
        <ul>
            <li v-for="(object, index) in getWithTag(tag)" v-bind:key="object.id">
                {{ object.item.name + ' ' + index}}
            </li>
        </ul>
    </div>
</template>

<script>
//import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        tag: {
            type: String
        }
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'getWithTag',
        ]),
    },
    methods: {
        ...mapActions([
            'clearItems',
            'itemChecked'
        ]),
        belowThreshold(item) {
            return +item.num_count < +item.threshold;
        },
        refreshItems() {
            this.$emit('refresh-items'); // emit our event to be listened to in the parent component
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
