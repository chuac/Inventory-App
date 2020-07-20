<template>
    <div>
        <h1>Current tag is {{ tag }}</h1> 
        <button v-on:click="refreshItems">Refresh this list of items</button>
        
        <br>
        <ul>
            <li v-for="(object, index) in getWithTag(tag)" v-bind:key="object.item.id">
                <div 
                    v-bind:class="{
                        'has-background-warning-light': belowThreshold(object.item),
                        'checked': object.checked
                    }"
                    v-on:click="itemChecked({tag, index})"
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
        itemChecked() { // not currently used. need to emit data aswell
            this.$emit('item-checked');
        },
        refreshItems() {
            this.$emit('refresh-items'); // emit our event to be listened to in the parent component
        }
    }
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
