import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        purchasingListItems: [],
        tags: {}
    },
    getters: {
        isChecked: (state) => (index) => { // not currently needed
            return state.purchasingListItems[index].checked;
        },
        getWithTag: (state) => (tag) => {
            console.log('in getter');
            return state.tags[tag];
        },
        getTags: (state) => {
            return state.tags;
        },
        tagInTags: (state) => (tag) => {
            return (tag in state.tags);
        }
    },
    mutations: {
        // insertTags: (state, payload) => {

        // },
        insertItems: (state, payload) => {
            console.log('in store');
            const { items, tag } = payload;
            if (!(tag in state.tags)) {
                console.log(`${tag} not found in state.tags`);
            } else {
                console.log(`${tag} found in state!!`)
            }
            console.log(items);
            const newItems = [];
            items.forEach((item) => {
                newItems.push({
                    item: item,
                    checked: false
                })
            })
            //state.tags[tag] = newItems; // <--- Doesn't work to mutate store.tags properly for Vue reactivity!!

            state.tags = { ...state.tags, [tag]: newItems }; // square brackets around tag because it's a dynamic key name
            //Vue.set(state.tags, tag, newItems); // alternative to above line
           
            console.log(state.tags);
            // payload.forEach((item) => {
            //     state.purchasingListItems.push({
            //         item: item,
            //         checked: false
            //     })
            // })
        },
        clearItems: (state) => {
            state.tags = {};
        },
        itemChecked: (state, payload) => {
            //state.purchasingListItems[payload].checked = !state.purchasingListItems[payload].checked;
            const { tag, index } = payload;
            console.log(`tag is ${tag}`);
            console.log(`index is ${index}`);
            console.log(state.tags[tag]);
            state.tags[tag][index].checked = !state.tags[tag][index].checked;

            //let checked2 = !state.tags[tag][index].checked;

            //state.tags[tag] = { ...state.tags[tag], checked: checked2 }
            //const tagObject = { ...state.tags[tag], checked: checked2};
            //state.tags = { ...state.tags, [tag]: tagObject };
        }
    },
    actions: {
        insertItems: (context, payload) => {
            context.commit('insertItems', payload);
        },
        clearItems: (context) => { // will need payload of which tag's items to clear
            context.commit('clearItems');
        },
        itemChecked: (context, payload) => {
            context.commit('itemChecked', payload);
        }
    },
    plugins: [createPersistedState()],
})