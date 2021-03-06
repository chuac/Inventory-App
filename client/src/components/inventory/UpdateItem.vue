<template>
    <div class="columns is-centered">
        <div class="column is-one-third">
            <form method="POST">
                <h1 class="title">Update item</h1>
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
                    <label class="label">Categories</label>
                    <div class="control">
                        <div v-for="tag in tags" v-bind:key="tag.id">
                            <input type="checkbox" v-bind:value="tag.id" v-model.lazy="item.target_tags"/>
                                {{ tag.tag_name }}
                        </div>
                        <span>Target tags: {{ item.target_tags }}</span>
                        <br>
                        <span>Compared tags: {{ compared }}</span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea v-model.lazy="$v.item.description.$model" class="textarea" placeholder="Description" name="description"></textarea>
                    </div>
                    
                    <p class="help is-danger"></p>
                    
                </div>
                <div class="buttons"> <!-- Bulma CSS -->
                    <button v-on:click.prevent="handleSubmit" class="button is-primary">Update</button>
                    <button v-on:click.prevent="deleteConfirmation = !deleteConfirmation" class="button is-danger is-outlined">Delete</button>
                </div>
                </form>
        </div>
        <div v-bind:class="{'is-active': deleteConfirmation}" class="modal">
            <div v-on:click="deleteConfirmation = !deleteConfirmation" class="modal-background"></div>
            <div class="modal-content">
                <article class="message is-warning">
                    <div class="message-header">
                        Confirm deletion?
                        <button v-on:click="deleteConfirmation = !deleteConfirmation" class="delete"></button> <!-- bootstrap class of "delete" shows that small X to close modal -->
                    </div>
                    <div class="message-body">
                        <button v-on:click.prevent="deleteItem" class="button is-danger">DELETE</button>
                    </div>
                </article>
            </div>
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
                current_tags: [],
                target_tags: [],
                description: ''
            },
            tags: [],
            submitted: false,
            deleteConfirmation: false // will be flipped when we want to show user the modal
        }
    },
    computed: {
        compared: function() {
            return this.compareTagArrays(this.item.current_tags, this.item.target_tags);
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
        updateItem: function() {
            console.log(this.item);
            axios.put(`http://localhost:3000/api/inventory/${this.$route.params.id}`, {
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
        deleteItem: function() {
            console.log('delete');
            axios.delete(`http://localhost:3000/api/inventory/${this.$route.params.id}`)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log('item deleted');
                    this.$router.push('/inventory');
                }
            })
        },
        handleSubmit: function() {
            this.submitted = true;

            this.$v.$touch(); // make all inputs "dirty"
            if (this.$v.$invalid) { // code will stop here and show errors, if there are any (without hitting updateItem())
                return;
            }

            this.updateItem();
        },
        stringToNumbers: function(str) { // could also use JS's map function
            let result = [];
            str.split(',').forEach((element) => { // split the string of numbers that are seperated by commas
                result.push(+element); // convert each element to a number, then push it into our results array
            });
            return result;
        },
        compareTagArrays: function(current, target) {
            let toAdd = [];
            let toDelete = [];
            for (let i = 0; i < current.length; i++) {
                if (!(target.includes(current[i]))) { // anything missing in the target array that currently exists in current will be added to toDelete
                    toDelete.push(current[i]);
                }
            }
            for (let j = 0; j < target.length; j++) {
                if (!(current.includes(target[j]))) { // anything in the target array that is missing in the current array will be pushed into toAdd
                    toAdd.push(target[j]);
                }
            }
            return { toAdd, toDelete }; // return both arrays as an object
        }
    },
    created() { // pre-fill in the form input boxes with the current item's data, including tags
        axios.get(`http://localhost:3000/api/inventory/${this.$route.params.id}`)
        .then((response) => {
            //console.log(response);
            if (response.status === 200) {
                this.item.name = response.data[0].name;
                this.item.size = response.data[0].size;
                this.item.size_unit = response.data[0].size_unit;
                this.item.num_count = response.data[0].num_count;
                this.item.threshold = response.data[0].threshold;
                this.item.current_tags = this.stringToNumbers(response.data[0].grouped_tag_id);
                this.item.target_tags = this.item.current_tags;
                this.item.description = response.data[0].description;
            }
        });
        axios.get('http://localhost:3000/api/tags/inventory')
        .then((response) => {
            //console.log(response);
            //this.tags = [ {id: 0, tag_name: 'All'}, ...response.data ]
            this.tags = response.data;
            console.log(`this.tags:`);
            console.log(this.tags);
        })
        .catch((error) => {
            console.log(error);
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-content { /* delete confirmation modal */
    width: 200px;
}
</style>
