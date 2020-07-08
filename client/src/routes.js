import InventoryIndex from './components/inventory/Index.vue'
import InventoryCreateItem from './components/inventory/CreateItem.vue'

export default [
    {
        path: '/inventory',
        component: InventoryIndex
    },
    {
        path: '/inventory/create',
        component: InventoryCreateItem
    }
]