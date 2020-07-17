<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <div class="tabs is-centered">
                <ul>
                    <li class="is-active"><a>Pictures</a></li>
                    <li v-for="(tag, index) in tags" v-bind:key="tag.id">
                        <router-link v-bind:to="``">{{ tag.tag_name + index }}</router-link>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            tags: []
        }
    },
    created() {
        axios.get('http://localhost:3000/api/tags/inventory')
            .then((response) => {
                //console.log(response);
                this.tags = response.data;
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
