import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        purchasingListItems: [],
        tags: []
    },
    getters: {
        isChecked: (state) => (index) => { // not currently needed
            return state.purchasingListItems[index].checked;
        }
    },
    mutations: {
        insertItems: (state, payload) => {
            payload.forEach((item) => {
                state.purchasingListItems.push({
                    item: item,
                    checked: false
                })
            })
        },
        clearItems: (state) => {
            state.purchasingListItems = [];
        },
        itemChecked: (state, payload) => {
            state.purchasingListItems[payload].checked = !state.purchasingListItems[payload].checked;
        }
    },
    actions: {
        insertItems: (context, payload) => {
            context.commit('insertItems', payload);
        },
        clearItems: (context) => {
            context.commit('clearItems');
        },
        itemChecked: (context, payload) => {
            context.commit('itemChecked', payload);
        }
    },
    plugins: [createPersistedState()],
})