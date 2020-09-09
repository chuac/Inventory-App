<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <form method="POST">
                <h1 class="title">Add a new item</h1>
                <div class="field">
                    <label class="label">Item name</label>
                    <input v-model.lazy="$v.item.name.$model" required class="input" placeholder="Item name" name="name" />
                    
                    <p class="help is-danger" v-if="submitted && !$v.item.name.required">This field is required</p>
                    <p class="help is-danger" v-if="submitted && (!$v.item.name.minLength || !$v.item.name.maxLength)">Must be between 1 and 255 characters</p>
                    
                </div>
                <label class="label">Size</label>
                <div class="field has-addons">
                    <p class="control">
                        <input v-model.lazy="$v.item.size.$model" required class="input" placeholder="Size" name="size" />
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
                    <input v-model.lazy="$v.item.num_count.$model" required class="input" placeholder="# of items" name="num_count"/>
                    
                    <p class="help is-danger" v-if="submitted && !$v.item.num_count.required">This field is required</p>
                    <p class="help is-danger" v-if="submitted && !$v.item.num_count.decimal">Has to be a number</p>
                    <p class="help is-danger" v-if="submitted && !$v.item.num_count.maxLength">Must be less than 10 characters</p>
                </div>
                <div class="field">
                    <label class="label">Low stock threshold</label>
                    <input v-model.lazy="$v.item.threshold.$model" required class="input" placeholder="Threshold for low stock warning" name="threshold"/>

                    <p class="help is-danger" v-if="submitted && !$v.item.threshold.decimal">Has to be a number</p>
                    <p class="help is-danger" v-if="submitted && !$v.item.threshold.maxLength">Must be less than 10 characters</p>
                </div>
                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea v-model.lazy="$v.item.description.$model" class="textarea" placeholder="Description" name="description"></textarea>
                    </div>
                    
                    <p class="help is-danger"></p>
                    
                </div>
                <button v-on:click.prevent="handleSubmit" class="button is-primary">Create</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const { required, decimal, minLength, maxLength } = require('vuelidate/lib/validators')

export default {
    data() {
        return {
            item: { // all the form data will be v-modeled into these variables
                name: '',
                size: '',
                size_unit: '',
                num_count: '',
                threshold: '',
                description: ''
            },
            submitted : false
        }
    },
    validations: {
        item: {
            name: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            size: {
                maxLength: maxLength(100)
            },
            num_count: {
                required,
                decimal,
                maxLength: maxLength(10)
            },
            threshold: {
                decimal,
                maxLength: maxLength(10)
            },
            description: {
                maxLength: maxLength(100)
            }
        }
    },
    methods: {
        createItem: function() {
            axios.post('http://localhost:3000/api/inventory', {
                name: this.item.name,
                size: this.item.size,
                size_unit: this.item.size_unit,
                num_count: this.item.num_count,
                threshold: this.item.threshold,
                description: this.item.description
            })
            .then((response) => {
                console.log(response);
                this.$router.push('/inventory');
            })
        },
        handleSubmit: function() {
            this.submitted = true;

            this.$v.$touch(); // make all inputs "dirty"
            if (this.$v.$invalid) { // code will stop here and show errors, if there are any (without hitting createItem())
                return;
            }

            this.createItem();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
