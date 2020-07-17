import InventoryIndex from './components/inventory/Index.vue'
import InventoryCreateItem from './components/inventory/CreateItem.vue'
import InventoryUpdateItem from './components/inventory/UpdateItem.vue'
import InventoryPurchasingList from './components/inventory/PurchasingList.vue'
import InventoryPurchasing from './components/inventory/Purchasing.vue'

export default [
    {
        path: '/inventory',
        component: InventoryIndex
    },
    {
        path: '/inventory/create',
        component: InventoryCreateItem
    },
    {
        path: '/inventory/:id/update',
        component: InventoryUpdateItem
    },
    {
        path: '/inventory/purchasingList',
        component: InventoryPurchasingList
    },
    {
        path: '/inventory/purchasing',
        component: InventoryPurchasing
    }
]