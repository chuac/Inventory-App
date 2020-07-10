<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <form method="POST">
                <h1 class="title">Update item</h1>
                <div class="field">
                    <label class="label">Item name</label>
                    <input v-model.lazy="item.name" required class="input" placeholder="Item name" name="name" />
                    
                    <p class="help is-danger"></p>
                    
                </div>
                <label class="label">Size</label>
                <div class="field has-addons">
                    <p class="control">
                        <input v-model.lazy="item.size" required class="input" placeholder="Size" name="size" />
                    </p>
                    <p class="control">
                        <span class="select">
                            <select v-model.lazy="item.size_unit">
                              <option>g</option>
                              <option>kg</option>
                              <option>mL</option>
                              <option>L</option>
                              <option>bottle(s)</option>
                              <option>6-pack</option>
                              <option>carton(s)</option>
                              <option>packet(s)</option>
                            </select>
                          </span>
                    </p>
                    
                    <p class="help is-danger"></p>
                    
                </div>
                <div class="field">
                    <label class="label">Item count</label>
                    <input v-model.lazy="item.num_count" required class="input" placeholder="# of items" name="num_count"/>
                    
                    <p class="help is-danger"></p>
                    
                </div>
                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea v-model.lazy="item.description" class="textarea" placeholder="Description" name="description"></textarea>
                    </div>
                    
                    <p class="help is-danger"></p>
                    
                </div>
                <button v-on:click.prevent="update" class="button is-primary">Update</button>
                </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            item: { // all the form data will be v-modeled into these variables
                name: '',
                size: '',
                size_unit: '',
                num_count: '',
                description: ''
            }
        }
    },
    methods: {
        update: function() {
            console.log(this.item);
            axios.put(`http://localhost:3000/api/inventory/${this.$route.params.id}`, {
                name: this.item.name,
                size: this.item.size,
                size_unit: this.item.size_unit,
                num_count: this.item.num_count,
                description: this.item.description
            })
            .then((response) => {
                console.log(response);
            })
        }
    },
    created() {
        console.log(this.$route.params.id);
        axios.get(`http://localhost:3000/api/inventory/${this.$route.params.id}`)
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                this.item.name = response.data[0].name;
                this.item.size = response.data[0].size;
                this.item.size_unit = response.data[0].size_unit;
                this.item.num_count = response.data[0].num_count;
                this.item.description = response.data[0].description;
            }
            
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>