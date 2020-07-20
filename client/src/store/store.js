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
            return state.tags[tag];
        },
        isTagInTags: (state) => (tag) => {
            return (tag in state.tags);
        }
    },
    mutations: {
        insertItems: (state, payload) => {
            const { items, tag } = payload;

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