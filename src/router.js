import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'
import Home from '@/components/Home'

Vue.use(IonicVueRouter)

const routes = [
    {path: `/`,component: Home,name: 'home'},
]

export default new IonicVueRouter(
    {mode:'history',hash: false,routes}
)