import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import cadastro from '../views/cadastro.vue'
import relatorio from '../views/relatorio.vue'
const routes = [
{ path: '/', component: home },
{ path: '/login', component: login },
{ path: '/cadastro', component: cadastro },
{ path: '/relatorio', component: relatorio }
]
const router = createRouter({
history: createWebHistory(),
routes
})
export default router