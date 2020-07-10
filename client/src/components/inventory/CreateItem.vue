<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <form method="POST">
                <h1 class="title">Add a new item</h1>
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
                <button v-on:click.prevent="create" class="button is-primary">Create</button>
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
        create: function() {
            console.log(this.item);
            axios.post('http://localhost:3000/api/inventory', {
                name: this.item.name,
                size: `${this.item.size} ${this.item.size_unit}`, // concat the size and size_unit
                num_count: this.item.num_count,
                description: this.item.description
            })
            .then((response) => {
                console.log(response);
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
