<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <div class="tabs is-centered">
                <ul>
                    <li v-for="(tag, index) in tags" v-bind:key="tag.id">
                        <a v-on:click.prevent="clickedTag(tag.tag_name)">{{ tag.tag_name + index }}</a>
                    </li>
                </ul>
            </div>
            <purchasing-list v-bind:tag="activeTag" v-on:refresh-items="fetchItemsFromAPI(activeTag)"></purchasing-list>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

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
    computed: {
        ...mapGetters([
            'getWithTag',
            'getTags',
            'tagInTags'
        ]),
    },
    methods: {
        ...mapActions([
            'insertItems',
            'clearItems',
            'itemChecked'
        ]),
        clickedTag: function (tag_name) {
            if (!(this.tagInTags(tag_name))) { // current tag's items are not yet in the Vuex store
                this.fetchItemsFromAPI(tag_name);
            } else {
                console.log('else');
            }
            this.activeTag = tag_name;
        },
        fetchItemsFromAPI: function (tag_name) {
            axios.get(`http://localhost:3000/api/tags/inventory/${tag_name}`)
            .then((response) => {
                //console.log(response);
                //this.items = response.data;
                //console.log(response.data);
                //this.clearItems();

                this.insertItems({
                    tag: tag_name,
                    items: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
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
