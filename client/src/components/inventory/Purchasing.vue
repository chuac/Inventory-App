<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <div class="tabs is-centered">
                <ul>
                    <li v-for="(tag, index) in tags" v-bind:key="tag.id">
                        <a v-on:click.prevent="activeTag = tag.tag_name">{{ tag.tag_name + index }}</a>
                    </li>
                </ul>
            </div>
            <purchasing-list v-bind:tag="activeTag"></purchasing-list>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import PurchasingList from './PurchasingList.vue';

export default {
    components: {
        'purchasing-list': PurchasingList
    },
    data() {
        return {
            tags: [],
            activeTag: 'All'
        }
    },
    methods: {
        clickedTag: function (tag_name) {
            console.log(tag_name);
            this.activeTag = tag_name;
        }
    },
    // computed: {
    //     activeTag: function() {
    //         return 'blah'
    //     }
    // },
    created() {
        axios.get('http://localhost:3000/api/tags/inventory')
            .then((response) => {
                //console.log(response);
                this.tags = [ {id: 0, tag_name: 'All'}, ...response.data ]
                console.log(this.tags);
            })
            .catch((error) => {
                console.log(error);
            })
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
    margin-right: 1em;
}
</style>
